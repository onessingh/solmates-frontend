const fs = require('fs');
const files = [
    'c:/Users/Toshiba/OneDrive/Desktop/solmates/frontend/index.html',
    'c:/Users/Toshiba/OneDrive/Desktop/solmates/frontend/database/index.html',
    'c:/Users/Toshiba/OneDrive/Desktop/solmates/frontend/database/view.html',
    'c:/Users/Toshiba/OneDrive/Desktop/solmates/frontend/tools/index.html',
    'c:/Users/Toshiba/OneDrive/Desktop/solmates/frontend/skills/index.html',
    'c:/Users/Toshiba/OneDrive/Desktop/solmates/frontend/journey/index.html',
    'c:/Users/Toshiba/OneDrive/Desktop/solmates/frontend/games/index.html',
    'c:/Users/Toshiba/OneDrive/Desktop/solmates/frontend/feedback.html'
];
files.forEach(f => {
    try {
        if (!fs.existsSync(f)) return;
        let c = fs.readFileSync(f, 'utf8');
        
        // Remove ALL journey links first to start clean
        c = c.replace(/<a href="\/journey".*?<\/a>\s*/g, '');
        
        // Now carefully insert Desktop Journey link
        // We find the <a href="/games">Games</a> (no icons inside)
        c = c.replace(/(<a href="\/games"(?: class="active")?(?: title="Games")?>Games<\/a>\s*)/g, '$1      <a href="/journey">Journey</a>\n');
        
        // Now carefully insert Mobile Journey link
        // We find the <a href="/games"><i class="..."></i> Games</a>
        c = c.replace(/(<a href="\/games"(?: class="active")?>\s*<i class="[^"]+"><\/i>\s*Games\s*<\/a>\s*)/g, '$1      <a href="/journey"><i class="fas fa-road"></i> Journey</a>\n');
        
        fs.writeFileSync(f, c);
        console.log('Fixed', f);
    } catch(e) {
        console.error('Error in', f, e.message);
    }
});
