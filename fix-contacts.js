const fs = require('fs');
let js = fs.readFileSync('tools/resumebuilder/script.js', 'utf8');

// 1. Fix Mariana Anderson fallback
js = js.replace(/\|\|\s*['"]Mariana Anderson['"]/g, '|| ""');

// 2. Fix Contact headers
// In modernSidebar (uses `location`)
js = js.replace(
  '<h3 style="color:#A0AEC0;font-size:0.85rem;text-transform:uppercase;letter-spacing:2px;margin-bottom:15px;border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:5px;">Contact</h3>',
  '${(personal.phone || personal.email || location || personal.linkedin || personal.portfolio) ? `<h3 style="color:#A0AEC0;font-size:0.85rem;text-transform:uppercase;letter-spacing:2px;margin-bottom:15px;border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:5px;">Contact</h3>` : ""}'
);

// In forestSidebar (uses `formatLocation(personal.location)`)
js = js.replace(
  '<h3 style="color:#fff;border-top:1px solid rgba(255,255,255,0.3);border-bottom:1px solid rgba(255,255,255,0.3);padding:6px 0;font-size:0.85rem;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;">Contact</h3>',
  '${(personal.phone || personal.email || formatLocation(personal.location) || personal.linkedin || personal.portfolio) ? `<h3 style="color:#fff;border-top:1px solid rgba(255,255,255,0.3);border-bottom:1px solid rgba(255,255,255,0.3);padding:6px 0;font-size:0.85rem;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;">Contact</h3>` : ""}'
);

// In floralSidebar
js = js.replace(
  '<h3 style="color:#333;font-size:0.85rem;text-transform:uppercase;letter-spacing:3px;margin-bottom:15px;border-bottom:1px solid #ccc;padding-bottom:5px;text-align:center;">Contact</h3>',
  '${(personal.phone || personal.email || formatLocation(personal.location) || personal.linkedin || personal.portfolio) ? `<h3 style="color:#333;font-size:0.85rem;text-transform:uppercase;letter-spacing:3px;margin-bottom:15px;border-bottom:1px solid #ccc;padding-bottom:5px;text-align:center;">Contact</h3>` : ""}'
);

fs.writeFileSync('tools/resumebuilder/script.js', js, 'utf8');
console.log('Fixed Contact headers and Mariana fallback!');
