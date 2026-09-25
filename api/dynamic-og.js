const fs = require('fs');
const path = require('path');

const CATEGORY_TITLES = {
    'notes': 'Notes',
    'pyqs': 'PYQs',
    'oneshot': 'One Shot',
    'professor': 'Professor Materials',
    'youtube': 'YouTube Playlists',
    'elearning': 'E-Books'
};

module.exports = (req, res) => {
    // Vercel rewrites pass query params. 
    // We check for 'title' (for items), 'name' (for folders), or 'category' (for views)
    const { page, title, name, category } = req.query;
    
    let filePath = '';
    if (page === 'pdf-viewer') {
        filePath = path.join(process.cwd(), 'database', '_pdf-viewer.html');
    } else if (page === 'view') {
        filePath = path.join(process.cwd(), 'database', '_view.html');
    } else if (page === 'youtube-content') {
        filePath = path.join(process.cwd(), 'database', '_youtube-content.html');
    } else if (page === 'folder-content') {
        filePath = path.join(process.cwd(), 'database', '_folder-content.html');
    } else {
        return res.status(404).send('Not found');
    }

    try {
        let html = fs.readFileSync(filePath, 'utf8');

        // Determine what dynamic title to inject based on available params
        let rawTitle = title || name;
        if (!rawTitle && category && CATEGORY_TITLES[category.toLowerCase()]) {
            rawTitle = CATEGORY_TITLES[category.toLowerCase()];
        }

        if (rawTitle) {
            const safeTitle = rawTitle.replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            const displayTitle = `${safeTitle} | SOLMATES`;

            html = html.replace(/<title>.*?<\/title>/i, `<title>${displayTitle}</title>`);
            
            const ogTitleRegex = /<meta\s+(?:property|name)="og:title"\s+content="[^"]*"/i;
            if (ogTitleRegex.test(html)) {
                html = html.replace(ogTitleRegex, `<meta property="og:title" content="${displayTitle}">`);
            } else {
                html = html.replace('</head>', `\n<meta property="og:title" content="${displayTitle}">\n</head>`);
            }

            const twTitleRegex = /<meta\s+(?:property|name)="twitter:title"\s+content="[^"]*"/i;
            if (twTitleRegex.test(html)) {
                html = html.replace(twTitleRegex, `<meta name="twitter:title" content="${displayTitle}">`);
            } else {
                html = html.replace('</head>', `\n<meta name="twitter:title" content="${displayTitle}">\n</head>`);
            }
        }

        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
        res.send(html);
    } catch (e) {
        console.error('Error reading file:', e);
        res.status(500).send('Internal Server Error: ' + e.message);
    }
};
