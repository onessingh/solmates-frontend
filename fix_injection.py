import os
import re

db_dir = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database"

for root, dirs, files in os.walk(db_dir):
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            # 1. Remove the accidental injection from light mode :root
            accidental_injection = '''
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
          }'''
            # A bit of fuzzy matching because indentation might vary
            pattern_accidental = re.compile(r'--brand-accent: #c0962d;\s*--primary: #f8fafc;.*?--white: #1e293b;\s*}', re.DOTALL)
            content = pattern_accidental.sub('--brand-accent: #c0962d;\n      }', content)

            # 2. Inject correctly into @media block
            # The @media block ends with:
            #           --brand-accent: #c0962d;
            #         }
            #       }
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
            
            pattern_dark = re.compile(r'(--brand-accent:\s*#c0962d;\s*\}\s*\})')
            def replacer(match):
                if '--primary: #f8fafc;' not in match.group(0):
                    return '--brand-accent: #c0962d;\n' + overrides + '        }\n      }'
                return match.group(0)

            content = pattern_dark.sub(replacer, content)

            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)

print("Fixed injection and re-injected correctly into @media")
