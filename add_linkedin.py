import os
import re

base_dir = r'c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend'
journey_path = os.path.join(base_dir, 'journey', 'index.html')

with open(journey_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add LinkedIn to rel="me"
if 'https://www.linkedin.com/in/onessingh' not in content:
    content = content.replace('<link rel="me" href="https://www.instagram.com/__s.singh._">', '<link rel="me" href="https://www.linkedin.com/in/onessingh">\n  <link rel="me" href="https://www.instagram.com/__s.singh._">')

# Add LinkedIn to JSON-LD sameAs array
json_ld_replacement = r'''"sameAs": [
          "https://www.linkedin.com/in/onessingh",
          "https://www.instagram.com/__s.singh._",'''

content = re.sub(r'"sameAs": \[\s*"https://www\.instagram\.com/__s\.singh\._",', json_ld_replacement, content)

with open(journey_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Added LinkedIn to Journey page SEO.")
