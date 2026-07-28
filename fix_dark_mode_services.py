import re

# 1. Update floating-notepad.css
np_css_path = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\css\floating-notepad.css"
with open(np_css_path, 'r', encoding='utf-8') as f:
    np_content = f.read()

dark_mode_np = """
@media (prefers-color-scheme: dark) {
  :root {
    --np-primary: #f8fafc;
    --np-bg: rgba(30, 41, 59, 0.95);
    --np-border: rgba(255, 255, 255, 0.1);
    --np-shadow: 0 12px 40px rgba(0, 0, 0, 0.6);
    --np-text: #f8fafc;
    --np-sub: #94a3b8;
  }
  .sol-notepad-warning {
    background: rgba(192, 150, 45, 0.2);
    color: #fcd34d;
  }
  .sol-notepad-header {
    border-bottom-color: var(--np-border);
  }
  .sol-notepad-select, .sol-notepad-title, .sol-notepad-textarea {
    background: rgba(255, 255, 255, 0.05);
    color: var(--np-text);
    border-color: var(--np-border);
  }
  .sol-notepad-select:focus, .sol-notepad-title:focus, .sol-notepad-textarea:focus {
    background: rgba(255, 255, 255, 0.1);
    border-color: var(--np-accent);
  }
}
"""

if "@media (prefers-color-scheme: dark)" not in np_content:
    np_content = np_content + dark_mode_np
    with open(np_css_path, 'w', encoding='utf-8') as f:
        f.write(np_content)
    print("Updated floating-notepad.css")

# 2. Update custom-services.html
cs_path = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\tools\custom-services.html"
with open(cs_path, 'r', encoding='utf-8') as f:
    cs_content = f.read()

# Replace hardcoded input colors
cs_content = re.sub(
    r'\.input-field,\s*\.select-field,\s*\.textarea-field\s*\{[^\}]+\}',
    r'.input-field, .select-field, .textarea-field {\n      width: 100%;\n      padding: 12px 15px;\n      border: 2px solid var(--border-color);\n      border-radius: 12px;\n      font-size: 16px;\n      background: var(--bg-card);\n      color: var(--text-main);\n      transition: 0.3s;\n    }',
    cs_content
)

cs_content = re.sub(
    r'\.input-field:focus,\s*\.select-field:focus,\s*\.textarea-field:focus\s*\{[^\}]+\}',
    r'.input-field:focus, .select-field:focus, .textarea-field:focus {\n      border-color: #0071e3;\n      background: var(--bg-card-hover);\n      box-shadow: 0 0 0 4px rgba(0, 113, 227, 0.05);\n      outline: none;\n    }',
    cs_content
)

cs_content = re.sub(
    r'\.file-input-wrapper\s*\{[^\}]+\}',
    r'.file-input-wrapper {\n      position: relative;\n      display: flex;\n      align-items: center;\n      gap: 10px;\n      padding: 15px;\n      border: 2px dashed var(--border-color);\n      border-radius: 12px;\n      background: var(--bg-card);\n      cursor: pointer;\n      transition: all 0.3s;\n      color: var(--text-main);\n    }',
    cs_content
)

cs_content = re.sub(
    r'\.file-input-wrapper:hover\s*\{[^\}]+\}',
    r'.file-input-wrapper:hover {\n      background: var(--bg-card-hover);\n      border-color: #0071e3;\n    }',
    cs_content
)

# Fix Request Form box background
cs_content = re.sub(
    r'\.request-box\s*\{([^}]+)background:\s*#111c2e;([^}]+)\}',
    r'.request-box {\1background: var(--bg-card);\2}',
    cs_content
)

# Let's verify and bump cache versions
cs_content = re.sub(r'sol-cache\.js\?v=[0-9.]+', r'sol-cache.js?v=101.0', cs_content)
cs_content = re.sub(r'config\.js\?v=[0-9.]+', r'config.js?v=128.0', cs_content)

with open(cs_path, 'w', encoding='utf-8') as f:
    f.write(cs_content)
print("Updated custom-services.html")

