const fs = require('fs');
let script = fs.readFileSync('tools/resumebuilder/script.js', 'utf8');

const productDesignerLogic = `
    if (templateKey === "productdesigner") {
        const leftKeys = ["skills", "technicalStack", "languages", "certifications", "interests"];
        const rightKeys = state.sectionOrder.filter(k => !leftKeys.includes(k));
        return \`
          <article class="resume template-productdesigner" style="display:block!important;width:100%!important;min-height:100%!important;font-family:'Inter', sans-serif;color:#374151;background:#fff;padding:50px;box-sizing:border-box;">
            <style>
              .template-productdesigner a { color: #4f46e5!important; text-decoration: none!important; font-weight: 500; }
              .template-productdesigner a:hover { text-decoration: underline!important; }
              .template-productdesigner .resume-section h2 { color: #111827!important; font-size: 1.1rem!important; text-transform: uppercase!important; letter-spacing: 1.5px!important; margin-bottom: 25px!important; position: relative; background:none!important; border:none!important; padding:0!important; }
              .template-productdesigner .resume-section h2::after { content: ""; display: block; width: 35px; height: 4px; background: #4f46e5; border-radius: 2px; margin-top: 8px; }
              .template-productdesigner main .resume-item { position: relative; margin-bottom: 25px!important; padding-left: 20px; border-left: 2px solid #e5e7eb; margin-left: 5px; }
              .template-productdesigner main .resume-item::before { content: ""; position: absolute; left: -7px; top: 6px; width: 12px; height: 12px; background: #fff; border: 3px solid #4f46e5; border-radius: 50%; box-sizing: border-box; }
              .template-productdesigner aside .resume-item { margin-bottom: 20px!important; }
              .template-productdesigner .resume-item-title { font-weight: 700; color: #111827; font-size: 1.05rem; margin-bottom: 2px; }
              .template-productdesigner .resume-item-subtitle { color: #4f46e5; font-weight: 600; font-size: 0.9rem; margin-bottom: 4px; display: block; }
              .template-productdesigner .resume-item-date { color: #6b7280; font-size: 0.85rem; font-weight: 500; display: block; margin-bottom: 8px; }
              .template-productdesigner .resume-list li { margin-bottom: 6px; color: #4b5563; position: relative; padding-left: 16px; line-height: 1.5; }
              .template-productdesigner .resume-list li::before { content: ""; position: absolute; left: 0; top: 8px; width: 6px; height: 6px; background: #d1d5db; border-radius: 50%; }
              .template-productdesigner .skills-grid span, .template-productdesigner .tech-stack span { background: #f3f4f6; color: #374151; padding: 6px 12px; border-radius: 20px; font-size: 0.85rem; display: inline-block; margin: 4px 6px 4px 0; font-weight: 500; border: 1px solid #e5e7eb; }
              .template-productdesigner header { margin-bottom: 40px; }
              .template-productdesigner .contact-pill { display: inline-flex; align-items: center; gap: 6px; background: #f9fafb; border: 1px solid #f3f4f6; padding: 6px 14px; border-radius: 20px; font-size: 0.85rem; color: #4b5563; margin: 0 8px 8px 0; }
              .template-productdesigner .contact-pill i { color: #4f46e5; font-size: 0.9rem; }
            </style>
            <header>
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px;">
                <div style="flex: 1;">
                  <h1 style="font-size: 3.5rem; font-weight: 800; color: #111827; margin: 0 0 5px 0; letter-spacing: -1.5px; line-height: 1;">\${escapeHtml(personal.fullName || "Name")}</h1>
                  \${personal.headline && showHeadline ? \\\`<p style="font-size: 1.3rem; color: #4f46e5; margin: 0; font-weight: 500; letter-spacing: -0.5px;">\${escapeHtml(personal.headline)}</p>\\\` : ""}
                </div>
                \${personal.photoDataUrl ? \\\`<img src="\${personal.photoDataUrl}" alt="Profile" style="width: 100px; height: 100px; border-radius: 24px; object-fit: cover; border: 1px solid #e5e7eb; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);" />\\\` : ""}
              </div>
              
              <div style="display: flex; flex-wrap: wrap;">
                \${personal.phone ? \\\`<div class="contact-pill"><i class="fas fa-phone-alt"></i> \${escapeHtml(personal.phone)}</div>\\\` : ""}
                \${personal.email ? \\\`<div class="contact-pill"><i class="fas fa-envelope"></i> \${escapeHtml(personal.email)}</div>\\\` : ""}
                \${formatLocation(personal.location) ? \\\`<div class="contact-pill"><i class="fas fa-map-marker-alt"></i> \${makeLocationLink(personal.location)}</div>\\\` : ""}
                \${personal.linkedin ? \\\`<div class="contact-pill"><i class="fab fa-linkedin-in"></i> \${makeUrlLink(personal.linkedin)}</div>\\\` : ""}
                \${personal.portfolio ? \\\`<div class="contact-pill"><i class="fas fa-globe"></i> \${makeUrlLink(personal.portfolio)}</div>\\\` : ""}
              </div>
            </header>
            
            <div style="display: flex; gap: 50px;">
              <aside style="width: 32%;">
                \${generateSections(leftKeys)}
              </aside>
              <main style="width: 68%;">
                \${generateSections(rightKeys)}
              </main>
            </div>
          </article>
        \`;
    }
`;

const cybersecStart = script.indexOf('if (templateKey === "cybersec") {');
const forestSidebarStart = script.indexOf('if (templateKey === "forestSidebar") {');

if (cybersecStart !== -1 && forestSidebarStart !== -1) {
  const before = script.substring(0, cybersecStart);
  const after = script.substring(forestSidebarStart);
  
  script = before + productDesignerLogic + '\n    ' + after;
  
  // also replace in print styles
  script = script.replace('body.template-cybersec {', 'body.template-productdesigner {');
  script = script.replace('background: #0d1117 !important;', 'background: #fff !important;');
  
  fs.writeFileSync('tools/resumebuilder/script.js', script, 'utf8');
  console.log('Replaced cybersec with productdesigner!');
} else {
  console.log('Could not find markers', cybersecStart, forestSidebarStart);
}
