const fs = require('fs');
let js = fs.readFileSync('tools/resumebuilder/script.js', 'utf8');

const targetStr = `key: "education",
      title: "Education",
      render: (resume) => {
        if (state.selectedTemplate === "social") {`;

const newStr = `key: "education",
      title: "Education",
      render: (resume) => {
        if (!resume.education || resume.education.length === 0) return "";
        if (state.selectedTemplate === "social") {`;

js = js.replace(targetStr, newStr);

fs.writeFileSync('tools/resumebuilder/script.js', js, 'utf8');
console.log('Fixed education rendering for empty list!');
