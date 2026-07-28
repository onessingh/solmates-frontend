import os
import re

directories = [
    r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\skills",
    r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\games",
    r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend" # For index.html itself
]

for directory in directories:
    # We only want to process index.html in the frontend root, but all html in subdirs
    if directory.endswith('frontend'):
        files_to_process = [os.path.join(directory, 'index.html')]
    else:
        files_to_process = []
        for root, _, files in os.walk(directory):
            for file in files:
                if file.endswith('.html'):
                    files_to_process.append(os.path.join(root, file))
                    
    for filepath in files_to_process:
        if not os.path.exists(filepath):
            continue
            
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Fix hardcoded backgrounds
        content = content.replace('background: #0f172a;', 'background: var(--bg-body);')
        content = content.replace('background-color: #0f172a;', 'background-color: var(--bg-body);')
        content = content.replace('background: #1e293b;', 'background: var(--bg-card);')
        content = content.replace('background-color: #1e293b;', 'background-color: var(--bg-card);')
        
        # We don't indiscriminately replace #ffffff to var(--bg-card) everywhere because some might be white text.
        # But we do background: #ffffff;
        content = content.replace('background: #ffffff;', 'background: var(--bg-card);')
        content = content.replace('background-color: #ffffff;', 'background-color: var(--bg-card);')
        content = content.replace('background: #f8fafc;', 'background: var(--bg-body);')
        content = content.replace('background-color: #f8fafc;', 'background-color: var(--bg-body);')
        content = content.replace('background: #f9f9fb;', 'background: var(--bg-card-hover);')

        # Fix text colors
        # #f8fafc is often white text in dark mode
        content = content.replace('color: #f8fafc;', 'color: var(--text-main);')
        content = content.replace('color: #cbd5e1;', 'color: var(--text-lighter);')
        content = content.replace('color: #94a3b8;', 'color: var(--text-muted);')
        content = content.replace('color: #111111;', 'color: var(--text-main);')
        content = content.replace('color: #555555;', 'color: var(--text-muted);')
        content = content.replace('color: #666666;', 'color: var(--text-lighter);')

        # Fix borders
        content = content.replace('border: 1px solid #334155;', 'border: 1px solid var(--border-color);')
        content = content.replace('border: 1px solid #eeeeee;', 'border: 1px solid var(--border-color);')
        content = content.replace('border-bottom: 1px solid #334155;', 'border-bottom: 1px solid var(--border-color);')
        content = content.replace('border-bottom: 1px solid #eeeeee;', 'border-bottom: 1px solid var(--border-color);')
        content = content.replace('border-top: 1px solid #334155;', 'border-top: 1px solid var(--border-color);')
        content = content.replace('border-top: 1px solid #eeeeee;', 'border-top: 1px solid var(--border-color);')

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

print("Replaced hardcoded colors with CSS variables in skills, games, and index.html")
