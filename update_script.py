import os
import re

frontend_dir = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend"

new_script = '''<script>
    (function() {
      const savedTheme = localStorage.getItem('solmates_theme');
      if (savedTheme) {
        document.documentElement.style.colorScheme = savedTheme;
        const darkStyle = document.getElementById('solmates-dark-style');
        if (darkStyle) {
          if (savedTheme === 'dark') { darkStyle.media = 'all'; darkStyle.disabled = false; }
          else if (savedTheme === 'light') { darkStyle.media = 'not all'; darkStyle.disabled = true; }
        }
      }
    })();
  </script>'''

count = 0
for root, dirs, files in os.walk(frontend_dir):
    for file in files:
        if file.endswith('.html'):
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
            html = re.sub(
                r'<script>\s*\(\s*function\(\)\s*\{\s*const\s*savedTheme\s*=\s*localStorage\.getItem\(\'solmates_theme\'\);\s*if\s*\(savedTheme\)\s*\{\s*const\s*darkStyle\s*=\s*document\.getElementById\(\'solmates-dark-style\'\);\s*if\s*\(darkStyle\)\s*\{\s*if\s*\(savedTheme\s*===\s*\'dark\'\)\s*darkStyle\.media\s*=\s*\'all\';\s*else\s*if\s*\(savedTheme\s*===\s*\'light\'\)\s*darkStyle\.media\s*=\s*\'not\s*all\';\s*\}\s*\}\s*\}\)\(\);\s*</script>',
                new_script, html, flags=re.MULTILINE
            )
            
            if html != original_html:
                with open(path, 'w', encoding=used_enc) as f:
                    f.write(html)
                count += 1
                
print(f"Updated anti-flash script via regex in {count} files.")
