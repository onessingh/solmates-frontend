import os

frontend_dir = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend"

for root, dirs, files in os.walk(frontend_dir):
    for file in files:
        if file.endswith('.html') or file.endswith('.js'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            if 'background:#fff;' in content or 'color:#111;' in content or 'color:#333;' in content or "background: '#fff'" in content:
                content = content.replace('background:#fff;', 'background:var(--bg-card);')
                content = content.replace("background: '#fff'", "background: 'var(--bg-card)'")
                content = content.replace('color:#111;', 'color:var(--text-main);')
                content = content.replace('color:#333;', 'color:var(--text-main);')
                content = content.replace("color: '#111'", "color: 'var(--text-main)'")
                content = content.replace("color: '#333'", "color: 'var(--text-main)'")

                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)

print("Fixed hardcoded colors inside JS strings")
