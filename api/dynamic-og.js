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
    const { page, title, name, category, semester } = req.query;
    
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

        let rawVal = Array.isArray(title) ? title[0] : (title || (Array.isArray(name) ? name[0] : name));
        let rawTitle = rawVal ? String(rawVal) : '';

        if (!rawTitle && category) {
            const catStr = String(Array.isArray(category) ? category[0] : category).toLowerCase();
            if (CATEGORY_TITLES[catStr]) {
                rawTitle = CATEGORY_TITLES[catStr];
            }
        }

        if (rawTitle) {
            const semStr = Array.isArray(semester) ? semester[0] : semester;
            if (semStr && semStr !== 'all' && semStr !== 'null' && semStr !== 'undefined') {
                rawTitle = `${rawTitle} (Sem ${semStr})`;
            }

            const safeTitle = rawTitle.replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            const displayTitle = `${safeTitle} | SOLMATES`;

            // Safe function replacements (prevents $& or $1 regex injection crashes)
            html = html.replace(/<title>.*?<\/title>/i, () => `<title>${displayTitle}</title>`);
            
            let shortText = safeTitle;
            if (shortText.length > 50) shortText = shortText.substring(0, 47) + '...';
            const dynamicImageUrl = `https://placehold.co/1200x630/0f172a/facc15.png?text=${encodeURIComponent(shortText)}`;

            // Replace OG Title
            const ogTitleRegex = /<meta\s+(?:property|name)="og:title"\s+content="[^"]*"\s*\/?>/i;
            if (ogTitleRegex.test(html)) {
                html = html.replace(ogTitleRegex, () => `<meta property="og:title" content="${displayTitle}">`);
            } else {
                html = html.replace('</head>', () => `\n<meta property="og:title" content="${displayTitle}">\n</head>`);
            }

            // Replace OG Image
            const ogImageRegex = /<meta\s+(?:property|name)="og:image"\s+content="[^"]*"\s*\/?>/i;
            if (ogImageRegex.test(html)) {
                html = html.replace(ogImageRegex, () => `<meta property="og:image" content="${dynamicImageUrl}">`);
            } else {
                html = html.replace('</head>', () => `\n<meta property="og:image" content="${dynamicImageUrl}">\n</head>`);
            }

            // Replace Twitter Title
            const twTitleRegex = /<meta\s+(?:property|name)="twitter:title"\s+content="[^"]*"\s*\/?>/i;
            if (twTitleRegex.test(html)) {
                html = html.replace(twTitleRegex, () => `<meta name="twitter:title" content="${displayTitle}">`);
            } else {
                html = html.replace('</head>', () => `\n<meta name="twitter:title" content="${displayTitle}">\n</head>`);
            }

            // Replace Twitter Image
            const twImageRegex = /<meta\s+(?:property|name)="twitter:image"\s+content="[^"]*"\s*\/?>/i;
            if (twImageRegex.test(html)) {
                html = html.replace(twImageRegex, () => `<meta name="twitter:image" content="${dynamicImageUrl}">`);
            } else {
                html = html.replace('</head>', () => `\n<meta name="twitter:image" content="${dynamicImageUrl}">\n</head>`);
            }
        }

        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
        res.send(html);
    } catch (e) {
        console.error('Error reading file:', e);
        res.status(500).send('Internal Server Error: ' + e.message);
    }
};

