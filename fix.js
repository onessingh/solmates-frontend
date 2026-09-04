const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        if (isDirectory) {
            if (f !== 'node_modules' && f !== '.git') {
                walkDir(dirPath, callback);
            }
        } else {
            callback(path.join(dir, f));
        }
    });
}

let count = 0;

walkDir(__dirname, function(filePath) {
    if (filePath.endsWith('.html') || filePath.endsWith('.js') || filePath.endsWith('.json')) {
        if (filePath.endsWith('fix.js')) return;
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;

        // Replace global debugger trap
        content = content.replace(/setInterval\(function\(\) \{\s*let devtoolsOpen = false;\s*const threshold = 160;[\s\S]*?\}, 1000\);/g, '/* Aggressive devtools polling removed */');

        // Replace api-client.js trap 1
        content = content.replace(/\(function\(\) \{ debugger; \}\(\)\);/g, '/* debugger trap removed */');

        // Replace api-client.js trap 2
        content = content.replace(/const start = performance\.now\(\);\s*debugger;\s*if \(performance\.now\(\) - start > 100\) \{\s*devtoolsOpen = true;\s*\}/g, '/* second trap removed */');

        // Replace stray debuggers just in case
        content = content.replace(/debugger;/g, '/* debugger */');

        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            count++;
        }
    }
});

console.log('Updated ' + count + ' files using safe UTF-8.');
