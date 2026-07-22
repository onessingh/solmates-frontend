const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, 'tools');

// 1. Fix spacing in salary, cover-letter, ats-checker
const spacingFiles = ['salary-calculator.html', 'cover-letter.html', 'ats-checker.html'];
for (const file of spacingFiles) {
    const filePath = path.join(toolsDir, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Remove empty header-section
        content = content.replace(/<div class="header-section">[\s\S]*?<\/div>/gi, '');
        
        // Reduce container margin
        content = content.replace(/margin:\s*30px auto;/gi, 'margin: 5px auto;');
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Fixed spacing in ${file}`);
    }
}

// 2. Fix email-generator alignment
const emailFile = path.join(toolsDir, 'email-generator.html');
if (fs.existsSync(emailFile)) {
    let content = fs.readFileSync(emailFile, 'utf8');
    
    // Replace min-width with width 100% and box-sizing
    content = content.replace(/min-width:\s*320px;/g, 'width: 100%; max-width: 100%; box-sizing: border-box;');
    
    // Add box-sizing to container
    content = content.replace(/.container {/g, '.container { box-sizing: border-box; overflow-x: hidden; width: 100%;');
    
    fs.writeFileSync(emailFile, content, 'utf8');
    console.log('Fixed email-generator alignment');
}
