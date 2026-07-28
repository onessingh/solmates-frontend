import re

# 1. Update floating-notepad.css
np_css_path = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\css\floating-notepad.css"
with open(np_css_path, 'r', encoding='utf-8') as f:
    np_content = f.read()

if ".sol-notepad-new-btn {" not in np_content.split("@media (prefers-color-scheme: dark)")[1]:
    np_content = re.sub(
        r'(\.sol-notepad-action-btn\.delete:hover\s*\{\s*background:\s*rgba\(255,\s*255,\s*255,\s*0\.1\)\s*!important;\s*color:\s*var\(--np-text\)\s*!important;\s*\})',
        r'\1\n  .sol-notepad-new-btn {\n    color: #0f172a !important;\n    font-weight: 600;\n  }',
        np_content
    )
    with open(np_css_path, 'w', encoding='utf-8') as f:
        f.write(np_content)
    print("Updated floating-notepad.css for new button")

# 2. Update custom-services.html (Remove footer)
cs_path = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\tools\custom-services.html"
with open(cs_path, 'r', encoding='utf-8') as f:
    cs_content = f.read()

# Remove footer HTML
cs_content = re.sub(
    r'<div class="footer">\s*<p>2026 SOLMATES[^<]*</p>\s*</div>',
    r'',
    cs_content
)

# Also remove the padding/margin at the bottom of .container if it creates too much space
# The form-card has margin-bottom: 30px; which is fine.

# Bump cache versions
cs_content = re.sub(r'sol-cache\.js\?v=[0-9.]+', r'sol-cache.js?v=104.0', cs_content)
cs_content = re.sub(r'config\.js\?v=[0-9.]+', r'config.js?v=131.0', cs_content)

with open(cs_path, 'w', encoding='utf-8') as f:
    f.write(cs_content)
print("Removed footer from custom-services.html")

