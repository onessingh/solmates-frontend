import os
import re

db_dir = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database"

for root, dirs, files in os.walk(db_dir):
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            # Fix the category-icon background in index.html
            content = content.replace('background: #f0f4f8;', 'background: var(--border-color);')

            # Inject the custom overrides into the @media block
            if '@media (prefers-color-scheme: dark) {\n        :root {' in content or '@media (prefers-color-scheme: dark) {\n      :root {' in content:
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
                content = content.replace(
                    '--brand-accent: #c0962d;\n        }',
                    '--brand-accent: #c0962d;\n' + overrides + '        }'
                )

            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)

print("Injected custom overrides into media blocks")
