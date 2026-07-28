import re

file = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database\elearning-subjects.html"
with open(file, 'r', encoding='utf-8') as f:
    content = f.read()

# Make folders black (var(--primary))
content = re.sub(r'\.subject-card\.centered-folder \.subject-name i\s*\{[^}]*color:\s*#[0-9a-fA-F]+;', 
                 '.subject-card.centered-folder .subject-name i {\n            font-size: 40px;\n            color: var(--primary);', 
                 content)

# Make subject books blue (#0ea5e9)
content = re.sub(r'\.subject-name i\s*\{[^}]*color:\s*var\(--primary\);', 
                 '.subject-name i {\n            font-size: 32px;\n            color: #0ea5e9;', 
                 content)

with open(file, 'w', encoding='utf-8') as f:
    f.write(content)
print("Done elearning-subjects")
