import re

path = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\tools\ai-excuse-generator.html"
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add dark mode classes for labels
content = re.sub(r'text-slate-700(?! dark:text-slate-300)', r'text-slate-700 dark:text-slate-300', content)

# Add dark mode classes for inputs and selects
content = re.sub(r'border-slate-300(?! dark:border-slate-600)', r'border-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100', content)

# Bump cache
content = re.sub(r'sol-cache\.js\?v=[0-9.]+', r'sol-cache.js?v=110.0', content)
content = re.sub(r'config\.js\?v=[0-9.]+', r'config.js?v=140.0', content)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated ai-excuse-generator.html with Tailwind dark mode classes")
