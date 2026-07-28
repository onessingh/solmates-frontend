import os
import re

directories = [
    r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database",
    r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\games",
    r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\skills",
    r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend"
]

def fix_buttons():
    for directory in directories:
        if directory.endswith('frontend'):
            files_to_process = [os.path.join(directory, 'index.html')]
        else:
            files_to_process = []
            for root, _, files in os.walk(directory):
                for file in files:
                    if file.endswith('.html'):
                        files_to_process.append(os.path.join(root, file))
        
        for filepath in files_to_process:
            if not os.path.exists(filepath): continue
            
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
                
            # Fix back-btn and database-btn colors that were messed up
            content = content.replace('color: var(--bg-body);', 'color: var(--bg-body);') # just checking
            
            # Specifically for database/index.html
            content = re.sub(r'(\.back-btn\s*\{[^}]*?)color:\s*var\(--bg-body\);', r'\1color: white;', content)
            content = re.sub(r'(\.database-btn\s*\{[^}]*?)color:\s*var\(--bg-body\);', r'\1color: white;', content)
            
            # Fix any other obvious "color: var(--bg-body)" that should be white on dark buttons
            content = re.sub(r'(background:\s*#0f2b46;[^}]*?)color:\s*var\(--bg-body\);', r'\1color: white;', content)
            content = re.sub(r'(background:\s*var\(--primary\);[^}]*?)color:\s*var\(--bg-body\);', r'\1color: white;', content)
            content = re.sub(r'(background:\s*#0071e3;[^}]*?)color:\s*var\(--bg-body\);', r'\1color: white;', content)
            
            # Let's also check if .page-header h1 got messed up.
            # In database/view.html, it's color: var(--primary); and --primary is #0f2b46 in dark mode (now fixed because we moved the media query).
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)

fix_buttons()
print("Fixed button text colors")
