import os
import re

base_dir = r'c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend'
index_path = os.path.join(base_dir, 'index.html')

with open(index_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove the <link rel="me"...> block containing personal socials
content = re.sub(r'<!-- Identity Verification: rel=me -->.*?<!-- Unified Entity Graph: Solmates \+ Shivarn Singh -->', '<!-- Solmates Entity Graph -->', content, flags=re.DOTALL)

# 2. Modify the JSON-LD Script
import json

# Extract the JSON block
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
                
                # Remove founder reference from Organization
                if item.get('@type') == 'Organization':
                    if 'founder' in item:
                        del item['founder']
                
                # Remove author reference from WebSite
                if item.get('@type') == 'WebSite':
                    if 'author' in item:
                        del item['author']
                
                new_graph.append(item)
            
            data['@graph'] = new_graph
            
            # Convert back to JSON and replace
            new_json_str = json.dumps(data, indent=2)
            content = content[:json_match.start(1)] + new_json_str + content[json_match.end(1):]
    except Exception as e:
        print("JSON parse error:", e)

# 3. Remove <meta name="author" content="Shivarn Singh">
content = re.sub(r'<meta name="author" content="Shivarn Singh">\s*', '', content)

with open(index_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated index.html")
