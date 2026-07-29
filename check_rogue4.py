import os

frontend_dir = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend"

start_str = "body { background: var(--bg-body, #0f172a) !important; color: var(--text-main, #f8fafc) !important; }"

count = 0
for root, dirs, files in os.walk(frontend_dir):
    for file in files:
        if file.endswith('.html'):
            path = os.path.join(root, file)
            encodings = ['utf-8', 'utf-16', 'windows-1252']
            html = None
            for enc in encodings:
                try:
                    with open(path, 'r', encoding=enc) as f:
                        html = f.read()
                    break
                except UnicodeDecodeError:
                    continue
                    
            if html:
                idx1 = html.find('h1, h2, h3, h4, .nav-logo { color: var(--text-main, #f8fafc) !important;')
                idx2 = html.find('id="solmates-dark-style"')
                if idx1 != -1:
                    if idx2 == -1 or idx1 < idx2:
                        count += 1
                        print(path)

print(f"Files containing rogue style: {count}")
