import re
import glob

files = glob.glob(r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\skills\*.html")

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace dark colors in inline styles
    content = re.sub(r'color:\s*#(?:334155|111|111111|1d1c1f|0f2b46|333|333333|222|222222|444|444444)\b', r'color: var(--text-main)', content)
    content = re.sub(r'color:\s*#(?:555|555555|666|666666|6e6e73|777|777777)\b', r'color: var(--text-muted)', content)

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Fixed inline dark colors")
