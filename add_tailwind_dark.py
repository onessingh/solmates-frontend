import os

frontend_dir = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend"

for root, dirs, files in os.walk(frontend_dir):
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            if 'tailwindcss.com' in content:
                # Add dark variants for backgrounds
                content = content.replace('bg-white', 'bg-white dark:bg-slate-800')
                content = content.replace('bg-slate-50', 'bg-slate-50 dark:bg-slate-900')
                content = content.replace('bg-slate-100', 'bg-slate-100 dark:bg-slate-800')
                content = content.replace('bg-gray-50', 'bg-gray-50 dark:bg-slate-900')
                content = content.replace('bg-gray-100', 'bg-gray-100 dark:bg-slate-800')
                
                # Add dark variants for text
                content = content.replace('text-slate-800', 'text-slate-800 dark:text-slate-100')
                content = content.replace('text-slate-900', 'text-slate-900 dark:text-slate-50')
                content = content.replace('text-gray-800', 'text-gray-800 dark:text-slate-100')
                content = content.replace('text-gray-900', 'text-gray-900 dark:text-slate-50')
                content = content.replace('text-slate-600', 'text-slate-600 dark:text-slate-300')
                content = content.replace('text-slate-500', 'text-slate-500 dark:text-slate-400')
                content = content.replace('text-gray-600', 'text-gray-600 dark:text-slate-300')
                content = content.replace('text-gray-500', 'text-gray-500 dark:text-slate-400')
                
                # Borders
                content = content.replace('border-slate-200', 'border-slate-200 dark:border-slate-700')
                content = content.replace('border-gray-200', 'border-gray-200 dark:border-slate-700')
                
                # Fix meta tags for native support
                content = content.replace('<meta name="color-scheme" content="light only">', '<meta name="color-scheme" content="light dark">')
                content = content.replace('<meta name="supported-color-schemes" content="light">', '<meta name="supported-color-schemes" content="light dark">')

                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)

print("Applied native dark mode classes to Tailwind HTML files")
