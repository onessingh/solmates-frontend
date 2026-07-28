import os
import re

filepath = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database\classes\index.html"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

replacements = {
    # Fix dark texts to use variables so they become white in dark mode
    r"color:\s*#0f172a;?": "color: var(--text-main);",
    r"color:\s*#1e293b;?": "color: var(--text-main);",
    r"color:\s*#94a3b8;?": "color: var(--text-muted);",
    
    # Fix hardcoded borders
    r"border-color:\s*#cbd5e1;?": "border-color: var(--border-color);",
    
    # The active tab has background #0f172a, let's use var(--text-main) so it flips to white in dark mode, and text becomes dark
    r"background:\s*#0f172a;?": "background: var(--text-main);",
    r"border-color:\s*#0f172a;?": "border-color: var(--text-main);",
    
    # Platform join cards have background #1e293b
    r"background:\s*#1e293b;?": "background: var(--bg-card);",
}

for pattern, replacement in replacements.items():
    content = re.sub(pattern, replacement, content)

# But wait, if active tab background is var(--text-main) (white in dark mode), the text inside the active tab is "color: white;".
# That will be white text on white background!
# Let's fix the active tab specifically:
content = content.replace('.tab-btn.active {\n              background: var(--text-main);\n              color: white;\n              border-color: var(--text-main);', 
                          '.tab-btn.active {\n              background: var(--text-main);\n              color: var(--bg-body);\n              border-color: var(--text-main);')

# Also fix the join buttons (Zoom, Meet) which had background: #1e293b
# We replaced it with var(--bg-card), but we also need the text color to not be white if --bg-card is white in light mode!
# Actually, if we use var(--text-main) for button background, we must use var(--bg-body) for button text.
content = content.replace('.join-btn {\n              background: var(--text-main);\n              color: white;',
                          '.join-btn {\n              background: var(--text-main);\n              color: var(--bg-body);')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Applied precise classes/index.html mappings")
