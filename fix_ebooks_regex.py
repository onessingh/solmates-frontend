import re

file = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database\elearning-subjects.html"
with open(file, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace <i class="fas " ></i> or similar
content = re.sub(
    r'<i class="fas \$\{isGeneric \? \'fa-folder\' : \'fa-book\'\}"\s*></i>',
    r'<i class="fas " style=""></i>',
    content
)

with open(file, 'w', encoding='utf-8') as f:
    f.write(content)
