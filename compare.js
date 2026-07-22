const fs = require('fs');
const tools = fs.readFileSync('c:/Users/Toshiba/OneDrive/Desktop/solmates/frontend/tools/index.html', 'utf8');
const games = fs.readFileSync('c:/Users/Toshiba/OneDrive/Desktop/solmates/frontend/games/index.html', 'utf8');

const getHeader = (html) => {
    const start = html.indexOf('<div class="header-bar">');
    let count = 0;
    let end = start;
    let match = true;
    for(let i=start; i<start+1500; i++) {
       if (html.substring(i, i+4) === '<div') count++;
       if (html.substring(i, i+5) === '</div') count--;
       if (html.substring(i, i+5) === '</div' && count === 0) { end = i+6; break; }
    }
    return html.substring(start, end);
}

console.log('--- TOOLS HEADER ---');
console.log(getHeader(tools));
console.log('\n--- GAMES HEADER ---');
console.log(getHeader(games));
