const fs = require('fs');
const newQuestions = require('./sem3_expansion.js');

let dataFile = 'games/quiz-battle/data.js';
let content = fs.readFileSync(dataFile, 'utf8');

// Strip BOM
if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
}

// Strip 'const QUIZ_DATA = ' and the trailing ';'
let jsonStr = content.replace(/^const QUIZ_DATA = /, '').replace(/;[\s\n]*$/, '');

let quizData;
try {
    quizData = eval('(' + jsonStr + ')');
} catch (e) {
    console.error("Eval failed", e);
    process.exit(1);
}

// Add the new questions to Sem 3
for (let subject in newQuestions) {
    if (quizData.questionBank[subject]) {
        quizData.questionBank[subject] = quizData.questionBank[subject].concat(newQuestions[subject]);
    }
}

let newContent = 'const QUIZ_DATA = ' + JSON.stringify(quizData, null, 4) + ';\n';
fs.writeFileSync(dataFile, newContent, 'utf8');
console.log('Sem 3 expansion applied.');
