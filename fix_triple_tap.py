import re

tools_path = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\tools\index.html"
with open(tools_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace hardcoded inline styles for the triple tap box
old_style = 'font-size:10px;color:#0f2b46;background:rgba(15,43,70,0.06);padding:5px 10px;border-radius:6px;border:1px dashed rgba(15,43,70,0.15);font-weight:500;line-height:1.4;'
new_style = 'font-size:10px;color:var(--brand-accent);background:var(--bg-body);padding:5px 10px;border-radius:6px;border:1px dashed var(--brand-accent);font-weight:500;line-height:1.4;'

if old_style in content:
    content = content.replace(old_style, new_style)
    # Bump cache
    content = re.sub(r'sol-cache\.js\?v=[0-9.]+', r'sol-cache.js?v=106.0', content)
    content = re.sub(r'config\.js\?v=[0-9.]+', r'config.js?v=133.0', content)
    with open(tools_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Fixed triple tap text box in tools/index.html")
else:
    print("Could not find the old style exactly. Attempting regex replacement.")
    content = re.sub(
        r'font-size:10px;color:#0f2b46;background:rgba\(15,43,70,0\.06\);.*?line-height:1\.4;',
        new_style,
        content
    )
    content = re.sub(r'sol-cache\.js\?v=[0-9.]+', r'sol-cache.js?v=106.0', content)
    content = re.sub(r'config\.js\?v=[0-9.]+', r'config.js?v=133.0', content)
    with open(tools_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Replaced via regex.")
