import os
import re

base_dir = r'c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend'
view_path = os.path.join(base_dir, 'database', 'view.html')

with open(view_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Bump cache version to 712
content = content.replace('?v=711', '?v=712')

# 2. Add dynamic title
target = "document.getElementById('pageTitle').innerText = CAT_LABELS[CATEGORY] || 'Database';"
replacement = target + "\n        document.title = (CAT_LABELS[CATEGORY] || 'Database') + ' - DU SOL MBA | Solmates';"
content = content.replace(target, replacement)

with open(view_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Restored dynamic title and bumped cache without corrupting characters in view.html")
