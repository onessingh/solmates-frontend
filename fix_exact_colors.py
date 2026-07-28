import re
import os

def fix_elearning():
    file = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database\elearning-subjects.html"
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Folders -> #64748b
    content = re.sub(r'\.subject-card\.centered-folder \.subject-name i\s*\{[^}]*color:\s*var\(--primary\);', 
                     '.subject-card.centered-folder .subject-name i {\n            font-size: 40px;\n            color: #64748b;', 
                     content)

    # Subjects -> #3b82f6
    content = re.sub(r'\.subject-name i\s*\{[^}]*color:\s*#0ea5e9;', 
                     '.subject-name i {\n            font-size: 32px;\n            color: #3b82f6;', 
                     content)

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

def fix_folder_content():
    file = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database\folder-content.html"
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Folders -> #64748b
    content = re.sub(r'\.subject-card\.centered-folder \.subject-name i\s*\{[^}]*color:\s*var\(--brand-primary\);', 
                     '.subject-card.centered-folder .subject-name i {\n      font-size: 40px;\n      color: #64748b;', 
                     content)

    # Subjects -> #3b82f6
    content = re.sub(r'\.subject-name i\s*\{[^}]*color:\s*#0ea5e9;', 
                     '.subject-name i {\n      font-size: 32px;\n      color: #3b82f6;', 
                     content)

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

fix_elearning()
fix_folder_content()
print("Fixed colors based on view.html")
