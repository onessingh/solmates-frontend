const fs = require('fs');
const files = [
    'c:/Users/Toshiba/OneDrive/Desktop/solmates/frontend/database/index.html',
    'c:/Users/Toshiba/OneDrive/Desktop/solmates/frontend/journey/index.html',
    'c:/Users/Toshiba/OneDrive/Desktop/solmates/frontend/skills/index.html'
];
files.forEach(f => {
    try {
        let content = fs.readFileSync(f, 'utf8');
        content = content.replace(/<a href="\/journey" title="Journey">Journey<\/a>/g, '<a href="/games" title="Games">Games</a>');
        content = content.replace(/<a href="\/journey">\s*<i class="fas fa-road"><\/i> Journey\s*<\/a>/g, '<a href="/games">\n      <i class="fas fa-gamepad"></i> Games\n    </a>');
        content = content.replace(/<a href="\/journey"><i class="fas fa-road"><\/i> Journey<\/a>/g, '<a href="/games"><i class="fas fa-gamepad"></i> Games</a>');
        fs.writeFileSync(f, content);
    } catch(e) {}
});
console.log('Fixed missed Journey links');
