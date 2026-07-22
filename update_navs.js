const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, 'tools');

const toolsToUpdate = {
    'job-search/index.html': { title: 'Job Search Aggregator', icon: 'fa-search' },
    'careertest.html': { title: 'Career Test', icon: 'fa-compass' },
    'interview.html': { title: 'Interview Preparation', icon: 'fa-microphone' },
    'email-generator.html': { title: 'Cold Outreach AI', icon: 'fa-paper-plane' },
    'ats-checker.html': { title: 'ATS Resume Checker', icon: 'fa-file-alt' },
    'cover-letter.html': { title: 'Cover Letter Generator', icon: 'fa-envelope-open-text' },
    'salary-calculator.html': { title: 'Salary Calculator', icon: 'fa-money-bill-wave' },
    'linkedin-checklist.html': { title: 'LinkedIn Profile Checklist', icon: 'fab fa-linkedin' },
    'calculator.html': { title: 'Academic Calculator', icon: 'fa-graduation-cap' },
    'coverpage.html': { title: 'Cover Page Generator', icon: 'fa-file-word' },
    'planner/index.html': { title: 'Study Planner', icon: 'fa-calendar-alt' },
    'converter.html': { title: 'Format Converter', icon: 'fa-exchange-alt' },
    'compressor.html': { title: 'File Compressor', icon: 'fa-compress-arrows-alt' },
    'attendance.html': { title: 'Attendance Calculator', icon: 'fa-clipboard-user' },
    'assignment-tracker.html': { title: 'Assignment Tracker', icon: 'fa-tasks' },
    'zero-size-pdf.html': { title: 'Zero Size PDF Converter', icon: 'fa-file-pdf' },
    'teleprompter.html': { title: 'Web Teleprompter', icon: 'fa-tv' },
    'text-humanizer.html': { title: 'Text Humanizer', icon: 'fa-user-edit' },
    'break-even.html': { title: 'Break-Even Calculator', icon: 'fa-chart-line' },
    'business-case.html': { title: 'Business Case Generator', icon: 'fa-briefcase' },
    'financial-ratio.html': { title: 'Financial Ratio Calculator', icon: 'fa-percentage' },
    'loan-calculator.html': { title: 'Loan Calculator', icon: 'fa-money-check-alt' },
    'pestle-maker.html': { title: 'PESTLE Analysis Maker', icon: 'fa-globe' },
    'startup-valuation.html': { title: 'Startup Valuation', icon: 'fa-rocket' },
    'swot-maker.html': { title: 'SWOT Analysis Maker', icon: 'fa-th-large' },
};

const headerCss = `
    .header-bar {
      background: var(--surface, #ffffff);
      padding: 20px;
      text-align: center;
      box-shadow: 0 2px 10px rgba(0,0,0,0.04);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .header-bar h1 {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--primary, #0f2b46);
    }
`;

for (const [fileRelPath, info] of Object.entries(toolsToUpdate)) {
    const filePath = path.join(toolsDir, fileRelPath);
    if (!fs.existsSync(filePath)) {
        console.log(`Skipping ${fileRelPath}, not found`);
        continue;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace navbar
    let newHeader = `
    <div class="header-bar" style="position: relative;">
        <h1><i class="${info.icon.includes(' ') ? info.icon : 'fas ' + info.icon}"></i> ${info.title}</h1>
`;

    if (fileRelPath === 'job-search/index.html') {
        newHeader += `        <a href="/admin/manage-jobs" id="adminManageJobsBtn" class="back-btn hidden" style="position: absolute; right: 20px; top: 20px; border-color: #ff4757; color: #ff4757; text-decoration: none; padding: 5px 10px; border-radius: 5px; border: 1px solid; font-size: 14px;">
            <i class="fas fa-tasks"></i> Manage
        </a>
`;
    }
    newHeader += `    </div>\n`;
    
    const navRegex = /<!-- Navbar -->[\s\S]*?<\/nav>|<nav class="top-nav"[\s\S]*?<\/nav>/i;
    
    if (navRegex.test(content)) {
        content = content.replace(navRegex, newHeader);
    } else {
        content = content.replace(/<body>/i, `<body>\n${newHeader}`);
    }
    
    if (!content.includes('.header-bar {')) {
        if (content.includes('</style>')) {
            content = content.replace('</style>', headerCss + '\n</style>');
        } else {
            content = content.replace('</head>', `<style>${headerCss}</style>\n</head>`);
        }
    }
    
    if (fileRelPath === 'email-generator.html') {
        content = content.replace(/<title>.*?<\/title>/, `<title>${info.title} | Solmates</title>`);
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${fileRelPath}`);
}
