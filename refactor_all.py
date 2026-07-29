import os
import re

frontend_dir = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend"

old_anti_flash_1 = '''<script>
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

old_anti_flash_2 = '''<script>
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

new_anti_flash = '''<script>
  (function() {
    const savedTheme = localStorage.getItem('solmates_theme');
    if (savedTheme) {
      const darkStyle = document.getElementById('solmates-dark-style');
      if (darkStyle) {
        if (savedTheme === 'dark') darkStyle.media = 'all';
        else if (savedTheme === 'light') darkStyle.media = 'not all';
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
            html = None
            used_enc = None
            for enc in encodings:
                try:
                    with open(path, 'r', encoding=enc) as f:
                        html = f.read()
                    used_enc = enc
                    break
                except UnicodeDecodeError:
                    continue
                    
            if not html:
                continue
                
            original_html = html
            
            # 1. Replace anti-flash scripts
            if old_anti_flash_1 in html:
                html = html.replace(old_anti_flash_1, new_anti_flash)
            elif old_anti_flash_2 in html:
                html = html.replace(old_anti_flash_2, new_anti_flash)
            elif new_anti_flash not in html and '</head>' in html:
                html = html.replace('</head>', new_anti_flash + '\n</head>')

            # 2. Extract dark mode blocks
            extracted_css = []
            while True:
                match = re.search(r'@media\s*\(\s*prefers-color-scheme:\s*dark\s*\)\s*\{', html)
                if not match:
                    break
                    
                start_idx = match.start()
                content_start = match.end()
                
                brace_count = 1
                end_idx = -1
                for i in range(content_start, len(html)):
                    if html[i] == '{':
                        brace_count += 1
                    elif html[i] == '}':
                        brace_count -= 1
                        if brace_count == 0:
                            end_idx = i
                            break
                            
                if end_idx != -1:
                    inner_content = html[content_start:end_idx]
                    extracted_css.append(inner_content)
                    html = html[:start_idx] + "/* dark mode moved */" + html[end_idx+1:]
                else:
                    break
            
            # If we extracted anything, append the new style tag before new_anti_flash
            if extracted_css:
                combined_css = "\n".join(extracted_css)
                new_style_tag = f'\n<style id="solmates-dark-style" media="(prefers-color-scheme: dark)">\n{combined_css}\n</style>\n'
                
                if new_anti_flash in html:
                    html = html.replace(new_anti_flash, new_style_tag + new_anti_flash)
                else:
                    html = html.replace('</head>', new_style_tag + '\n</head>')
                    
            if html != original_html:
                with open(path, 'w', encoding=used_enc) as f:
                    f.write(html)
                count += 1

print(f"Refactored CSS and anti-flash in {count} files.")
