import os

frontend_dir = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend"

start_str = "body { background: var(--bg-body, #0f172a) !important; color: var(--text-main, #f8fafc) !important; }"
end_str = ".searchable-select .option:hover { background: var(--bg-card, #1e293b) !important; }"

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
                
            idx1 = html.find(start_str)
            if idx1 != -1:
                idx2 = html.find(end_str, idx1)
                if idx2 != -1:
                    end_idx = idx2 + len(end_str)
                    
                    # Ensure it is NOT already inside solmates-dark-style
                    dark_style_idx = html.find('id="solmates-dark-style"')
                    if dark_style_idx == -1 or idx1 < dark_style_idx:
                        rogue_css = html[idx1:end_idx]
                        
                        # Remove from base style
                        html = html[:idx1] + html[end_idx:]
                        
                        # Find where to append it
                        if dark_style_idx != -1:
                            # Because we removed text BEFORE dark_style_idx, we must recalculate
                            dark_style_idx = html.find('id="solmates-dark-style"')
                            close_idx = html.find('</style>', dark_style_idx)
                            if close_idx != -1:
                                html = html[:close_idx] + '\n' + rogue_css + '\n' + html[close_idx:]
                        
                        with open(path, 'w', encoding=used_enc) as f:
                            f.write(html)
                        count += 1

print(f"Moved rogue CSS in {count} files.")
