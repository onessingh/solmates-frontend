import os
import re

tools = [
    r"resumebuilder\index.html",
    r"job-search\index.html",
    r"careertest.html",
    r"interview.html",
    r"email-generator.html",
    r"ats-checker.html",
    r"cover-letter.html",
    r"salary-calculator.html",
    r"linkedin-checklist.html",
    r"portfolio-builder\index.html",
    r"notice-period\index.html",
    r"corporate-translator.html",
    r"resignation-kit.html",
    r"freelance-calculator.html",
    r"ai-excuse-generator.html"
]

base_path = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\tools"

for tool in tools:
    path = os.path.join(base_path, tool)
    if not os.path.exists(path):
        print(f"File not found: {tool}")
        continue
        
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content
    
    # 1. Navbar / Header-bar
    content = re.sub(r'(\.header-bar\s*\{[^\}]*)background:\s*#fff(?:fff)?;', r'\1background: var(--bg-card);', content)
    content = re.sub(r'(\.header-bar\s*h1\s*\{[^\}]*)color:\s*#0f2b46;', r'\1color: var(--brand-primary);', content)
    
    # 2. General Cards (.card, .form-card, .result-card, .feature-item, etc)
    # We'll just replace standard card white backgrounds with var(--bg-card)
    content = re.sub(r'(\.(?:card|form-card|result-box|feature-item|container|main-content|white-box)\s*\{[^\}]*)background:\s*#fff(?:fff)?\s*;', r'\1background: var(--bg-card);', content)
    
    # 3. Inputs
    # Sometimes it's .input-field, .select-field, input[type=text] etc.
    # If they have background: #fdfdfd; or background: #f9f9f9; or background: #fff;
    content = re.sub(r'(\.(?:input-field|select-field|textarea-field)[^\}]*)background:\s*(?:#fff(?:fff)?|#fdfdfd|#f9f9f9|#f5f5f7)\s*;', r'\1background: var(--bg-body);', content)
    content = re.sub(r'(\.(?:input-field|select-field|textarea-field)[^\}]*)color:\s*(?:#333(?:333)?|#111(?:111)?|#444(?:444)?)\s*;', r'\1color: var(--text-main);', content)
    content = re.sub(r'(\.(?:input-field|select-field|textarea-field)[^\}]*)border:\s*(?:1|2)px\s*solid\s*(?:#eee(?:eee)?|#ddd(?:ddd)?|#ccc(?:ccc)?)\s*;', r'\1border: 2px solid var(--border-color);', content)
    
    # input focus backgrounds
    content = re.sub(r'(\.(?:input-field|select-field|textarea-field):focus\s*\{[^\}]*)background:\s*(?:#fff(?:fff)?|#fdfdfd|#f9f9f9|#f5f5f7)\s*;', r'\1background: var(--bg-card-hover);', content)
    
    # 4. Text Colors universally in main CSS (safe replacements for #333 and #555)
    content = re.sub(r'color:\s*#333(?:333)?\s*;', r'color: var(--text-main);', content)
    content = re.sub(r'color:\s*#555(?:555)?\s*;', r'color: var(--text-muted);', content)
    content = re.sub(r'color:\s*#111(?:111)?\s*;', r'color: var(--text-main);', content)
    content = re.sub(r'color:\s*#444(?:444)?\s*;', r'color: var(--text-main);', content)
    content = re.sub(r'color:\s*#666(?:666)?\s*;', r'color: var(--text-lighter);', content)
    
    # 5. Border Colors globally
    content = re.sub(r'border(?:-[a-z]+)?:\s*1px\s*solid\s*(?:#eee(?:eee)?|#ddd(?:ddd)?|#ccc(?:ccc)?)\s*;', r'border: 1px solid var(--border-color);', content)
    content = re.sub(r'border(?:-[a-z]+)?:\s*2px\s*solid\s*(?:#eee(?:eee)?|#ddd(?:ddd)?|#ccc(?:ccc)?)\s*;', r'border: 2px solid var(--border-color);', content)
    content = re.sub(r'border-color:\s*(?:#eee(?:eee)?|#ddd(?:ddd)?|#ccc(?:ccc)?)\s*;', r'border-color: var(--border-color);', content)

    # 6. Specific hardcoded #fff or #ffffff that are likely backgrounds
    # This might be risky, but most #fff backgrounds in these isolated tools are meant to be cards.
    content = re.sub(r'(background(?:-color)?):\s*#fff(?:fff)?\s*;', r'\1: var(--bg-card);', content)
    
    # Bump cache
    content = re.sub(r'sol-cache\.js\?v=[0-9.]+', r'sol-cache.js?v=110.0', content)
    content = re.sub(r'config\.js\?v=[0-9.]+', r'config.js?v=140.0', content)
    
    if content != original_content:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated: {tool}")
    else:
        print(f"No changes needed: {tool}")

print("Done processing tools.")
