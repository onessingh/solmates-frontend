import os
import re

base_dir = r'c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend'
journey_path = os.path.join(base_dir, 'journey', 'index.html')

with open(journey_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace <a href="URL" target="_blank" style="display:block;"><div class="member-image">...</div></a>
# with <div class="member-image" onclick="window.open('URL', '_blank')" style="cursor: pointer;">...</div>

pattern = re.compile(r'<a href="([^"]+)" target="_blank" style="display:block;">\s*(<div class="member-image">)(.*?)</div>\s*</a>', re.DOTALL)
new_content = pattern.sub(r'<div class="member-image" onclick="window.open(\'\1\', \'_blank\')" style="cursor: pointer;">\3</div>', content)

if new_content != content:
    with open(journey_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Replaced anchor wrappers with onclick handlers on member-image.")
else:
    print("No anchor wrappers found.")
