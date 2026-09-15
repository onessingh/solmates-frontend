import os
import glob

frontend_dir = r"c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend"
html_files = glob.glob(os.path.join(frontend_dir, "**", "*.html"), recursive=True)

for file_path in html_files:
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
        
        new_content = content.replace("?v=705", "?v=706")
        
        if new_content != content:
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(new_content)
    except Exception as e:
        pass
