import os
import re

db_dir = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database"

replacements = {
    # Backgrounds
    r"background:\s*#f8fafc;?": "background: var(--bg-body);",
    r"background:\s*#f1f5f9;?": "background: var(--bg-card-hover);",
    r"background:\s*#f8f9fa;?": "background: var(--bg-card);",
    r"background:\s*#f1f1f1;?": "background: var(--bg-card-hover);",
    r"background:\s*#fafafa;?": "background: var(--bg-body);",
    r"background:\s*#e2e8f0;?": "background: var(--border-color);",
    r"background-color:\s*#f8fafc;?": "background-color: var(--bg-body);",
    r"background-color:\s*#f1f5f9;?": "background-color: var(--bg-card-hover);",
    
    # Texts
    r"color:\s*#1e293b;?": "color: var(--text-main);",
    r"color:\s*#334155;?": "color: var(--text-main);",
    r"color:\s*#475569;?": "color: var(--text-muted);",
    r"color:\s*#64748b;?": "color: var(--text-lighter);",
    r"color:\s*#333333;?": "color: var(--text-main);",
    r"color:\s*#888888;?": "color: var(--text-muted);",
    r"color:\s*#888;?": "color: var(--text-muted);",
    r"color:\s*#aaa;?": "color: var(--text-lighter);",
    r"color:\s*#666;?": "color: var(--text-lighter);",

    # Borders
    r"border:\s*1px\s+solid\s+#e2e8f0;?": "border: 1px solid var(--border-color);",
    r"border-bottom:\s*1px\s+solid\s+#e2e8f0;?": "border-bottom: 1px solid var(--border-color);",
    r"border-top:\s*1px\s+solid\s+#e2e8f0;?": "border-top: 1px solid var(--border-color);",
    r"border:\s*1px\s+solid\s+#cbd5e1;?": "border: 1px solid var(--border-color);",
}

for root, dirs, files in os.walk(db_dir):
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            for pattern, replacement in replacements.items():
                content = re.sub(pattern, replacement, content)

            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)

print("Applied comprehensive color variable mapping to database pages")
