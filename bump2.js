const fs = require('fs');
const path = require('path');

function bumpDir(dir, from, to) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      bumpDir(full, from, to);
    } else if (f.endsWith('.html')) {
      let c = fs.readFileSync(full, 'utf8');
      if (c.includes(`v${from}`)) {
        c = c.replace(new RegExp(`v${from}`, 'g'), `v${to}`);
        fs.writeFileSync(full, c);
        console.log('Bumped:', full);
      }
    }
  }
}

bumpDir('c:/Users/Toshiba/OneDrive/Desktop/solmates/frontend', '797', '798');
