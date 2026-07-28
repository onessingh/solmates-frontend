import os

elearning_path = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database\elearning-subjects.html"
with open(elearning_path, 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace('<i class="fas "></i>', '<i class="fas "></i>')
with open(elearning_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Fixed elearning-subjects.html")

folder_content_path = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database\folder-content.html"
with open(folder_content_path, 'r', encoding='utf-8') as f:
    content2 = f.read()
content2 = content2.replace('<i class="fas "></i>', '<i class="fas "></i>')
with open(folder_content_path, 'w', encoding='utf-8') as f:
    f.write(content2)
print("Fixed folder-content.html")
