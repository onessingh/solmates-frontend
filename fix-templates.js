const fs = require('fs');
let css = fs.readFileSync('tools/resumebuilder/style.css', 'utf8');

const desktopCss = `
/* ===== TEMPLATES ACCORDION ALWAYS OPEN ON DESKTOP ===== */
html.is-desktop #template-accordion-content {
    display: block !important;
}
html.is-desktop #templates-accordion-header {
    pointer-events: none !important;
}
html.is-desktop #templates-accordion-header .accordion-icon {
    display: none !important;
}

/* Also make the whole layout slightly more compact on desktop so it fits better */
html.is-desktop {
    --space-4: 12px !important;
    --space-5: 16px !important;
    --space-6: 20px !important;
    --space-7: 24px !important;
    font-size: 14px;
}
html.is-desktop .panel-section {
    padding: 16px !important;
}
html.is-desktop .field input, html.is-desktop .field select, html.is-desktop .field textarea {
    padding: 10px 12px !important;
    font-size: 0.9rem !important;
}
`;

css += desktopCss;
fs.writeFileSync('tools/resumebuilder/style.css', css, 'utf8');
console.log('Templates CSS fixed!');
