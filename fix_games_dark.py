import os

games_dir = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\games"

dark_vars = '''
        @media (prefers-color-scheme: dark) {
            :root {
                --primary: #0f172a;
                --accent: #38bdf8;
                --card-bg: rgba(30, 41, 59, 0.8);
                --glass-border: rgba(255, 255, 255, 0.05);
                --text-main: #f8fafc;
                --text-muted: #94a3b8;
            }
            .header-bar {
                background: rgba(15, 23, 42, 0.8) !important;
            }
        }
'''

for root, dirs, files in os.walk(games_dir):
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            if '--text-muted: #64748b;' in content and '@media (prefers-color-scheme: dark)' not in content:
                content = content.replace('        }', '        }\n' + dark_vars, 1)
                
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)

print("Applied native dark mode variables to Games")
