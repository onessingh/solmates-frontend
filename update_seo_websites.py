import os
import re

base_dir = r'c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend'
journey_path = os.path.join(base_dir, 'journey', 'index.html')

with open(journey_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add to rel="me"
new_rel_me = '''<link href="https://shivarnsingh-portfolio.vercel.app/" rel="me"/>
<link href="https://hirevex.vercel.app/" rel="me"/>
<link href="https://wanderdesire-travel.netlify.app/" rel="me"/>
<link href="https://remedybloghub.netlify.app/" rel="me"/>'''

content = content.replace('<link href="https://shivarnsingh-portfolio.vercel.app/" rel="me"/>', new_rel_me)

# Add to JSON-LD sameAs
new_sameAs = '''"https://shivarnsingh-portfolio.vercel.app/",
            "https://hirevex.vercel.app/",
            "https://wanderdesire-travel.netlify.app/",
            "https://remedybloghub.netlify.app/"'''

content = content.replace('"https://shivarnsingh-portfolio.vercel.app/"', new_sameAs)

with open(journey_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Added new websites to SEO.")
