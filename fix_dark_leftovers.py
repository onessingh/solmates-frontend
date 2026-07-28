import os
import re

def fix_notification():
    filepath = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\notification.html"
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    dark_overrides = """
          .empty-state {
            background: var(--bg-card) !important;
            border-color: var(--border-color) !important;
          }
"""
    
    parts = content.split('</style>')
    for i, part in enumerate(parts):
        if '@media (prefers-color-scheme: dark)' in part and '.empty-state {' not in part.split('@media (prefers-color-scheme: dark)')[-1]:
            last_brace_idx = part.rfind('}')
            if last_brace_idx != -1:
                parts[i] = part[:last_brace_idx] + dark_overrides + part[last_brace_idx:]
    
    new_content = '</style>'.join(parts)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Fixed notification.html")

def fix_database_index():
    filepath = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database\index.html"
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    dark_overrides = """
          a[href="/database/ai-knowledge"] {
            background: rgba(192, 150, 45, 0.1) !important;
            border-color: rgba(192, 150, 45, 0.3) !important;
          }
          a[href="/database/ai-knowledge"] h2 {
            color: #eab308 !important;
          }
          a[href="/database/ai-knowledge"] p {
            color: var(--text-muted) !important;
          }
          .recycle-bin-card {
            background: rgba(99, 102, 241, 0.1) !important;
            border-color: rgba(99, 102, 241, 0.3) !important;
          }
          .recycle-bin-card:hover {
            background: rgba(99, 102, 241, 0.2) !important;
          }
"""
    parts = content.split('</style>')
    for i, part in enumerate(parts):
        if '@media (prefers-color-scheme: dark)' in part and '.recycle-bin-card {' not in part.split('@media (prefers-color-scheme: dark)')[-1]:
            last_brace_idx = part.rfind('}')
            if last_brace_idx != -1:
                parts[i] = part[:last_brace_idx] + dark_overrides + part[last_brace_idx:]
    
    new_content = '</style>'.join(parts)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Fixed database/index.html")

def fix_youtube(filename):
    filepath = rf"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database\{filename}"
    if not os.path.exists(filepath): return
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    dark_overrides = """
        .btn-dark {
            background: #1e293b !important;
            color: #f8fafc !important;
            border-color: #334155 !important;
        }
        .btn-dark:hover {
            background: #334155 !important;
        }
"""
    
    parts = content.split('</style>')
    for i, part in enumerate(parts):
        if '@media (prefers-color-scheme: dark)' in part and '.btn-dark {' not in part.split('@media (prefers-color-scheme: dark)')[-1]:
            last_brace_idx = part.rfind('}')
            if last_brace_idx != -1:
                parts[i] = part[:last_brace_idx] + dark_overrides + part[last_brace_idx:]
    
    new_content = '</style>'.join(parts)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Fixed {filename}")

fix_notification()
fix_database_index()
fix_youtube("youtube-content.html")
fix_youtube("youtube-browse.html")
