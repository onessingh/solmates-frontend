const fs = require('fs');
const path = require('path');

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

const files = getAllHtml(base);
let updated = 0;

for (const f of files) {
  let c = fs.readFileSync(f, 'utf8');
  
  // Clean up any previously added seo-content to avoid duplicates
  c = c.replace(/<div id="seo-content" style="display:none;">[\s\S]*?<\/div>/g, '');
  
  // Extract a readable name from the filename
  const basename = path.basename(f, '.html');
  const readableName = basename.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  const seoText = `
<div id="seo-content" style="height: 1px; overflow: hidden; opacity: 0; position: absolute; z-index: -1;">
  <article>
    <h2>Comprehensive Guide to ${readableName} for DU SOL MBA Students</h2>
    <p>Welcome to the ${readableName} module provided by SOLMATES. SOLMATES is the premier online academic platform designed exclusively for DU SOL (Delhi University School of Open Learning) MBA and undergraduate students. We offer a comprehensive suite of academic tools, study materials, real-time notifications, and career development resources. This particular module is engineered to streamline your academic journey, helping you manage your distance learning studies, prepare for rigorous semester examinations, and develop essential professional skills required in today's competitive corporate landscape. Distance education presents unique challenges, and our goal is to bridge the gap with accessible, high-quality digital infrastructure.</p>
    <p>By utilizing this resource, DU SOL students can significantly enhance their academic productivity and understanding of complex management concepts. Our platform goes beyond simple utilities; it integrates a vast, searchable database of official semester-wise study materials, previous year question papers (PYQs), one-shot revision notes, e-books, and carefully curated YouTube video lectures. Whether you are looking to track your class attendance, generate AI-powered practice question papers, analyze business case studies, or prepare for campus placements, SOLMATES is your ultimate digital companion. We remain deeply committed to supporting distance education students with innovative technology and reliable academic guidance.</p>
  </article>
</div>
`;

  // Insert right before </body>
  if (c.includes('</body>')) {
    c = c.replace('</body>', `${seoText}\n</body>`);
  } else {
    c += seoText; // Fallback
  }
  
  fs.writeFileSync(f, c, 'utf8');
  updated++;
}

console.log(`Injected 2-paragraph SEO text into ${updated} files.`);
