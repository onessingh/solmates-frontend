const fs = require('fs');
const newQuestions = require('./sem1_expansion.js');

let dataFile = 'games/quiz-battle/data.js';
let content = fs.readFileSync(dataFile, 'utf8');

// Strip 'const QUIZ_DATA = ' and the trailing ';'
let jsonStr = content.replace(/^const QUIZ_DATA = /, '').replace(/;[\s\n]*$/, '');

// We need to parse this. Since the keys/objects in data.js are valid JS but not strict JSON (unquoted keys like q, options, a), we can use eval.
let quizData;
try {
    quizData = eval('(' + jsonStr + ')');
} catch (e) {
    console.error("Eval failed", e);
    process.exit(1);
}

// Add the new questions to Sem 1
for (let subject in newQuestions) {
    if (quizData.questionBank[subject]) {
        quizData.questionBank[subject] = quizData.questionBank[subject].concat(newQuestions[subject]);
    }
}

// Serialize back to valid JS format.
// JSON.stringify will quote the keys, which is fine and actually better/cleaner.
let newContent = 'const QUIZ_DATA = ' + JSON.stringify(quizData, null, 4) + ';\n';
fs.writeFileSync(dataFile, newContent, 'utf8');
console.log('Sem 1 expansion applied. Total questions in OB:', quizData.questionBank["Organisational Behavior"].length);
