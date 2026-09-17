import json
import re

filepath = r'c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\index.html'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add Schema updates
schema_pattern = re.compile(r'<script type="application/ld\+json">(.*?)</script>', re.DOTALL)
schema_match = schema_pattern.search(content)

if schema_match:
    json_str = schema_match.group(1)
    data = json.loads(json_str)
    
    # Update Organization
    for item in data.get('@graph', []):
        if item.get('@type') == 'Organization':
            item['sameAs'] = [
                'https://instagram.com/teamsolmates',
                'https://facebook.com/teamsolmates',
                'https://twitter.com/teamsolmates',
                'https://youtube.com/@teamsolmates',
                'https://t.me/solmates_channelbot'
            ]
            break
            
    # Add SoftwareApplication
    app_schema = {
        '@type': 'SoftwareApplication',
        '@id': 'https://solmates.in/#software',
        'name': 'SOLMATES App',
        'operatingSystem': 'Android, Web',
        'applicationCategory': 'EducationalApplication',
        'url': 'https://solmates.in/',
        'offers': {
            '@type': 'Offer',
            'price': '0',
            'priceCurrency': 'INR'
        }
    }
    data.setdefault('@graph', []).append(app_schema)
    
    new_json_str = json.dumps(data, indent=2)
    new_script = f'<script type="application/ld+json">\n{new_json_str}\n</script>'
    content = content[:schema_match.start()] + new_script + content[schema_match.end():]

# 2. Extract and Move Admin Modal
admin_pattern = re.compile(r'(<div class="admin-modal" id="adminModal">.*?</div>\s*</div>)', re.DOTALL)
admin_match = admin_pattern.search(content)
admin_str = ""
if admin_match:
    admin_str = admin_match.group(1)
    content = content.replace(admin_str, "")

# 3. Extract and Move AI Modal
def find_div_end(text, start_idx):
    count = 0
    idx = start_idx
    while idx < len(text):
        if text[idx:idx+4] == '<div':
            count += 1
            idx += 4
        elif text[idx:idx+6] == '</div>':
            count -= 1
            if count == 0:
                return idx + 6
            idx += 6
        else:
            idx += 1
    return -1

ai_match = re.search(r'<!-- AI Chat Interface Modal -->\s*<div class="ai-chat-modal" id="aiChatModal">', content)
ai_str = ""
if ai_match:
    start_idx = content.find('<div class="ai-chat-modal" id="aiChatModal">')
    end_idx = find_div_end(content, start_idx)
    if end_idx != -1:
        ai_str = content[ai_match.start():end_idx]
        content = content[:ai_match.start()] + content[end_idx:]

# Insert modals before </body>
modals_html = f"\n<!-- Relocated Modals for SEO -->\n{admin_str}\n{ai_str}\n"
content = content.replace('</body>', f'{modals_html}</body>')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
