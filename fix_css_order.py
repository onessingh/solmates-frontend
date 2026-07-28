import os
import re

frontend_dir = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend"

def fix_css_order(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.html'):
                filepath = os.path.join(root, file)
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()

                # Find the dark mode block (including the light mode injected root before it)
                match = re.search(r'(\s*/\* Dark Mode Native OS Integration \*/\s*:root\s*\{.*?\}\s*@media\s*\(prefers-color-scheme:\s*dark\)\s*\{\s*:root\s*\{.*?\}\s*\})', content, re.DOTALL)
                
                if match:
                    dark_mode_block = match.group(1)
                    # Remove it from the current position
                    content = content.replace(dark_mode_block, '')
                    
                    # Insert it right before </style>
                    content = content.replace('</style>', dark_mode_block + '\n    </style>')
                    
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(content)
                        
fix_css_order(frontend_dir)
print("Moved dark mode CSS block to the end of <style> to prevent overrides")
