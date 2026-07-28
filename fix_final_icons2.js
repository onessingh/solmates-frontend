const fs = require('fs');

let content = fs.readFileSync('C:/Users/Toshiba/OneDrive/Desktop/solmates/frontend/database/folder-content.html', 'utf8');
content = content.replace(' style=""', '');
fs.writeFileSync('C:/Users/Toshiba/OneDrive/Desktop/solmates/frontend/database/folder-content.html', content);

console.log("Done");
