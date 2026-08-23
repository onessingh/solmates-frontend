const fs = require('fs');
let js = fs.readFileSync('tools/resumebuilder/script.js', 'utf8');

// 1. In init(), after loading saved template, check if it was explicitly set in new version
// If not (old localStorage), force floralSidebar
const oldInit = `state.selectedTemplate = saved.selectedTemplate || "floralSidebar";`;
const newInit = `state.selectedTemplate = saved.selectedTemplate || "floralSidebar";
      // If old localStorage data (no templateVersion), reset to floralSidebar
      if (!saved.templateVersion) {
        state.selectedTemplate = "floralSidebar";
      }`;
js = js.replace(oldInit, newInit);

// 2. In saveState(), add templateVersion so future loads know it's a new save
const saveStateCheck = js.indexOf('localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))');
const payloadStart = js.lastIndexOf('const payload = {', saveStateCheck);
const payloadEnd = js.indexOf('};', payloadStart) + 2;
const oldPayload = js.substring(payloadStart, payloadEnd);
const newPayload = oldPayload.replace('};', '  templateVersion: 1,\n  };');
js = js.substring(0, payloadStart) + newPayload + js.substring(payloadEnd);

fs.writeFileSync('tools/resumebuilder/script.js', js, 'utf8');
console.log('Fixed! Old localStorage gets floralSidebar, new saves get templateVersion:1');

// Verify
const verify = fs.readFileSync('tools/resumebuilder/script.js', 'utf8');
if(verify.includes('templateVersion')) {
    console.log('templateVersion found in file - OK!');
} else {
    console.log('WARNING: templateVersion not found!');
}
