import os

file = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database\elearning-subjects.html"
with open(file, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Restore the inline style for generic folders
target1 = '<i class="fas " ></i>'
replacement1 = '<i class="fas " style=""></i>'
content = content.replace(target1, replacement1)

# 2. Restore .subject-name i { color: var(--primary); }
target2 = """.subject-name i {
            font-size: 32px;
            color: #facc15;
            transition: 0.3s;
        }"""
replacement2 = """.subject-name i {
            font-size: 32px;
            color: var(--primary);
            transition: 0.3s;
        }"""
content = content.replace(target2, replacement2)

with open(file, 'w', encoding='utf-8') as f:
    f.write(content)
