import os
import re

base_dir = r'c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend'
index_path = os.path.join(base_dir, 'index.html')

with open(index_path, 'r', encoding='utf-8') as f:
    index_html = f.read()

# Extract the <div class="nav-center"> block
nav_center_match = re.search(r'<div class="nav-center">.*?</div>', index_html, re.DOTALL)
nav_center_html = nav_center_match.group(0) if nav_center_match else None

# Extract the <div class="mobile-nav-overlay" id="mobileNav"> block
mobile_nav_match = re.search(r'<div class="mobile-nav-overlay" id="mobileNav">.*?</div>', index_html, re.DOTALL)
mobile_nav_html = mobile_nav_match.group(0) if mobile_nav_match else None

if not nav_center_html or not mobile_nav_html:
    print("Failed to extract nav blocks from index.html")
    exit(1)

updated_count = 0

for root, dirs, files in os.walk(base_dir):
    for file in files:
        if file.endswith('.html') and file != 'index.html':
            file_path = os.path.join(root, file)
            
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    
                original_content = content
                
                # Replace nav-center if it exists
                if '<div class="nav-center">' in content:
                    content = re.sub(r'<div class="nav-center">.*?</div>', nav_center_html, content, flags=re.DOTALL)
                
                # Replace mobile-nav-overlay if it exists
                if '<div class="mobile-nav-overlay"' in content:
                    content = re.sub(r'<div class="mobile-nav-overlay"[^>]*>.*?</div>', mobile_nav_html, content, flags=re.DOTALL)
                
                if content != original_content:
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(content)
                    updated_count += 1
                    print(f"Updated: {file_path}")
            except Exception as e:
                print(f"Error processing {file_path}: {e}")

print(f"Total files updated: {updated_count}")
