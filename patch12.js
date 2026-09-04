const fs = require('fs');
const file = 'tools/question-paper-generator.html';
let c = fs.readFileSync(file, 'utf8');

// 1. Remove Total Marks from Setup UI
c = c.replace(/<div class="form-group">\s*<label>Total Marks<\/label>\s*<input type="number" id="marks"[^>]+>\s*<\/div>/, '');

// 2. Remove Maximum Marks from Paper Header
c = c.replace(/<div>Maximum Marks: <span id="p-marks">.*?<\/span><\/div>/, '');

// 3. Remove marks logic from JS variables
c = c.replace(/const marks = document\.getElementById\('marks'\)\.value \|\| '100';\s*/, '');
c = c.replace(/document\.getElementById\('p-marks'\)\.innerText = marks;\s*/, '');

// 4. Update Prompt (remove marks mentions)
c = c.replace(/Total Marks: \$\{marks\}, /, '');
c = c.replace(/MATH RULE: Sum of all "marks" fields must EXACTLY equal \$\{marks\}\.\n/, '');
c = c.replace(/"marks":1,/, ''); // Remove from JSON template

// 5. Remove rendering of marks
c = c.replace(/<div class="q-marks">\[\$\{q\.marks\}\]<\/div>/, '');

// Also remove loader msg mentions of marks just to be clean
c = c.replace(/Structuring sections and verifying marks\.\.\./, 'Structuring sections...');

// Also remove "marks" from URL params fields array
c = c.replace(/'marks',\s*/, '');

fs.writeFileSync(file, c, 'utf8');
console.log('Removed marks completely!');
