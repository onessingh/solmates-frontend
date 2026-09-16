import os
import glob
import re

frontend_dir = r"c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend"

# 1. Update theme-color in all HTML files
html_files = glob.glob(os.path.join(frontend_dir, "**", "*.html"), recursive=True)
count = 0

for file_path in html_files:
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
        
        # Change static meta tag
        new_content = re.sub(r'<meta id="theme-color-meta" name="theme-color" content="#0f172a">', '<meta id="theme-color-meta" name="theme-color" content="#ffffff">', content)
        
        # Also bump cache to 708
        new_content = re.sub(r'\?v=707', '?v=708', new_content)
        
        if new_content != content:
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(new_content)
            count += 1
    except Exception as e:
        pass

print(f"Fixed theme-color and bumped ?v= to 708 in {count} HTML files.")

# 2. Update sw.js cache name
sw_path = os.path.join(frontend_dir, "sw.js")
if os.path.exists(sw_path):
    with open(sw_path, "r", encoding="utf-8") as f:
        sw_content = f.read()
    sw_content = re.sub(r'solmates-cache-v707', 'solmates-cache-v708', sw_content)
    with open(sw_path, "w", encoding="utf-8") as f:
        f.write(sw_content)
    print("Updated sw.js cache name to solmates-cache-v708.")
