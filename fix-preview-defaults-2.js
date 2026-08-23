const fs = require('fs');
let js = fs.readFileSync('tools/resumebuilder/script.js', 'utf8');

// Undo the broken ones
js = js.replace(/\\\$\\\{personal\.photoDataUrl \? \\\`<img src="\\\$\\\{personal\.photoDataUrl\\\}" alt="" \/>\\\` : ''\\\}/g, 
  "${personal.photoDataUrl ? `<img src=\"${personal.photoDataUrl}\" alt=\"\" />` : ''}");

js = js.replace(/\\\$\\\{personal\.photoDataUrl \? \\\`<img src="\\\$\\\{personal\.photoDataUrl\\\}" alt="" style="([^"]+)" \/>\\\` : ''\\\}/g, 
  "${personal.photoDataUrl ? `<img src=\"${personal.photoDataUrl}\" alt=\"\" style=\"$1\" />` : ''}");

fs.writeFileSync('tools/resumebuilder/script.js', js, 'utf8');
console.log('Fixed img syntax!');
