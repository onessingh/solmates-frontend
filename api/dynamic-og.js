const fs = require('fs');
const path = require('path');

const PAGE_MAP = {
    'pdf-viewer': 'database/pdf-viewer.html',
    'view': 'database/view.html',
    'youtube-content': 'database/youtube-content.html',
    'folder-content': 'database/folder-content.html'
};

const DEFAULT_TITLES = {
    'pdf-viewer': 'PDF Viewer | SOLMATES',
    'view': 'SOLMATES Database',
    'youtube-content': 'YouTube Viewer | SOLMATES',
    'folder-content': 'Folder Contents | SOLMATES'
};

module.exports = (req, res) => {
    const { page, title } = req.query;
    
    if (!page || !PAGE_MAP[page]) {
        return res.status(404).send('Not found');
    }

    try {
        const filePath = path.join(process.cwd(), PAGE_MAP[page]);
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
                html = html.replace(ogTitleRegex, `<meta property="og:title" content="${displayTitle}"`);
            } else {
                html = html.replace('</head>', `\n<meta property="og:title" content="${displayTitle}">\n</head>`);
            }

            // Replace Twitter title
            const twTitleRegex = /<meta\s+(?:property|name)="twitter:title"\s+content="[^"]*"/i;
            if (twTitleRegex.test(html)) {
                html = html.replace(twTitleRegex, `<meta name="twitter:title" content="${displayTitle}"`);
            } else {
                html = html.replace('</head>', `\n<meta name="twitter:title" content="${displayTitle}">\n</head>`);
            }
        }

        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300'); // Cache on Edge for performance
        res.send(html);
    } catch (e) {
        console.error('Error reading file:', e);
        res.status(500).send('Internal Server Error');
    }
};
