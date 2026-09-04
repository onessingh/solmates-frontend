const fs = require('fs');
const path = require('path');
const today = new Date().toISOString().split('T')[0];

const SKIP = ['recycle-bin.html', 'admin-dashboard.html', '404.html', 'offline.html',
              'feedback-s-singh.html', 'index-s-singh.html', 'pdf-viewer.html',
              'video-viewer.html', 'classic.html', 'minimal.html', 'modern.html',
              'ai-chatbot-small.html', 'test.html', 'ai-knowledge'];

const base = 'c:/Users/Toshiba/OneDrive/Desktop/solmates/frontend';

function getAllHtml(dir) {
  let results = [];
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (!['node_modules', '.git', 'ai-knowledge'].includes(item)) {
        results = results.concat(getAllHtml(full));
      }
    } else if (item.endsWith('.html')) {
      const skip = SKIP.some(s => full.includes(s));
      if (!skip) results.push(full);
    }
  }
  return results;
}

const priority = (rel) => {
  if (rel === '' || rel === 'index.html') return '1.0';
  if (rel.startsWith('tools/')) return '0.9';
  if (rel.startsWith('skills/')) return '0.8';
  if (rel.startsWith('games/')) return '0.8';
  if (rel.startsWith('database/')) return '0.8';
  return '0.7';
};

const files = getAllHtml(base);
let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

for (const f of files) {
  let rel = f.replace(base + '\\', '').replace(base + '/', '').replace(/\\/g, '/');
  if (rel === 'index.html') rel = '';
  const url = `https://solmates.in/${rel}`;
  const prio = priority(rel);
  xml += `  <url>\n    <loc>${url}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${prio}</priority>\n  </url>\n`;
}

xml += `</urlset>`;
fs.writeFileSync(path.join(base, 'sitemap.xml'), xml, 'utf8');
console.log(`Sitemap generated with ${files.length} URLs`);
