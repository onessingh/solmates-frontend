import os

tools_dir = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\tools"

for root, dirs, files in os.walk(tools_dir):
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            # Skip tailwind files
            if 'tailwindcss.com' in content:
                continue

            # Check if it has a custom :root that needs fixing
            if '--surface: #ffffff;' in content or '--surface: #fff;' in content:
                dark_overrides = '''
    @media (prefers-color-scheme: dark) {
      :root {
        --primary: #f8fafc;
        --accent: #38bdf8;
        --background: #0f172a;
        --surface: #1e293b;
        --text-color: #f8fafc;
        --text-secondary: #94a3b8;
        --border-color: #334155;
        --glass-bg: rgba(30, 41, 59, 0.7);
        --glass-border: rgba(255, 255, 255, 0.1);
        --shadow: 0 10px 30px rgba(0,0,0,0.5);
      }
    }
'''
                if '--surface: #1e293b;' not in content:
                    content = content.replace('</style>', dark_overrides + '\n</style>')
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(content)

print("Applied native dark mode variables to Tools custom CSS")
