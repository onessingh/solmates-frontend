const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
    const { page, title } = req.query;
    
    let filePath = '';
    // Use hardcoded path.join strings so Vercel's NFT (Node File Trace) includes them in the deployment!
    if (page === 'pdf-viewer') {
        filePath = path.join(process.cwd(), 'database', 'pdf-viewer.html');
    } else if (page === 'view') {
        filePath = path.join(process.cwd(), 'database', 'view.html');
    } else if (page === 'youtube-content') {
        filePath = path.join(process.cwd(), 'database', 'youtube-content.html');
    } else if (page === 'folder-content') {
        filePath = path.join(process.cwd(), 'database', 'folder-content.html');
    } else {
        return res.status(404).send('Not found');
    }

    try {
        let html = fs.readFileSync(filePath, 'utf8');

        if (title) {
            // Clean up the title parameter to prevent XSS in meta tags
            const safeTitle = title.replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            const displayTitle = `${safeTitle} | SOLMATES`;

            // Replace standard title tag
            html = html.replace(/<title>.*?<\/title>/i, `<title>${displayTitle}</title>`);
            
            // Replace OG title
            const ogTitleRegex = /<meta\s+(?:property|name)="og:title"\s+content="[^"]*"/i;
            if (ogTitleRegex.test(html)) {
                html = html.replace(ogTitleRegex, `<meta property="og:title" content="${displayTitle}">`);
            } else {
                html = html.replace('</head>', `\n<meta property="og:title" content="${displayTitle}">\n</head>`);
            }

            // Replace Twitter title
            const twTitleRegex = /<meta\s+(?:property|name)="twitter:title"\s+content="[^"]*"/i;
            if (twTitleRegex.test(html)) {
                html = html.replace(twTitleRegex, `<meta name="twitter:title" content="${displayTitle}">`);
            } else {
                html = html.replace('</head>', `\n<meta name="twitter:title" content="${displayTitle}">\n</head>`);
            }
        }

        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300'); // Cache on Edge for performance
        res.send(html);
    } catch (e) {
        console.error('Error reading file:', e);
        res.status(500).send('Internal Server Error: ' + e.message);
    }
};
