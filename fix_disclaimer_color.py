import re

cs_path = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\tools\custom-services.html"
with open(cs_path, 'r', encoding='utf-8') as f:
    cs_content = f.read()

# Replace pink color with var(--text-muted)
cs_content = cs_content.replace(
    'color: #d946ef;',
    'color: var(--text-muted);'
)

# Bump cache versions
cs_content = re.sub(r'sol-cache\.js\?v=[0-9.]+', r'sol-cache.js?v=105.0', cs_content)
cs_content = re.sub(r'config\.js\?v=[0-9.]+', r'config.js?v=132.0', cs_content)

with open(cs_path, 'w', encoding='utf-8') as f:
    f.write(cs_content)
print("Updated disclaimer text color")

