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
    
    // 1. Fix the header-bar CSS to override any global h1 flex rules and center it
    const oldCss = `.header-bar h1 {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--primary, #0f2b46);
    }`;
    
    const newCss = `.header-bar h1 {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--primary, #0f2b46);
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
      gap: 12px;
      width: 100%;
    }`;
    
    if (content.includes(oldCss)) {
        content = content.replace(oldCss, newCss);
    } else if (!content.includes('justify-content: center !important;')) {
        // Fallback replacement if it was minified or altered
        content = content.replace(/\.header-bar h1\s*{[^}]*}/, newCss);
    }

    // 2. Fix the padding-top issue causing the huge top gap.
    // Inject a global style override to strip padding-top from body and page-content
    const gapFixCss = `
    <style>
      body { padding-top: 0 !important; }
      .page-content { padding-top: 20px !important; }
    </style>
    `;
    
    if (!content.includes('body { padding-top: 0 !important; }')) {
        content = content.replace('</head>', gapFixCss + '</head>');
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed layout in ${fileRelPath}`);
}
