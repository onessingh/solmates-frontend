import os
import glob
import re

frontend_dir = r"c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend"
html_files = glob.glob(os.path.join(frontend_dir, "**", "*.html"), recursive=True)

new_version = "704"
count = 0

for file_path in html_files:
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
        
        # Replace all instances of ?v=123 with ?v=704
        new_content = re.sub(r'\?v=\d+', f'?v={new_version}', content)
        
        if new_content != content:
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(new_content)
            count += 1
    except Exception as e:
        pass

print(f"Updated all ?v= parameters in {count} HTML files to v704.")
