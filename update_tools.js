const fs = require('fs');
const file = 'tools/pdf-tools/index.html';
let content = fs.readFileSync(file, 'utf8');

const targetStr = '{ id: "translate", title: "Translate PDF", icon: "languages", color: "color-indigo", desc: "Cloud-powered neural translation that preserves your layout and formatting." }';
const newStr = targetStr + ',\n        { id: "delete-pages", title: "Delete PDF Pages", icon: "file-minus", color: "color-red", desc: "Remove unwanted pages from your PDF documents instantly.", isNew: true },\n        { id: "favicon-generator", title: "Favicon Generator", icon: "image", color: "color-pink", desc: "Generate multi-size favicons (ICO, PNG) for your website from any image.", isNew: true }';

if(content.includes(targetStr) && !content.includes('delete-pages')) {
    content = content.replace(targetStr, newStr);
    fs.writeFileSync(file, content);
    console.log('Successfully updated tools index.');
} else {
    console.log('Could not find target string or already updated.');
}
