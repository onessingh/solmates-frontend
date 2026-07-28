import re
import glob

# Fix games index.html status-live
index_path = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\games\index.html"
with open(index_path, 'r', encoding='utf-8') as f:
    idx_content = f.read()
idx_content = idx_content.replace('background: var(--bg-body);\n              color: #ffffff;', 'background: #0071e3;\n              color: #ffffff;')
with open(index_path, 'w', encoding='utf-8') as f:
    f.write(idx_content)

# Fix game files
game_files = glob.glob(r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\games\*\index.html")

for file in game_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Fix copy button classes
    old_copy_btn = 'class="p-2 ml-4 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100 border border-slate-300 dark:border-slate-600 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"'
    new_copy_btn = 'class="p-2 ml-4 rounded-lg bg-[#0071e3] text-white hover:bg-sky-600 transition-colors shadow-sm"'
    content = content.replace(old_copy_btn, new_copy_btn)

    # 2. Fix option-btn selected state
    content = re.sub(
        r'\.option-btn\.selected\s*\{[^}]*\}', 
        r'.option-btn.selected { background: var(--text-main); border-color: var(--text-main); color: var(--bg-body); }', 
        content
    )

    # 3. Fix option-btn white-space and height for long options
    if '.option-btn {' in content:
        content = re.sub(
            r'(\.option-btn\s*\{)([^}]*)(\})',
            r'\1\2 white-space: normal; height: auto; min-height: 60px; word-wrap: break-word; \3',
            content
        )

    # Bump cache just in case
    content = re.sub(r'sol-cache\.js\?v=[0-9.]+', r'sol-cache.js?v=93.0', content)
    content = re.sub(r'config\.js\?v=[0-9.]+', r'config.js?v=120.0', content)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Fixed games index and individual games.")
