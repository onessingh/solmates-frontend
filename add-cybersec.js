const fs = require('fs');
let script = fs.readFileSync('tools/resumebuilder/script.js', 'utf8');

const cybersecLogic = `
    if (templateKey === "cybersec") {
        const leftKeys = ["skills","technicalStack","certifications","languages"];
        const rightKeys = state.sectionOrder.filter(k => !leftKeys.includes(k));
        return \`
          <article class="resume template-cybersec" style="display:block!important;width:100%!important;min-height:100%!important;font-family:'Consolas', 'Courier New', monospace;color:#c9d1d9;background:#0d1117;padding:50px;box-sizing:border-box;">
            <style>
              .template-cybersec a { color: #00ff41!important; text-decoration: none!important; }
              .template-cybersec a:hover { text-decoration: underline!important; }
              .template-cybersec .resume-section h2 { color: #fff!important; font-size: 1.2rem!important; text-transform: uppercase!important; letter-spacing: 2px!important; margin-bottom: 20px!important; border-bottom: 1px dashed #30363d!important; padding-bottom: 10px!important; background:none!important; }
              .template-cybersec .resume-section h2::before { content: "> "; color: #00ff41; }
              .template-cybersec .resume-item { margin-bottom: 20px!important; border-left: 2px solid #30363d; padding-left: 15px; position: relative; }
              .template-cybersec .resume-item::before { content: ""; position: absolute; left: -6px; top: 5px; width: 10px; height: 10px; background: #0d1117; border: 2px solid #00ff41; border-radius: 50%; }
              .template-cybersec .resume-item-title { font-weight: 700; color: #fff; font-size: 1.1rem; }
              .template-cybersec .resume-item-subtitle { color: #8b949e; margin: 4px 0; }
              .template-cybersec .resume-item-date { color: #00ff41; font-size: 0.85rem; font-weight:bold; }
              .template-cybersec .resume-list li { margin-bottom: 6px; color: #c9d1d9; list-style-type: none; position: relative; padding-left: 15px; }
              .template-cybersec .resume-list li::before { content: "~"; color: #00ff41; position: absolute; left: 0; font-weight: bold; }
              .template-cybersec .skills-grid span, .template-cybersec .tech-stack span { background: rgba(0,255,65,0.05); border: 1px solid #00ff41; color: #00ff41; padding: 4px 10px; border-radius: 2px; font-size: 0.85rem; display: inline-block; margin: 4px; box-shadow: 0 0 5px rgba(0,255,65,0.2); }
            </style>
            <header style="border-bottom: 2px solid #00ff41; padding-bottom: 30px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: flex-end;">
              <div>
                <div style="color:#00ff41;font-size:0.9rem;margin-bottom:5px;">user@solmates:~$ whoami</div>
                <h1 style="font-size: 3rem; font-weight: 700; color: #fff; margin: 0 0 10px 0; letter-spacing: -1px;">${escapeHtml(personal.fullName || "Name")}</h1>
                ${personal.headline && showHeadline ? \`<p style="font-size: 1.2rem; color: #00ff41; margin: 0;">${escapeHtml(personal.headline)}</p>\` : ""}
              </div>
              <div style="text-align: right; font-size: 0.9rem; color: #8b949e; line-height: 1.6;">
                ${personal.phone ? \`<div>${escapeHtml(personal.phone)} <i class="fas fa-phone-alt" style="color:#00ff41;margin-left:5px;"></i></div>\` : ""}
                ${personal.email ? \`<div>${escapeHtml(personal.email)} <i class="fas fa-envelope" style="color:#00ff41;margin-left:5px;"></i></div>\` : ""}
                ${personal.linkedin ? \`<div>${makeUrlLink(personal.linkedin)} <i class="fab fa-linkedin-in" style="color:#00ff41;margin-left:5px;"></i></div>\` : ""}
                ${formatLocation(personal.location) ? \`<div>${makeLocationLink(personal.location)} <i class="fas fa-map-marker-alt" style="color:#00ff41;margin-left:5px;"></i></div>\` : ""}
                ${personal.portfolio ? \`<div>${makeUrlLink(personal.portfolio)} <i class="fas fa-globe" style="color:#00ff41;margin-left:5px;"></i></div>\` : ""}
              </div>
            </header>
            <div style="display: flex; gap: 40px;">
              <aside style="width: 32%;">
                ${generateSections(leftKeys)}
              </aside>
              <main style="width: 68%;">
                ${generateSections(rightKeys)}
              </main>
            </div>
          </article>
        \`;
    }

    if (templateKey === "ats") {
`

script = script.replace('if (templateKey === "ats") {', cybersecLogic);
fs.writeFileSync('tools/resumebuilder/script.js', script, 'utf8');
console.log('Successfully injected cybersec template.');
