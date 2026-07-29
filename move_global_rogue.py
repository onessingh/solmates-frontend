import os
import re

frontend_dir = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend"

rogue_str = '''        body { background: var(--bg-body, #0f172a) !important; color: var(--text-main, #f8fafc) !important; }
        .top-nav, .header-bar, header { background: var(--bg-nav, rgba(15,23,42,0.95)) !important; border-bottom: 1px solid var(--border-color, #334155) !important; }
        .card, .form-card, .result-box, .white-box, .container, .main-content, .card-body, .resume-preview, .feature-item, .info-box { 
            background: var(--bg-card, #1e293b) !important; 
            border: 1px solid var(--border-color, #334155) !important; 
        }
        h1, h2, h3, h4, .nav-logo { color: var(--text-main, #f8fafc) !important; background: none !important; -webkit-text-fill-color: var(--text-main, #f8fafc) !important; }
        h1 i, h2 i, h3 i, .icon { -webkit-text-fill-color: var(--brand-accent, #c0962d) !important; color: var(--brand-accent, #c0962d) !important; }
        .apple-sub, p, label, .form-label, .text-muted { color: var(--text-muted, #94a3b8) !important; }
        input, select, textarea, .searchable-select .select-btn, .search-box input, .dropdown, .input-field, .select-field, .textarea-field { 
            background: var(--bg-card-hover, #334155) !important; 
            color: var(--text-main, #f8fafc) !important; 
            border: 1px solid var(--border-color, #475569) !important; 
        }
        input:focus, select:focus, textarea:focus, .searchable-select .select-btn:hover {
            border-color: var(--brand-primary, #60a5fa) !important;
        }
        .back-link, .btn-secondary { color: var(--brand-accent, #c0962d) !important; background: rgba(192, 150, 45, 0.1) !important; }
        .searchable-select .dropdown option, .searchable-select .option { background: var(--bg-card-hover, #334155) !important; color: var(--text-main, #f8fafc) !important; }
        .searchable-select .option:hover { background: var(--bg-card, #1e293b) !important; }'''

# Normalise newlines and spaces for search
def normalize(s):
    return re.sub(r'\s+', ' ', s).strip()

rogue_norm = normalize(rogue_str)

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
                
            # Search for the block using a regex that ignores whitespace differences
            pattern = re.escape(rogue_str).replace(r'\ ', r'\s*').replace(r'\n', r'\s*')
            
            match = re.search(r'body\s*\{\s*background:\s*var\(--bg-body,\s*#0f172a\)\s*!important;\s*color:\s*var\(--text-main,\s*#f8fafc\)\s*!important;\s*\}.*?\.searchable-select\s*\.option:hover\s*\{\s*background:\s*var\(--bg-card,\s*#1e293b\)\s*!important;\s*\}', html, re.DOTALL)
            
            if match:
                idx = match.start()
                dark_style_idx = html.find('id="solmates-dark-style"')
                if dark_style_idx == -1 or idx < dark_style_idx:
                    rogue_css = match.group(0)
                    
                    # Remove from base style
                    html = html[:idx] + html[match.end():]
                    
                    # Append to solmates-dark-style
                    if dark_style_idx != -1:
                        # recalculate because string length changed
                        dark_style_idx = html.find('id="solmates-dark-style"')
                        close_idx = html.find('</style>', dark_style_idx)
                        if close_idx != -1:
                            html = html[:close_idx] + '\n' + rogue_css + '\n' + html[close_idx:]
                    
                    with open(path, 'w', encoding=used_enc) as f:
                        f.write(html)
                    count += 1

print(f"Moved global rogue CSS in {count} files.")
