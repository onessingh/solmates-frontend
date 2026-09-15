import os
import glob
import re

frontend_dir = r"c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend"
html_files = glob.glob(os.path.join(frontend_dir, "**", "*.html"), recursive=True)

def replacer(match):
    full_url = match.group(1)
    
    # Ignore absolute URLs or empty ones
    if not full_url or full_url.startswith('http://') or full_url.startswith('https://'):
        return match.group(0)
        
    # Handle index.html
    if full_url.endswith('/index.html'):
        return f'href="{full_url[:-11]}"'
    if full_url == 'index.html':
        return 'href="/"'
        
    # Handle other .html files
    if full_url.endswith('.html'):
        return f'href="{full_url[:-5]}"'
        
    return match.group(0)

count = 0
for file_path in html_files:
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
            
        new_content = re.sub(r'href="([^"]+)"', replacer, content)
        
        if new_content != content:
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(new_content)
            count += 1
    except Exception as e:
        print(f"Error processing {file_path}: {e}")

print(f"Updated links in {count} files.")
