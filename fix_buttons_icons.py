import os
import re

db_dir = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database"

for root, dirs, files in os.walk(db_dir):
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Replace var(--primary) with var(--brand-primary) where it makes sense, or fix the buttons.
            # 1. Fix buttons that use var(--primary) background and white text.
            content = re.sub(r'(\.btn[^}]*background:\s*var\(--primary\);[^}]*color:\s*)white;', r'\1var(--bg-body);', content)
            content = re.sub(r'(\.btn-create[^}]*background:\s*var\(--primary\);[^}]*color:\s*)white;', r'\1var(--bg-body);', content)

            # 2. Fix E-books icons in view.html
            if file == 'view.html':
                content = content.replace('color: #facc15;', 'color: var(--brand-accent);')
                content = content.replace('color: #3b82f6;', 'color: var(--brand-primary);')
            
            # 3. If there are other hardcoded white texts on brand-primary buttons, fix them
            content = re.sub(r'(background:\s*(?:#0f2b46|var\(--brand-primary\));[^}]*color:\s*)white;', r'\1var(--bg-body);', content)

            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)

print("Applied fixes to buttons and icons across database pages")
