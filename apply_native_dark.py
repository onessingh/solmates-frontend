import os

frontend_dir = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend"

variables_block = '''
    /* Dark Mode Native OS Integration */
    :root {
      --bg-body: #ffffff;
      --text-main: #111111;
      --text-muted: #555555;
      --text-lighter: #666666;
      --bg-nav: rgba(255, 255, 255, 0.98);
      --bg-card: #ffffff;
      --bg-card-hover: #f9f9fb;
      --border-color: #eeeeee;
      --hero-bg: linear-gradient(to bottom, #ffffff, #f5f5f7);
      --brand-primary: #0f2b46;
      --brand-accent: #c0962d;
    }

    @media (prefers-color-scheme: dark) {
      :root {
        --bg-body: #0f172a;
        --text-main: #f8fafc;
        --text-muted: #94a3b8;
        --text-lighter: #cbd5e1;
        --bg-nav: rgba(15, 23, 42, 0.98);
        --bg-card: #1e293b;
        --bg-card-hover: #334155;
        --border-color: #334155;
        --hero-bg: linear-gradient(to bottom, #0f172a, #1e293b);
        --brand-primary: #f8fafc;
        --brand-accent: #c0962d;
      }
    }
'''

for root, dirs, files in os.walk(frontend_dir):
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            # Fix meta tags everywhere
            content = content.replace('<meta name="color-scheme" content="light only">', '<meta name="color-scheme" content="light dark">')
            content = content.replace('<meta name="supported-color-schemes" content="light">', '<meta name="supported-color-schemes" content="light dark">')

            # Skip tailwind files
            if 'tailwindcss.com' in content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                continue

            # Inject CSS variables if not present
            if '--bg-body:' not in content and '/* ========== Base Reset ========== */' in content:
                content = content.replace('/* ========== Base Reset ========== */', '/* ========== Base Reset ========== */\n' + variables_block)
            elif '--bg-body:' not in content and '<style>' in content:
                content = content.replace('<style>', '<style>\n' + variables_block, 1)

            # Apply variable replacements to ALL files (non tailwind)
            content = content.replace('background: #ffffff;', 'background: var(--bg-body);')
            content = content.replace('background: #fff;', 'background: var(--bg-card);')
            content = content.replace('background: white;', 'background: var(--bg-card);')
            content = content.replace('background: #f9f9fb;', 'background: var(--bg-card-hover);')
            content = content.replace('background: rgba(255, 255, 255, 0.98);', 'background: var(--bg-nav);')
            content = content.replace('background: linear-gradient(to bottom, #ffffff, #f5f5f7);', 'background: var(--hero-bg);')
            
            content = content.replace('color: #111;', 'color: var(--text-main);')
            content = content.replace('color: #333;', 'color: var(--text-main);')
            content = content.replace('color: #0f2b46;', 'color: var(--brand-primary);')
            content = content.replace('stroke: #0f2b46;', 'stroke: var(--brand-primary);')
            content = content.replace('fill: #0f2b46;', 'fill: var(--brand-primary);')
            content = content.replace('color: #555;', 'color: var(--text-muted);')
            content = content.replace('color: #666;', 'color: var(--text-lighter);')
            
            content = content.replace('border: 1px solid #eee;', 'border: 1px solid var(--border-color);')
            content = content.replace('border-bottom: 1px solid #eee;', 'border-bottom: 1px solid var(--border-color);')
            content = content.replace('border-top: 1px solid #eee;', 'border-top: 1px solid var(--border-color);')

            # Special fixes for Footer in index.html (in case it wasn't caught by exact match)
            if 'index.html' in file:
                content = content.replace('.footer {\n      text-align: center;\n      padding: 30px 20px 20px;\n      background: #fff;', '.footer {\n      text-align: center;\n      padding: 30px 20px 20px;\n      background: var(--bg-card);')

            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)

print("Applied native dark mode variables to all non-tailwind HTML files")
