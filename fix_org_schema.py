import json
import re

filepath = r'c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\index.html'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

pattern = re.compile(r'<script type="application/ld\+json">(.*?)</script>', re.DOTALL)
match = pattern.search(content)

if match:
    json_str = match.group(1)
    data = json.loads(json_str)
    
    for item in data.get("@graph", []):
        if item.get("@type") == "Organization":
            item["sameAs"] = [
                "https://instagram.com/teamsolmates",
                "https://facebook.com/teamsolmates",
                "https://twitter.com/teamsolmates",
                "https://youtube.com/@teamsolmates",
                "https://t.me/solmates_channelbot"
            ]
            break
            
    new_json_str = json.dumps(data, indent=2)
    new_script = f'<script type="application/ld+json">\n{new_json_str}\n</script>'
    new_content = content[:match.start()] + new_script + content[match.end():]
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Updated Organization Schema successfully.")
else:
    print("Could not find JSON-LD block.")
