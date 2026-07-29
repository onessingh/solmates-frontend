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
                    
            if html and start_str in html:
                count += 1

print(f"Files containing string: {count}")
