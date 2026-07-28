import os
import re

def fix_back_btn(filepath):
    if not os.path.exists(filepath): return
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # The string we added previously
    old_css = """          .back-btn {
              color: var(--text-main) !important;
          }"""
    
    new_css = """          .back-btn {
              background: var(--bg-card-hover) !important;
              color: var(--text-main) !important;
              border: 1px solid var(--border-color) !important;
          }"""
    
    if old_css in content:
        content = content.replace(old_css, new_css)
    else:
        # Maybe indentation is slightly different
        import re
        content = re.sub(r'\.back-btn\s*{\s*color:\s*var\(--text-main\)\s*!important;\s*}', new_css, content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Fixed {filepath}")

fix_back_btn(r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database\ai-knowledge.html")
fix_back_btn(r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database\recycle-bin.html")
