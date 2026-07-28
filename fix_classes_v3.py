import os
import re

filepath = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database\classes\index.html"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# For .database-btn
content = re.sub(r'(\.database-btn\s*\{[^}]*background:\s*var\(--text-main\);[^}]*)color:\s*white;', r'\1color: var(--bg-body);', content)

# For .tab-btn.active
content = re.sub(r'(\.tab-btn\.active\s*\{[^}]*background:\s*var\(--text-main\);[^}]*)color:\s*white;', r'\1color: var(--bg-body);', content)

# For .join-btn
content = re.sub(r'(\.join-btn\s*\{[^}]*background:\s*var\(--text-main\);[^}]*)color:\s*white;', r'\1color: var(--bg-body);', content)

# For .btn-delete:hover
content = re.sub(r'(\.btn-delete:hover\s*\{[^}]*)color:\s*white;', r'\1color: var(--bg-body);', content)

# For showNotification div
content = content.replace('color:white;', 'color:var(--bg-body);')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed white text on text-main backgrounds")
