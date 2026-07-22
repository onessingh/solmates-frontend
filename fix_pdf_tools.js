const fs = require('fs');
const path = require('path');

const pdfToolsDir = path.join(__dirname, 'tools', 'pdf-tools');

const files = fs.readdirSync(pdfToolsDir).filter(f => f.endsWith('.html'));

const headerBarCss = `
<style>
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
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
      gap: 12px;
      width: 100%;
    }
    body { padding-top: 0 !important; }
</style>
`;

for (const file of files) {
    const filePath = path.join(pdfToolsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Remove old top-nav completely
    content = content.replace(/<nav class="top-nav"[\s\S]*?<\/nav>/i, '');
    content = content.replace(/<header class="top-nav"[\s\S]*?<\/header>/i, '');

    // 2. Extract tool name from the inner <h1> inside tool-header
    let toolName = 'PDF Tool';
    let icon = '<i data-lucide="file"></i>';
    
    // Find <header class="tool-header"> ... <h1>Text</h1> ... </header>
    const headerMatch = content.match(/<header class="tool-header">[\s\S]*?<h1>(.*?)<\/h1>[\s\S]*?<\/header>/i);
    if (headerMatch) {
        toolName = headerMatch[1].trim();
        // Remove the inner tool-header to prevent duplicate names and extra spacing
        content = content.replace(headerMatch[0], '');
    } else {
        const h1Match = content.match(/<h1>(.*?)<\/h1>/i);
        if (h1Match) {
            toolName = h1Match[1].trim();
            content = content.replace(h1Match[0], '');
        }
    }

    // Try to find a fitting lucide icon based on name
    if (file.includes('word')) icon = '<i data-lucide="file-text"></i>';
    else if (file.includes('excel')) icon = '<i data-lucide="file-spreadsheet"></i>';
    else if (file.includes('ppt')) icon = '<i data-lucide="monitor"></i>';
    else if (file.includes('image') || file.includes('jpg')) icon = '<i data-lucide="image"></i>';
    else if (file.includes('merge')) icon = '<i data-lucide="copy"></i>';
    else if (file.includes('split')) icon = '<i data-lucide="scissors"></i>';
    else if (file.includes('protect')) icon = '<i data-lucide="lock"></i>';
    else if (file.includes('unlock')) icon = '<i data-lucide="unlock"></i>';
    else if (file.includes('watermark')) icon = '<i data-lucide="droplet"></i>';
    else if (file.includes('compress')) icon = '<i data-lucide="minimize"></i>';
    else if (file.includes('rotate')) icon = '<i data-lucide="rotate-cw"></i>';

    const newHeader = `
    <div class="header-bar">
        <h1>${icon} ${toolName}</h1>
    </div>
    `;

    // Inject styles and header
    if (!content.includes('class="header-bar"')) {
        content = content.replace('</head>', headerBarCss + '</head>');
        content = content.replace('<body>', '<body>\n' + newHeader);
    }
    
    // Quick fix for word-to-pdf specifically regarding cutting off text
    if (file === 'word-to-pdf.html') {
        content = content.replace(/const opt = {[\s\S]*?};/m, 
`const opt = {
                margin: 0.5,
                filename: selectedFile.name.replace(/\\.docx$/i, '.pdf'),
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
                pagebreak: { mode: ['css', 'legacy'], avoid: 'p, h1, h2, h3, h4, h5, h6, tr, td, li, img' }
            };`);
            
        // Add CSS to avoid page break inside elements
        if(!content.includes('page-break-inside')) {
            content = content.replace('</style>', 
`    #wordPreview p, #wordPreview h1, #wordPreview h2, #wordPreview h3, #wordPreview li, #wordPreview tr { page-break-inside: avoid !important; }
</style>`);
        }
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated PDF tool: ${file}`);
}
