import os
import re

db_dir = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database"

for root, dirs, files in os.walk(db_dir):
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            overrides = '''
          --primary: #f8fafc;
          --accent: #38bdf8;
          --bg: #0f172a;
          --bg2: #1e293b;
          --card: #1e293b;
          --card-hover: #334155;
          --border: #334155;
          --border-hover: #f8fafc;
          --text: #f8fafc;
          --sub: #94a3b8;
          --card-bg: #1e293b;
          --gray: #94a3b8;
          --white: #1e293b;
'''
            
            # Find the position of --brand-accent: #c0962d; inside @media
            # and insert overrides right after it.
            pattern = re.compile(r'(--brand-accent:\s*#c0962d;[ \t\r\n]*)}')
            
            def replacer(match):
                if '--primary: #f8fafc;' not in content:
                    return '--brand-accent: #c0962d;\n' + overrides + '        }'
                return match.group(0)

            content = pattern.sub(replacer, content, count=1)

            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)

print("Injected custom overrides with robust regex")
