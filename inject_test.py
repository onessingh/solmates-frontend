import re

html_path = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\tools\salary-calculator.html"
with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

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

if 'localStorage.getItem(\'solmates_theme\')' not in html:
    html = html.replace('</head>', anti_flash + '</head>')
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print("Injected into salary-calculator")
else:
    print("Already injected")
