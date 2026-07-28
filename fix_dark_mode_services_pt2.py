import re

# 1. Update floating-notepad.css
np_css_path = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\css\floating-notepad.css"
with open(np_css_path, 'r', encoding='utf-8') as f:
    np_content = f.read()

# Add missing dark mode elements to the media query
missing_css = """
  .sol-notepad-header {
    background: rgba(255, 255, 255, 0.02) !important;
  }
  .sol-notepad-select-bar, .sol-notepad-footer {
    background: rgba(0, 0, 0, 0.25) !important;
  }
  .sol-notepad-action-btn.pdf, .sol-notepad-action-btn.delete {
    background: rgba(255, 255, 255, 0.05) !important;
    border-color: rgba(255, 255, 255, 0.1) !important;
  }
  .sol-notepad-action-btn.pdf {
    color: #f87171 !important;
  }
  .sol-notepad-action-btn.delete {
    color: var(--np-sub) !important;
  }
  .sol-notepad-action-btn.pdf:hover {
    background: #ef4444 !important;
    color: white !important;
  }
  .sol-notepad-action-btn.delete:hover {
    background: rgba(255, 255, 255, 0.1) !important;
    color: var(--np-text) !important;
  }
"""
# inject just before the closing brace of media query
if ".sol-notepad-footer {" not in np_content.split("@media (prefers-color-scheme: dark)")[1]:
    np_content = re.sub(
        r'(\.sol-notepad-select:focus,\s*\.sol-notepad-title:focus,\s*\.sol-notepad-textarea:focus\s*\{\s*background:\s*rgba\(255,\s*255,\s*255,\s*0\.1\);\s*border-color:\s*var\(--np-accent\);\s*\})',
        r'\1\n' + missing_css,
        np_content
    )
    with open(np_css_path, 'w', encoding='utf-8') as f:
        f.write(np_content)
    print("Updated floating-notepad.css")

# 2. Update custom-services.html
cs_path = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\tools\custom-services.html"
with open(cs_path, 'r', encoding='utf-8') as f:
    cs_content = f.read()

# Fix header-bar
cs_content = re.sub(
    r'\.header-bar\s*\{\s*background:\s*var\(--surface,\s*#ffffff\);',
    r'.header-bar {\n        background: var(--bg-card);',
    cs_content
)

cs_content = re.sub(
    r'\.header-bar\s*h1\s*\{\s*margin:\s*0;\s*font-size:\s*1\.5rem;\s*font-weight:\s*700;\s*color:\s*var\(--primary,\s*#0f2b46\);',
    r'.header-bar h1 {\n        margin: 0;\n        font-size: 1.5rem;\n        font-weight: 700;\n        color: var(--brand-primary);',
    cs_content
)

# Bump cache versions
cs_content = re.sub(r'sol-cache\.js\?v=[0-9.]+', r'sol-cache.js?v=103.0', cs_content)
cs_content = re.sub(r'config\.js\?v=[0-9.]+', r'config.js?v=130.0', cs_content)

with open(cs_path, 'w', encoding='utf-8') as f:
    f.write(cs_content)
print("Updated custom-services.html")

