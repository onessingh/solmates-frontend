const fs = require('fs');

const elearningPath = 'C:/Users/Toshiba/OneDrive/Desktop/solmates/frontend/database/elearning-subjects.html';
let elearningContent = fs.readFileSync(elearningPath, 'utf8');
elearningContent = elearningContent.replace(/<i class="fas "\s*(?:style="")?><\/i>/g, '<i class="fas \\"></i>');
fs.writeFileSync(elearningPath, elearningContent);
console.log("Fixed elearning-subjects.html");

const folderContentPath = 'C:/Users/Toshiba/OneDrive/Desktop/solmates/frontend/database/folder-content.html';
let folderContentContent = fs.readFileSync(folderContentPath, 'utf8');
folderContentContent = folderContentContent.replace(/<i class="fas \\" style="\\"><\/i>/g, '<i class="fas \\"></i>');
fs.writeFileSync(folderContentPath, folderContentContent);
console.log("Fixed folder-content.html");

