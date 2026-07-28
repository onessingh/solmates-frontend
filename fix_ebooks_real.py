import os

file = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database\elearning-subjects.html"
with open(file, 'r', encoding='utf-8') as f:
    content = f.read()

# The broken string from my regex mistake:
target = '<i class="fas " style=""></i>'
# The correct original string
replacement = '<i class="fas " style=""></i>'

content = content.replace(target, replacement)

with open(file, 'w', encoding='utf-8') as f:
    f.write(content)
