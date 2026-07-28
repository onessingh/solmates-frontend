import os
import re

filepath = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database\classes\index.html"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

replacements = {
    r"color:\s*#0f172a;?": "color: var(--text-main);",
    r"color:\s*#1e293b;?": "color: var(--text-main);",
    r"color:\s*#94a3b8;?": "color: var(--text-muted);",
    r"border-color:\s*#cbd5e1;?": "border-color: var(--border-color);",
    r"border-color:\s*#0f172a;?": "border-color: var(--text-main);",
    r"background:\s*#0f172a;?": "background: var(--brand-primary);",
    r"background:\s*#1e293b;?": "background: var(--bg-card);", # Make it blend like a card
    r"background:#0f172a;?": "background: var(--brand-primary);",
    r"background:\s*linear-gradient\(135deg,\s*#0f172a\s*0%,\s*#1e293b\s*100%\);?": "background: var(--hero-bg);",
    r"background:\s*linear-gradient\(90deg,\s*#f1f5f9\s*25%,\s*#e2e8f0\s*50%,\s*#f1f5f9\s*75%\);?": "background: linear-gradient(90deg, var(--bg-card-hover) 25%, var(--border-color) 50%, var(--bg-card-hover) 75%);",
    r"color:\s*white;?": "color: var(--bg-body);", # When brand-primary is background, text is bg-body (white in light, dark in dark)
}

# The only issue is that "color: white" is used in many places. Let's be very careful.
# If a button has ackground: var(--brand-primary), its text should be ar(--bg-body) to flip properly.
# But color: white is tricky. Let's do a targeted replace for it.
content = content.replace('color: white;', 'color: var(--bg-body);')

for pattern, replacement in replacements.items():
    content = re.sub(pattern, replacement, content)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Applied classes/index.html specific mappings")
