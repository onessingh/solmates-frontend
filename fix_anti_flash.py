import os

frontend_dir = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend"

old_anti_flash = '''<script>
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
</script>'''

new_anti_flash = '''<script>
  (function() {
    const savedTheme = localStorage.getItem('solmates_theme');
    if (savedTheme) {
      for (let i = 0; i < document.styleSheets.length; i++) {
        try {
          let sheet = document.styleSheets[i];
          if (sheet.href && new URL(sheet.href, window.location.href).origin !== window.location.origin) continue;
          let rules = sheet.cssRules || sheet.rules;
          if (!rules) continue;
          for (let j = 0; j < rules.length; j++) {
            let rule = rules[j];
            if (rule.conditionText && rule.conditionText.includes('prefers-color-scheme: dark')) {
              if (savedTheme === 'dark') {
                rule.media.mediaText = 'all /* solmates-dark-override */';
              } else if (savedTheme === 'light') {
                rule.media.mediaText = 'not all /* solmates-dark-override */';
              }
            }
          }
        } catch(e) {}
      }
    }
  })();
</script>'''

count = 0
for root, dirs, files in os.walk(frontend_dir):
    for file in files:
        if file.endswith('.html'):
            if file == 'index.html' and root == frontend_dir:
                continue
                
            path = os.path.join(root, file)
            encodings = ['utf-8', 'utf-16', 'windows-1252']
            content = None
            used_enc = None
            for enc in encodings:
                try:
                    with open(path, 'r', encoding=enc) as f:
                        content = f.read()
                    used_enc = enc
                    break
                except UnicodeDecodeError:
                    continue
                    
            if content and old_anti_flash in content:
                content = content.replace(old_anti_flash, new_anti_flash)
                with open(path, 'w', encoding=used_enc) as f:
                    f.write(content)
                count += 1
print(f"Fixed anti-flash theme script in {count} files.")
