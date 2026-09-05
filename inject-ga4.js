const fs = require('fs');
const path = require('path');

const gaCode = `
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-Q6GVS9XX1M"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-Q6GVS9XX1M');
</script>
`;

function walkDir(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walkDir(file));
        } else {
            if (file.endsWith('.html')) {
                results.push(file);
            }
        }
    });
    return results;
}

const htmlFiles = walkDir('c:/Users/Toshiba/OneDrive/Desktop/solmates/frontend');
let count = 0;

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Only insert if not already present
    if (!content.includes('G-Q6GVS9XX1M')) {
        // Insert right after <head>
        content = content.replace(/<head>/i, '<head>\\n' + gaCode);
        fs.writeFileSync(file, content, 'utf8');
        count++;
    }
});

console.log('Injected GA4 code into ' + count + ' HTML files.');
