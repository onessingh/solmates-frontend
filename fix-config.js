const fs = require('fs');

// config.js - 2. & 3.
let cfg = fs.readFileSync('config.js', 'utf8');

// 2. config.js isDark
cfg = cfg.replace(
    /const isDark = theme === 'dark' \|\| \(\!theme && window\.matchMedia && window\.matchMedia\('\(prefers-color-scheme: dark\)'\)\.matches\);/g,
    `const isDark = theme === 'dark';`
);

// 3. config.js updateThemeColor function
cfg = cfg.replace(
    /document\.querySelectorAll\('meta\[name="theme-color"\]'\)\.forEach\(el => el\.remove\(\)\);[\s\S]*?document\.head\.appendChild\(metaTheme\);/g,
    `const metaTheme = document.getElementById('theme-color-meta');\n    if (metaTheme) {\n        metaTheme.setAttribute('content', color);\n    }`
);

fs.writeFileSync('config.js', cfg);
console.log("config.js fixed");
