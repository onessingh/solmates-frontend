import re

filepath = r'c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\index.html'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

pattern = re.compile(r'(<!-- AI Chat Interface Modal -->\s*<div class="ai-chat-modal" id="aiChatModal">.*?)<!-- END OF AI MODAL -->', re.DOTALL)
# Wait, I don't know if there is an END comment. Let's find the end of the div.

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

match = re.search(r'<!-- AI Chat Interface Modal -->\s*<div class="ai-chat-modal" id="aiChatModal">', content)
if match:
    start_idx = content.find('<div class="ai-chat-modal" id="aiChatModal">')
    end_idx = find_div_end(content, start_idx)
    
    if end_idx != -1:
        modal_content = content[match.start():end_idx]
        content = content[:match.start()] + content[end_idx:]
        content = content.replace('</body>', f'{modal_content}\n</body>')
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print("Successfully moved aiChatModal")
    else:
        print("Failed to find end div")
else:
    print("Match failed")
