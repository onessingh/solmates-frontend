import re
with open(r'C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\exam-prep\index.html', 'r', encoding='utf-8') as f:
    content = f.read()
match = re.search(r'<script id="color-scheme-sync">.*?</script>', content, re.DOTALL)
if match: print(match.group(0))
