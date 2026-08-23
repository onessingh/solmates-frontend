const fs = require('fs');
let script = fs.readFileSync('tools/resumebuilder/script.js', 'utf8');

const cybersecStart = script.indexOf('if (templateKey === "cybersec") {');
const modernSidebarStart = script.indexOf('if (templateKey === "modernSidebar") {');

if (cybersecStart !== -1 && modernSidebarStart !== -1) {
  const cybersecLogic = script.substring(cybersecStart, modernSidebarStart).trim();
  
  // Remove it from its current place
  script = script.substring(0, cybersecStart) + script.substring(modernSidebarStart);

  // Insert before forestSidebar
  const forestSidebarStart = script.indexOf('if (templateKey === "forestSidebar") {');
  if (forestSidebarStart !== -1) {
    script = script.substring(0, forestSidebarStart) + cybersecLogic + '\n\n    ' + script.substring(forestSidebarStart);
    fs.writeFileSync('tools/resumebuilder/script.js', script, 'utf8');
    console.log('Fixed! Moved cybersec below makeUrlLink and generateSections.');
  } else {
    console.log('Could not find forestSidebar');
  }
} else {
  console.log('Could not find cybersec or modernSidebar');
}
