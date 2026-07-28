import re

file_path = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database\classes\index.html"
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace live-class-section background
content = re.sub(
    r'(\.live-class-section\s*\{\s*)background:\s*var\(--bg-card-hover\);',
    r'\1background: transparent;',
    content
)

# Replace footer background
content = re.sub(
    r'(\.footer\s*\{[\s\S]*?)background:\s*var\(--bg-card-hover\);',
    r'\1background: transparent;',
    content
)

# Bump cache
content = re.sub(r'sol-cache\.js\?v=[0-9.]+', r'sol-cache.js?v=95.0', content)
content = re.sub(r'config\.js\?v=[0-9.]+', r'config.js?v=122.0', content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated backgrounds in database/classes/index.html")
