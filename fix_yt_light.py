import os
import re

def fix_youtube_light_mode(filepath):
    if not os.path.exists(filepath): return
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    content = re.sub(r'(\.breadcrumb\s*\{[^}]*?background:\s*)var\(--bg-nav\);', r'\1rgba(255, 255, 255, 0.82);', content, count=1)
    content = re.sub(r'(\.breadcrumb\s*\{[^}]*?border-bottom:\s*1px\s+solid\s*)var\(--border-color\);', r'\1rgba(0, 0, 0, 0.05);', content, count=1)
    content = re.sub(r'(\.folder-card\.centered-folder\s*\{\s*[^}]*?background:\s*)#0f172a;', r'\1var(--card);', content, count=1)

    dark_mode_overrides = """
          .breadcrumb {
            background: var(--bg-nav) !important;
            border-bottom: 1px solid var(--border-color) !important;
          }
          .folder-card.centered-folder {
            background: #0f172a !important;
          }
"""
    
    parts = content.split('</style>')
    if len(parts) > 1 and '.breadcrumb {' not in parts[0].split('@media (prefers-color-scheme: dark)')[-1]:
        # we find the very last } before </style>
        last_brace_idx = parts[0].rfind('}')
        if last_brace_idx != -1:
            new_style_content = parts[0][:last_brace_idx] + dark_mode_overrides + parts[0][last_brace_idx:]
            content = new_style_content + '</style>' + parts[1]

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Fixed {os.path.basename(filepath)}")

fix_youtube_light_mode(r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database\youtube-content.html")
fix_youtube_light_mode(r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database\youtube-browse.html")
