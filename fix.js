const fs = require('fs');
const file = 'C:/Users/Toshiba/OneDrive/Desktop/solmates/frontend/database/elearning-subjects.html';
let content = fs.readFileSync(file, 'utf8');

const target = '<i class="fas " style=""></i>';
const replacement = '<i class="fas " style=""></i>';

if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync(file, content);
    console.log("Fixed it successfully using nodejs!");
} else {
    console.log("Target not found!");
}
