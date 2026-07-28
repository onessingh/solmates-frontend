import os
import re

directories = [
    r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database",
]

def fix_icons_and_breadcrumbs():
    for directory in directories:
        for root, _, files in os.walk(directory):
            for file in files:
                if not file.endswith('.html'): continue
                filepath = os.path.join(root, file)
                
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()

                # 1. view.html icons
                # .card.folder i.main-icon { color: var(--brand-accent); } -> leave as is (yellow)
                # .card.file i.main-icon { color: var(--brand-primary); } -> change to color: #0ea5e9;
                content = content.replace('color: var(--brand-primary);', 'color: #0ea5e9;')
                # Actually var(--brand-primary) might be used in other places like heading. 
                # Let's do regex for the specific CSS rules:
                content = re.sub(r'(\.card\.file\s+i\.main-icon\s*\{\s*color:\s*)var\(--brand-primary\);', r'\1#0ea5e9;', content)
                content = re.sub(r'(\.card\.folder\s+i\.main-icon\s*\{\s*color:\s*)var\(--brand-primary\);', r'\1#0ea5e9;', content)
                
                # 2. elearning-subjects.html icons
                # .subject-name i { color: var(--primary); }
                content = re.sub(r'(\.subject-name\s+i\s*\{\s*[^}]*?color:\s*)var\(--primary\);', r'\1#0ea5e9;', content)
                content = re.sub(r'(\.subject-name\s+i\s*\{\s*[^}]*?color:\s*)var\(--brand-primary\);', r'\1#0ea5e9;', content)
                # also folder icons
                content = re.sub(r'(\.subject-card\.centered-folder\s+\.subject-name\s+i\s*\{\s*[^}]*?color:\s*)#facc15;', r'\1#0ea5e9;', content)
                
                # 3. youtube-content.html breadcrumb and playlist black
                # .breadcrumb { background: rgba(255, 255, 255, 0.82); } -> background: var(--bg-nav);
                content = re.sub(r'(\.breadcrumb\s*\{[^}]*?background:\s*)rgba\(255,\s*255,\s*255,\s*0\.82\);', r'\1var(--bg-nav);', content)
                # border-bottom: 1px solid rgba(0, 0, 0, 0.05); -> border-bottom: 1px solid var(--border-color);
                content = re.sub(r'(\.breadcrumb\s*\{[^}]*?border-bottom:\s*1px\s+solid\s*)rgba\(0,\s*0,\s*0,\s*0\.05\);', r'\1var(--border-color);', content)
                
                # playlist black: .folder-card.centered-folder { background: var(--card); } -> background: #0f2b46;
                # Wait, if they want "playlist wala black me tha to playlist black me hi rhe"
                # The folder-card itself doesn't have background set in CSS, it falls back to what? 
                # Let's add a specific rule for .folder-card in youtube-content.html if needed.
                if 'youtube' in file:
                    # Let's make .folder-card background black/dark blue in dark mode, or always #0f2b46
                    content = re.sub(r'(\.folder-card\s*\{\s*[^}]*?background:\s*)var\(--card\);', r'\1#0f172a;', content)
                    content = re.sub(r'(\.folder-card\.centered-folder\s*\{\s*[^}]*?background:\s*)var\(--card\);', r'\1#0f172a;', content)
                
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)

fix_icons_and_breadcrumbs()
print("Fixed icons and breadcrumb white strip")
