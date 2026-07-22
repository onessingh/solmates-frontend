const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, 'tools');
const spacingFiles = ['salary-calculator.html', 'cover-letter.html', 'ats-checker.html'];

for (const file of spacingFiles) {
    const filePath = path.join(toolsDir, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Increase container margin slightly to give it breathing room
        content = content.replace(/margin:\s*5px auto;/gi, 'margin: 25px auto;');
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Adjusted spacing in ${file}`);
    }
}
