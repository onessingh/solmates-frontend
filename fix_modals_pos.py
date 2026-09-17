import re

filepath = r'c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\index.html'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Extract the Relocated Modals block
pattern = re.compile(r'<!-- Relocated Modals for SEO -->.*?(?=</body>)', re.DOTALL)
match = pattern.search(content)

if match:
    modals_html = match.group(0)
    # Remove it from the bottom
    content = content.replace(modals_html, "")
    
    # 2. Find </footer> and insert immediately after it
    footer_idx = content.find('</footer>')
    if footer_idx != -1:
        insert_idx = footer_idx + len('</footer>')
        content = content[:insert_idx] + "\n" + modals_html + "\n" + content[insert_idx:]
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print("Successfully moved modals before scripts!")
    else:
        print("Could not find </footer>")
else:
    print("Could not find Relocated Modals block")
