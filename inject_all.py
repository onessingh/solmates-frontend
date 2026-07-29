import os

frontend_dir = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend"

anti_flash = '''
<script>
  (function() {
    const savedTheme = localStorage.getItem('solmates_theme');
    if (savedTheme) {
      try {
        for (let i = 0; i < document.styleSheets.length; i++) {
          let sheet = document.styleSheets[i];
          if (sheet.href && new URL(sheet.href).origin !== window.location.origin) continue;
          let rules = sheet.cssRules || sheet.rules;
          if (!rules) continue;
          for (let j = 0; j < rules.length; j++) {
            let rule = rules[j];
            if (rule.conditionText && rule.conditionText.includes('prefers-color-scheme: dark')) {
              if (savedTheme === 'dark') {
                rule.media.mediaText = 'all';
              } else if (savedTheme === 'light') {
                rule.media.mediaText = 'not all';
              }
            }
          }
        }
      } catch(e) {}
    }
  })();
</script>
'''

count = 0
for root, dirs, files in os.walk(frontend_dir):
    for file in files:
        if file.endswith('.html'):
            if file == 'index.html' and root == frontend_dir:
                continue # Skip main index
                
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
                
            if 'localStorage.getItem(\'solmates_theme\')' not in content:
                # Find </head> to inject right before it
                if '</head>' in content:
                    content = content.replace('</head>', anti_flash + '</head>')
                    with open(path, 'w', encoding='utf-8') as f:
                        f.write(content)
                    count += 1
print(f"Injected anti-flash theme script into {count} files.")
