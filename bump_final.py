import os
import glob
import re
from datetime import datetime

frontend_dir = r"c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend"
today = datetime.now().strftime("%Y-%m-%d")
new_version = "707"

# 1. Update Sitemap lastmod
sitemap_path = os.path.join(frontend_dir, "sitemap.xml")
if os.path.exists(sitemap_path):
    with open(sitemap_path, "r", encoding="utf-8") as f:
        sitemap_content = f.read()
    sitemap_content = re.sub(r'<lastmod>.*?<\/lastmod>', f'<lastmod>{today}</lastmod>', sitemap_content)
    with open(sitemap_path, "w", encoding="utf-8") as f:
        f.write(sitemap_content)
    print("Sitemap lastmod dates verified/updated to", today)

# 2. Update all HTML files and their asset queries
html_files = glob.glob(os.path.join(frontend_dir, "**", "*.html"), recursive=True)
count = 0

for file_path in html_files:
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
        
        new_content = re.sub(r'\?v=\d+', f'?v={new_version}', content)
        
        if new_content != content:
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(new_content)
            count += 1
    except Exception as e:
        pass

print(f"Updated ?v= parameters in {count} HTML files to v{new_version}.")

# 3. Update the main sw.js file
sw_path = os.path.join(frontend_dir, "sw.js")
if os.path.exists(sw_path):
    with open(sw_path, "r", encoding="utf-8") as f:
        sw_content = f.read()
    sw_content = re.sub(r'solmates-cache-v\d+', f'solmates-cache-v{new_version}', sw_content)
    with open(sw_path, "w", encoding="utf-8") as f:
        f.write(sw_content)
    print(f"Updated sw.js cache name to solmates-cache-v{new_version}.")
