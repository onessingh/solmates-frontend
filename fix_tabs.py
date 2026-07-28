import re

def fix_file(file):
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Add variables to :root (Light Mode)
    if '--tab-active-bg' not in content:
        content = content.replace('--brand-primary: #0f2b46;', 
                                  '--brand-primary: #0f2b46;\n        --tab-active-bg: #0f2b46;\n        --tab-active-shadow: rgba(15, 43, 70, 0.25);')
        
    # Add variables to Dark Mode :root
    if '--tab-active-bg: #3b82f6' not in content:
        content = content.replace('--brand-primary: #f8fafc;', 
                                  '--brand-primary: #f8fafc;\n          --tab-active-bg: #3b82f6;\n          --tab-active-shadow: rgba(59, 130, 246, 0.3);')

    # Update .tab-btn.active
    content = re.sub(r'\.tab-btn\.active\s*\{[^}]*\}', 
                     '.tab-btn.active {\n        background: var(--tab-active-bg, #0f2b46);\n        color: white;\n        box-shadow: 0 4px 15px var(--tab-active-shadow, rgba(15,43,70,0.25));\n      }', 
                     content)

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

fix_file(r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database\elearning-subjects.html")
fix_file(r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database\folder-content.html")
print("Done")
