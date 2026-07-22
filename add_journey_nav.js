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
        
        // 1. Remove any existing Journey links entirely first, so we don't duplicate
        c = c.replace(/<a href="\/journey"[^>]*>.*?Journey<\/a>\s*/g, '');
        c = c.replace(/<a href="\/journey">\s*<i[^>]*><\/i>\s*Journey\s*<\/a>\s*/g, '');
        
        // 2. Add Journey link after Games link in desktop nav
        // Desktop nav usually doesn't have icons
        c = c.replace(/(<a href="\/games"[^>]*>.*?Games<\/a>\s*)/g, '$1      <a href="/journey">Journey</a>\n');
        
        // 3. Add Journey link after Games link in mobile nav
        // Mobile nav has font-awesome icons
        // Look for Games link with icon
        c = c.replace(/(<a href="\/games"[^>]*>\s*<i[^>]*><\/i>\s*Games\s*<\/a>\s*)/g, '$1    <a href="/journey"><i class="fas fa-road"></i> Journey</a>\n');
        
        fs.writeFileSync(f, c);
        console.log('Updated', f);
    } catch(e) {
        console.error('Error in', f, e.message);
    }
});
