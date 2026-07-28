import os
import re

def fix_file(filepath, dark_overrides):
    if not os.path.exists(filepath): return
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Append to dark mode block
    parts = content.split('</style>')
    for i, part in enumerate(parts):
        if '@media (prefers-color-scheme: dark)' in part:
            # We don't want to duplicate if already added, but it's safe if we don't have exactly the same text
            # Let's just append right before the last closing brace of the part
            last_brace_idx = part.rfind('}')
            if last_brace_idx != -1:
                parts[i] = part[:last_brace_idx] + dark_overrides + part[last_brace_idx:]
    
    new_content = '</style>'.join(parts)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Fixed {filepath}")

# 1. YouTube Browse
fix_file(r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database\youtube-browse.html", """
          .btn-create {
            background: #1e293b !important;
            color: #f8fafc !important;
            border: 1px solid #334155 !important;
          }
          .admin-bar {
            background: #0f172a !important;
            border-color: #334155 !important;
          }
""")

# 2. AI Knowledge
fix_file(r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database\ai-knowledge.html", """
          .navbar {
              background: var(--bg-nav) !important;
              border-bottom: 1px solid var(--border-color) !important;
          }
          .btn-add {
              background: #0071e3 !important;
              color: white !important;
          }
          .back-btn {
              color: var(--text-main) !important;
          }
""")

# 3. Recycle Bin
fix_file(r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database\recycle-bin.html", """
          .top-nav {
              background: var(--bg-nav) !important;
              border-bottom: 1px solid var(--border-color) !important;
          }
          .nav-logo {
              color: var(--text-main) !important;
          }
          .back-btn {
              color: var(--text-main) !important;
          }
""")

