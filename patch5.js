const fs = require('fs');
const file = 'tools/question-paper-generator.html';
let c = fs.readFileSync(file, 'utf8');

// 1. Add max="25"
c = c.replace('<input type="number" id="q-count" class="form-control" value="15">', '<input type="number" id="q-count" class="form-control" value="15" min="1" max="25">');

// 2. Add JS validation
const jsTarget = "const qCount = parseInt(document.getElementById('q-count').value);";
const jsReplacement = `let qCount = parseInt(document.getElementById('q-count').value);
        if (qCount > 25) {
            alert('To prevent AI token limits, the maximum number of questions allowed is 25.\\nAutomatically capping at 25.');
            qCount = 25;
            document.getElementById('q-count').value = 25;
        }`;
c = c.replace(jsTarget, jsReplacement);

// 3. Update Prompt for marks
const promptTarget = "Total Marks: ${marks}, Duration: ${duration} mins, Total Questions: ${qCount}, Difficulty: ${difficulty}, Pattern: ${pattern}.";
const promptReplacement = "Total Marks: ${marks}, Duration: ${duration} mins, Total Questions: ${qCount}, Difficulty: ${difficulty}, Pattern: ${pattern}.\\nCRITICAL MATH RULE: You must dynamically assign marks to each question such that the sum of the 'marks' field for all ${qCount} questions EXACTLY equals the Total Marks (${marks}).";
c = c.replace(promptTarget, promptReplacement);

fs.writeFileSync(file, c, 'utf8');
