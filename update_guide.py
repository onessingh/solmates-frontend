import os
import re

base_dir = r'c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend'
guide_path = os.path.join(base_dir, 'platform-guide.html')

with open(guide_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove the <link rel="me"...> block containing personal socials
content = re.sub(r'<!-- Identity Verification: rel=me -->.*?<!-- Unified Entity Graph: Solmates \+ Shivarn Singh -->', '<!-- Solmates Entity Graph -->', content, flags=re.DOTALL)

# 2. Modify the JSON-LD Script
import json

json_match = re.search(r'<script type="application/ld\+json">\s*(\{.*?\})\s*</script>', content, flags=re.DOTALL)
if json_match:
    json_str = json_match.group(1)
    try:
        data = json.loads(json_str)
        if '@graph' in data:
            new_graph = []
            for item in data['@graph']:
                if item.get('@type') == 'Person' and item.get('name') == 'Shivarn Singh':
                    continue # Skip the Person schema
                
                if item.get('@type') == 'Organization':
                    if 'founder' in item:
                        del item['founder']
                
                if item.get('@type') == 'WebSite':
                    if 'author' in item:
                        del item['author']
                
                new_graph.append(item)
            
            data['@graph'] = new_graph
            new_json_str = json.dumps(data, indent=2)
            content = content[:json_match.start(1)] + new_json_str + content[json_match.end(1):]
    except Exception as e:
        print("JSON parse error:", e)

with open(guide_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated platform-guide.html")
