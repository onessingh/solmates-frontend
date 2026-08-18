import os

count = 0
for root, _, files in os.walk(r'C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend'):
    for f in files:
        if f.endswith('.html'):
            path = os.path.join(root, f)
            with open(path, 'r', encoding='utf-8') as file:
                content = file.read()
            
            target_str = """            } else if (theme === 'light') {
                meta.setAttribute('content', 'light only');
                if (themeMeta) themeMeta.setAttribute('content', '#ffffff');
                document.documentElement.style.colorScheme = 'light';
                document.documentElement.classList.remove('dark');
            }"""
            
            replacement_str = """            } else if (theme === 'light') {
                meta.setAttribute('content', 'light only');
                if (themeMeta) themeMeta.setAttribute('content', '#ffffff');
                document.documentElement.style.colorScheme = 'light';
                document.documentElement.classList.remove('dark');
            } else {
                meta.setAttribute('content', 'light only');
                if (themeMeta) themeMeta.setAttribute('content', '#ffffff');
                document.documentElement.style.colorScheme = 'light';
                document.documentElement.classList.remove('dark');
            }"""
            
            if target_str in content and 'else {' not in content.split(target_str)[1][:20]:
                new_content = content.replace(target_str, replacement_str)
                if new_content != content:
                    with open(path, 'w', encoding='utf-8') as file:
                        file.write(new_content)
                    count += 1

print(f'Updated {count} HTML files.')
