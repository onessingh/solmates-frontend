const fs = require('fs');

function fixFile(filePath, targetStyle) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes(targetStyle)) {
        content = content.replace(targetStyle, '');
        fs.writeFileSync(filePath, content);
        console.log("Fixed: " + filePath);
    } else {
        console.log("Not found in: " + filePath);
    }
}

// 1. elearning-subjects.html (Remove color:#64748b)
fixFile('C:/Users/Toshiba/OneDrive/Desktop/solmates/frontend/database/elearning-subjects.html', ' style=""');

// 2. folder-content.html (Remove color: var(--text-lighter))
fixFile('C:/Users/Toshiba/OneDrive/Desktop/solmates/frontend/database/folder-content.html', ' style=""');

