const fs = require('fs');
const files = [
  'c:/Users/Toshiba/OneDrive/Desktop/solmates/frontend/js/sol-cache.js',
  'c:/Users/Toshiba/OneDrive/Desktop/solmates/frontend/sw.js',
];

const filesToBump = require('fs').readdirSync('c:/Users/Toshiba/OneDrive/Desktop/solmates/frontend').filter(f => f.endsWith('.html'));
const dbFiles = require('fs').readdirSync('c:/Users/Toshiba/OneDrive/Desktop/solmates/frontend/database').filter(f => f.endsWith('.html'));

const allFiles = files;

const bump = (content, from, to) => {
  return content.replace(new RegExp(`v${from}`, 'g'), `v${to}`);
};

for (const f of allFiles) {
  let c = fs.readFileSync(f, 'utf8');
  c = bump(c, '797', '798');
  fs.writeFileSync(f, c);
  console.log('Bumped:', f);
}
