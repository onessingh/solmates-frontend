const fs = require('fs');
const files = [
    'c:/Users/Toshiba/OneDrive/Desktop/solmates/frontend/database/index.html',
    'c:/Users/Toshiba/OneDrive/Desktop/solmates/frontend/database/view.html',
    'c:/Users/Toshiba/OneDrive/Desktop/solmates/frontend/tools/index.html',
    'c:/Users/Toshiba/OneDrive/Desktop/solmates/frontend/skills/index.html',
    'c:/Users/Toshiba/OneDrive/Desktop/solmates/frontend/feedback.html'
];

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    
    // Replace desktop nav
    content = content.replace(/<a href="\/journey">Journey<\/a>/g, '<a href="/games">Games</a>');
    
    // Replace mobile nav
    content = content.replace(/<a href="\/journey">\s*<i class="fas fa-road"><\/i> Journey\s*<\/a>/g, '<a href="/games">\n      <i class="fas fa-gamepad"></i> Games\n    </a>');
    content = content.replace(/<a href="\/journey"><i class="fas fa-road"><\/i> Journey<\/a>/g, '<a href="/games"><i class="fas fa-gamepad"></i> Games</a>');
    
    fs.writeFileSync(f, content);
});
console.log('Links updated');
