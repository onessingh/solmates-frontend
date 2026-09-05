const fs = require('fs');
let content = fs.readFileSync('c:/Users/Toshiba/OneDrive/Desktop/solmates/frontend/js/profanity.js', 'utf8');

const additionalWords = [
    'boor', 'bur', 'bhur', 'bhurr', 
    'bhonsd', 'bhosad', 'bhosada', 
    'chud', 'chuda', 'chodo', 'chodna', 'chudai', 'chudakkad',
    'chuche', 'chuchi', 'chuchiyan', 'mammay', 'mamma',
    'tharki', 'tharak',
    'mooth', 'muthi',
    'budiya', 'tatti', 'tatte',
    'hagna', 'mutna',
    'jhat', 'jhaat', 'jhatu', 'jhaantu',
    'pel', 'pelu', 'pela',
    'rakhel', 'dalal', 'bhadava',
    'nigga', 'nigger', 'fag', 'faggot', 'retard', 'dyke', 'tranny'
];

let match = content.match(/window\.solmatesBadWords = \[([\s\S]*?)\];/);
if (match) {
    let currentWords = match[1];
    let formattedNewWords = '\n    // Extended Hindi/English slang\n    ' + additionalWords.map(w => `'${w}'`).join(', ') + ',';
    
    let newContent = content.replace(/window\.solmatesBadWords = \[([\s\S]*?)\];/, 'window.solmatesBadWords = [' + match[1] + formattedNewWords + '\n];');
    
    fs.writeFileSync('c:/Users/Toshiba/OneDrive/Desktop/solmates/frontend/js/profanity.js', newContent, 'utf8');
    console.log('Words added.');
} else {
    console.log('Array not found.');
}
