import re

src = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database\index.html"
dst = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\tools\index.html"

with open(src, 'r', encoding='utf-8') as f:
    src_content = f.read()

# Extract the block starting from .whatsapp-option { down to .whatsapp-option:hover .option-desc { ... }
match = re.search(r'(\.whatsapp-option\s*\{.*?\.whatsapp-option:hover\s*\.option-desc\s*\{[^}]+\})', src_content, re.DOTALL)
if match:
    css_to_add = match.group(1)
    
    with open(dst, 'r', encoding='utf-8') as f:
        dst_content = f.read()
        
    if ".whatsapp-option {" not in dst_content:
        # inject after .whatsapp-options { ... }
        dst_content = dst_content.replace(
            ".whatsapp-options {\n      display: flex;\n      gap: 6px;\n    }",
            ".whatsapp-options {\n      display: flex;\n      gap: 6px;\n    }\n\n    " + css_to_add.replace('\n', '\n    ')
        )
        
        # also add media query overrides for mobile if missing in tools
        mobile_mq = r'(\.whatsapp-dropdown\s*\{.*?\}\s*\.whatsapp-option\s*\{.*?\}\s*\.whatsapp-option\s*i\s*\{.*?\}\s*\.whatsapp-option\s*\.option-text\s*\{.*?\}\s*\.whatsapp-option\s*\.option-desc\s*\{.*?\})'
        match_mobile = re.search(mobile_mq, src_content, re.DOTALL)
        if match_mobile:
             mobile_css = match_mobile.group(1)
             if ".whatsapp-option {" not in dst_content.split('@media (max-width: 768px)')[1]:
                 dst_content = dst_content.replace(
                     "@media (max-width: 768px) {",
                     "@media (max-width: 768px) {\n      " + mobile_css.replace('\n', '\n      ')
                 )
        
        # Bump cache
        dst_content = re.sub(r'sol-cache\.js\?v=[0-9.]+', r'sol-cache.js?v=100.0', dst_content)
        dst_content = re.sub(r'config\.js\?v=[0-9.]+', r'config.js?v=127.0', dst_content)
        
        with open(dst, 'w', encoding='utf-8') as f:
            f.write(dst_content)
        print("Injected whatsapp-option CSS into tools/index.html")
    else:
        print("Already has whatsapp-option CSS")
else:
    print("Could not extract CSS from database/index.html")

