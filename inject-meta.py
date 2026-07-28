import os
import glob
import re

html_files = glob.glob('c:/Users/Toshiba/OneDrive/Desktop/solmates/frontend/**/*.html', recursive=True)
meta_tags = '\n  <meta name="color-scheme" content="light only">\n  <meta name="supported-color-schemes" content="light">'

for file in html_files:
    try:
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if 'name="color-scheme"' not in content:
            # Insert meta tags right after <head> or <head ...>
            content = re.sub(r'(<head.*?>)', r'\1' + meta_tags, content, count=1, flags=re.IGNORECASE)
            
            with open(file, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f'Updated {file}')
    except Exception as e:
        print(f'Error processing {file}: {e}')

print('Done!')
