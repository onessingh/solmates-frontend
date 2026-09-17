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

target_files = [
    'feedback.html',
    'platform-guide.html',
    'notification.html',
    'database/elearning-subjects.html',
    'database/folder-content.html',
    'database/healthcare.html',
    'database/index.html',
    'database/view.html',
    'database/youtube-browse.html',
    'database/youtube-content.html',
    'database/classes/index.html',
    'exam-prep/index.html',
    'exam-prep/overview.html',
    'exam-prep/study-kit.html',
    'exam-prep/subjects.html',
    'journey/index.html',
    'skills/index.html',
    'tools/index.html'
]

updated_count = 0
for rel_path in target_files:
    file_path = os.path.join(base_dir, rel_path.replace('/', os.sep))
    if not os.path.exists(file_path):
        continue
        
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    original_content = content
    
    # Replace nav-center
    content = re.sub(r'<div class="nav-center">.*?</div>', nav_center_html, content, flags=re.DOTALL)
    
    # Replace mobile-nav-overlay
    content = re.sub(r'<div class="mobile-nav-overlay"[^>]*>.*?</div>', mobile_nav_html, content, flags=re.DOTALL)
    
    if content != original_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        updated_count += 1
        print(f"Updated: {rel_path}")

print(f"Total files updated: {updated_count}")
