import re
cs_path = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\tools\custom-services.html"
with open(cs_path, 'r', encoding='utf-8') as f:
    cs_content = f.read()

cs_content = re.sub(
    r'\.footer\s*\{\s*text-align:\s*center;\s*padding:\s*40px\s*0;\s*color:\s*#888;\s*font-size:\s*12px;\s*\}',
    r'.footer {\n      text-align: center;\n      padding: 20px 0;\n      color: var(--text-lighter);\n      font-size: 12px;\n      background: var(--bg-card);\n      border-top: 1px solid var(--border-color);\n    }',
    cs_content
)

with open(cs_path, 'w', encoding='utf-8') as f:
    f.write(cs_content)
print("Updated footer")
