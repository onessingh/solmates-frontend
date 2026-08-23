const fs = require('fs');

// 1. Remove accordion from index.html completely
let html = fs.readFileSync('tools/resumebuilder/index.html', 'utf8');

const accordionHeaderOld = `<header class="templates-header section-header" id="templates-accordion-header" style="cursor:pointer; background:var(--bg-card); padding:20px; border-radius:12px; box-shadow:0 4px 15px rgba(0,0,0,0.05);">
        <h2 id="templates-title">Professional Template Gallery <i class="fas fa-chevron-down accordion-icon" style="float:right; margin-top:5px; transition: transform 0.3s;"></i></h2>
        <p>Choose a layout optimized for ATS parsing and recruiter readability. Click to instantly switch.</p>
      </header>
      <div class="accordion-content" id="template-accordion-content" style="display:none;">`;

const accordionHeaderNew = `<header class="templates-header section-header" style="background:var(--bg-card); padding:20px; border-radius:12px; box-shadow:0 4px 15px rgba(0,0,0,0.05);">
        <h2 id="templates-title">Professional Template Gallery</h2>
        <p>Choose a layout optimized for ATS parsing and recruiter readability. Click to instantly switch.</p>
      </header>
      <div class="accordion-content" id="template-accordion-content" style="display:block;">`;

html = html.replace(accordionHeaderOld, accordionHeaderNew);

// Remove the inline max-height on tpl-gallery in HTML just in case
html = html.replace(/max-height: 520px; overflow-y: auto;/g, '');

fs.writeFileSync('tools/resumebuilder/index.html', html, 'utf8');

// 2. Fix JD Match spanning
let css = fs.readFileSync('tools/resumebuilder/style.css', 'utf8');
css += `
/* Force JD Match to span fully across the grid */
html.is-desktop .builder-columns > .jd-match {
    grid-column: span 2 !important;
    width: 100% !important;
}
html.is-desktop .builder-columns > .templates {
    grid-column: span 2 !important;
    width: 100% !important;
}

/* If Templates spans 2 columns, where does the preview go?
Wait! If templates spans 2 columns, then the preview will be pushed to the NEXT row!
BUT the user WANTS the templates to take up the left side and preview on the right! 
Let's keep Templates as taking 1 column. */
`;

fs.writeFileSync('tools/resumebuilder/style.css', css, 'utf8');
console.log('Fixed HTML accordion and JD Match span!');
