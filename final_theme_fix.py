import os

count = 0
for root, _, files in os.walk(r'C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend'):
    for f in files:
        if f.endswith('.html'):
            path = os.path.join(root, f)
            with open(path, 'r', encoding='utf-8') as file:
                content = file.read()
            
            # The search target
            target = "var theme = localStorage.getItem('solmates_theme');"
            
            # The replacement string
            replacement = """var theme = localStorage.getItem('solmates_theme');
        if (!theme) {
            theme = 'light';
            localStorage.setItem('solmates_theme', 'light');
        }"""
            
            if target in content and "theme = 'light';" not in content:
                new_content = content.replace(target, replacement)
                with open(path, 'w', encoding='utf-8') as file:
                    file.write(new_content)
                count += 1

print(f'Updated {count} HTML files.')
