import re

file = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database\elearning-subjects.html"
with open(file, 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(r'<i class="fas\s*"\s*style=""></i>', r'<i class="fas " style=""></i>', content)

with open(file, 'w', encoding='utf-8') as f:
    f.write(content)
