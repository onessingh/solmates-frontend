const fs = require('fs');
const path = require('path');

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
    
    if (content.includes('<head>\\n')) {
        content = content.replace(/<head>\\n/i, '<head>');
        fs.writeFileSync(file, content, 'utf8');
        count++;
    }
});

console.log('Fixed literal \\n in ' + count + ' HTML files.');
