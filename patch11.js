const fs = require('fs');
const file = 'tools/question-paper-generator.html';
let c = fs.readFileSync(file, 'utf8');

const oldCode = `        if (qCount > 25) {
            document.getElementById('setup-mode').style.display = 'none';
            document.getElementById('loader').style.display = 'none';
            document.getElementById('result-mode').style.display = 'block';
            document.getElementById('result-mode').innerHTML = '<div style="padding:30px;text-align:center;background:var(--card);border-radius:16px;border:1px solid var(--border);"><i class="fas fa-exclamation-triangle" style="font-size:2rem;color:var(--danger);margin-bottom:15px;display:block;"></i><h3 style="color:var(--primary);margin-bottom:10px;">Limit Exceeded</h3><p style="color:var(--light);margin-bottom:15px;">Maximum 25 questions allowed.</p><button onclick="document.getElementById(\\'result-mode\\').style.display=\\'none\\';document.getElementById(\\'setup-mode\\').style.display=\\'block\\';document.getElementById(\\'q-count\\').value=25;" style="background:var(--accent);color:white;border:none;padding:10px 20px;border-radius:8px;cursor:pointer;">Go Back</button></div>';
            return;
        }`;

const newCode = `        if (qCount > 25) {
            const overlay = document.createElement('div');
            overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;z-index:99999;backdrop-filter:blur(3px);';
            overlay.innerHTML = \`<div style="padding:30px;text-align:center;background:var(--card);border-radius:16px;border:1px solid var(--border);max-width:320px;box-shadow:0 10px 30px rgba(0,0,0,0.3);"><i class="fas fa-exclamation-triangle" style="font-size:2.5rem;color:var(--danger);margin-bottom:15px;display:block;"></i><h3 style="color:var(--primary);margin-bottom:10px;font-size:1.3rem;">Limit Exceeded</h3><p style="color:var(--light);margin-bottom:20px;font-size:1rem;">Maximum 25 questions allowed.</p><button onclick="this.parentElement.parentElement.remove();document.getElementById('q-count').value=25;" style="background:var(--accent);color:white;border:none;padding:10px 30px;border-radius:8px;cursor:pointer;font-weight:bold;font-size:1rem;">OK</button></div>\`;
            document.body.appendChild(overlay);
            return;
        }`;

if (c.includes("if (qCount > 25) {")) {
    // Basic string replacement might fail if spaces don't match, so let's use regex
    const regex = /if\s*\(qCount\s*>\s*25\)\s*\{[\s\S]*?return;\s*\}/;
    c = c.replace(regex, newCode);
    fs.writeFileSync(file, c, 'utf8');
    console.log("Success");
} else {
    console.log("Could not find code");
}
