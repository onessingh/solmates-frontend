import os

file = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database\elearning-subjects.html"
with open(file, 'r', encoding='utf-8') as f:
    content = f.read()

target = 'style=""'
if target in content:
    content = content.replace(target, '')
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Fixed e-books folder icon color inline style")
else:
    print("Target not found. Doing regex replace")
    import re
    content = re.sub(r'style="\$\{isGeneric \? \'color: var\(--text-lighter\);\' : \'\'\}"', '', content)
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Regex fixed e-books")

