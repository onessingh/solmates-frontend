const fs = require('fs');
let script = fs.readFileSync('tools/resumebuilder/script.js', 'utf8');

const cybersecStart = script.indexOf('if (templateKey === "cybersec") {');
const socialStart = script.indexOf('if (templateKey === "social") {');

if (cybersecStart !== -1 && socialStart !== -1) {
  // Extract the cybersec block
  const cybersecLogic = script.substring(cybersecStart, socialStart).trim();
  
  // Remove it from current position
  script = script.substring(0, cybersecStart) + script.substring(socialStart);

  // Insert it before modernSidebar
  const modernSidebarStart = script.indexOf('if (templateKey === "modernSidebar") {');
  if (modernSidebarStart !== -1) {
    script = script.substring(0, modernSidebarStart) + cybersecLogic + '\n\n    ' + script.substring(modernSidebarStart);
    fs.writeFileSync('tools/resumebuilder/script.js', script, 'utf8');
    console.log('Fixed! Moved cybersec below makeUrlLink definition.');
  } else {
    console.log('Could not find modernSidebar');
  }
} else {
  console.log('Could not find cybersec or social block');
}
