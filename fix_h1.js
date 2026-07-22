const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, 'tools');

const filesToFix = [
    'job-search/index.html', 'careertest.html', 'interview.html', 'email-generator.html',
    'ats-checker.html', 'cover-letter.html', 'salary-calculator.html', 'linkedin-checklist.html',
    'calculator.html', 'coverpage.html', 'planner/index.html', 'converter.html', 'compressor.html',
    'attendance.html', 'assignment-tracker.html', 'zero-size-pdf.html', 'teleprompter.html',
    'text-humanizer.html', 'break-even.html', 'business-case.html', 'financial-ratio.html',
    'loan-calculator.html', 'pestle-maker.html', 'startup-valuation.html', 'swot-maker.html'
];

for (const fileRelPath of filesToFix) {
    const filePath = path.join(toolsDir, fileRelPath);
    if (!fs.existsSync(filePath)) continue;
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    const headerBarRegex = /<div class="header-bar"[\s\S]*?<\/div>\s*?(?:<br>|\n)?/i;
    const match = content.match(headerBarRegex);
    if (match) {
        const headerBarContent = match[0];
        
        // Temporarily hide the header-bar we just injected
        content = content.replace(headerBarRegex, '___HEADER_BAR_PLACEHOLDER___');
        
        // Find and remove duplicate <h1>...</h1> tags that contain an icon (<i class=...)
        // Because all the old inner h1s had icons in them (e.g. <h1><i class="fas fa-magic"></i> Tool Name</h1>)
        content = content.replace(/<h1[^>]*>[\s\S]*?<i class="[^"]+"[\s\S]*?<\/h1>/gi, '');
        
        // For ATS Checker specifically or others that might just have <h1>Tool Name</h1> without an icon
        // Let's also remove any <h1> that exactly matches the text of the header-bar
        const titleMatch = headerBarContent.match(/<\/i>\s*(.*?)<\/h1>/i);
        if (titleMatch && titleMatch[1]) {
            const titleText = titleMatch[1].trim();
            // Create a regex to match <h1>TitleText</h1> (ignoring case and whitespace)
            const exactH1Regex = new RegExp(`<h1[^>]*>\\s*${titleText.replace(/[.*+?^$\{()|[\\]\\\\]/g, '\\\\$&')}\\s*<\\/h1>`, 'gi');
            content = content.replace(exactH1Regex, '');
        }

        // Restore header bar
        content = content.replace('___HEADER_BAR_PLACEHOLDER___', headerBarContent);
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Cleaned duplicate H1s in ${fileRelPath}`);
    }
}
