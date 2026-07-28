import os

file = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database\elearning-subjects.html"
with open(file, 'r', encoding='utf-8') as f:
    content = f.read()

target = 'class="fas " style=""'
replacement = 'class="fas " style=""'

content = content.replace(target, replacement)

with open(file, 'w', encoding='utf-8') as f:
    f.write(content)
