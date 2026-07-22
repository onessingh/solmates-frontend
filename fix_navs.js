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
    
    // Remove <header class="top-nav">...</header>
    content = content.replace(/<header class="top-nav"[\s\S]*?<\/header>/ig, '');
    
    // Remove <nav class="top-nav">...</nav>
    content = content.replace(/<nav class="top-nav"[\s\S]*?<\/nav>/ig, '');
    
    // Remove <!-- Navbar --> ... </nav>
    content = content.replace(/<!-- Navbar -->[\s\S]*?<\/nav>/ig, '');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Cleaned ${fileRelPath}`);
}
