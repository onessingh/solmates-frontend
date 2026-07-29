import os
import re

frontend_dir = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend"

count = 0
for root, dirs, files in os.walk(frontend_dir):
    for file in files:
        if file.endswith('.html'):
            path = os.path.join(root, file)
            try:
                with open(path, 'r', encoding='utf-8') as f:
                    html = f.read()
            except:
                continue
                
            # Regex to find the rogue block. It usually starts with "body { background: var(--bg-body, #0f172a) !important;"
            # or ".card, .form-card, ..."
            # We will use a regex that captures from ody { background: var(--bg-body, #0f172a) !important; up to .searchable-select .option:hover { background: var(--bg-card, #1e293b) !important; }
            
            pattern = r'(\s*body\s*\{\s*background:\s*var\(--bg-body,\s*#0f172a\)\s*!important;.*?\.searchable-select\s*\.option:hover\s*\{\s*background:\s*var\(--bg-card,\s*#1e293b\)\s*!important;\s*\})'
            
            match = re.search(pattern, html, re.DOTALL)
            if match:
                rogue_css = match.group(1)
                
                # Check if it's outside solmates-dark-style
                idx = match.start()
                dark_style_idx = html.find('id="solmates-dark-style"')
                if dark_style_idx == -1 or idx < dark_style_idx:
                    # Remove from base style
                    html = html[:idx] + html[idx+len(rogue_css):]
                    
                    # Append to solmates-dark-style
                    if dark_style_idx != -1:
                        # Find the closing </style> of solmates-dark-style
                        # The tag starts at dark_style_idx.
                        close_idx = html.find('</style>', dark_style_idx)
                        if close_idx != -1:
                            html = html[:close_idx] + rogue_css + '\n' + html[close_idx:]
                    
                    with open(path, 'w', encoding='utf-8') as f:
                        f.write(html)
                    count += 1
print(f"Moved rogue CSS in {count} files.")
