const fs = require('fs');

// 1. index.html - Initial theme script
let idx = fs.readFileSync('index.html', 'utf8');
idx = idx.replace(
    /\/\/ Set theme-color IMMEDIATELY before anything renders \(for TWA nav bar\)\s*\([\s\S]*?\)\(\);/g,
    `// Set theme-color IMMEDIATELY before anything renders (for TWA nav bar)\n    (function() {\n      var t = localStorage.getItem('solmates_theme') || 'light';\n      var m = document.getElementById('theme-color-meta');\n\n      if (m) {\n        m.setAttribute('content', t === 'dark' ? '#0f172a' : '#ffffff');\n      }\n\n      document.documentElement.setAttribute('data-solmates-theme', t);\n    })();`
);

// 4. index.html - Delete OS Dark Mode listener
idx = idx.replace(
    /window\.matchMedia\('\(prefers-color-scheme: dark\)'\)\.addEventListener\('change'[\s\S]*?\}\);/g,
    ""
);
fs.writeFileSync('index.html', idx);


// config.js - 2. & 3.
if (fs.existsSync('js/config.js')) {
    let cfg = fs.readFileSync('js/config.js', 'utf8');
    
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
    
    fs.writeFileSync('js/config.js', cfg);
} else { console.log('js/config.js not found'); }

// 5. webview-fix.js - 500ms wait and observer
if (fs.existsSync('js/webview-fix.js')) {
    let wvf = fs.readFileSync('js/webview-fix.js', 'utf8');
    wvf = wvf.replace(/setTimeout\(syncStatusBar, 500\);/g, "syncStatusBar();");
    wvf = wvf.replace(/attributeFilter: \['class'\]/g, "attributeFilter: ['class', 'style']");
    fs.writeFileSync('js/webview-fix.js', wvf);
} else { console.log('js/webview-fix.js not found'); }

// 6. manifest.json - background_color & theme_color
if (fs.existsSync('manifest.json')) {
    let man = fs.readFileSync('manifest.json', 'utf8');
    man = man.replace(/"background_color":\s*"#ffffff"/g, `"background_color": "#0f172a"`);
    man = man.replace(/"theme_color":\s*"#ffffff"/g, `"theme_color": "#0f172a"`);
    man = man.replace(/"theme_color":\s*"#0f2b46"/g, `"theme_color": "#0f172a"`); // just in case
    fs.writeFileSync('manifest.json', man);
} else { console.log('manifest.json not found'); }

console.log("Replacements done.");
