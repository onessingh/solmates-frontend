import re
import glob

files = glob.glob(r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\skills\*.html")

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Fix .top-nav background
    content = re.sub(r'(\.top-nav\s*\{[^}]*background:\s*)rgba\(255,\s*255,\s*255,\s*0\.8\);', 
                     r'\1var(--bg-nav);', 
                     content)
    content = re.sub(r'(\.top-nav\s*\{[^}]*background:\s*)#ffffff;', 
                     r'\1var(--bg-nav);', 
                     content)
    
    # Fix input, select, textarea backgrounds
    # Find any 'background: white;' or 'background: #fff;' inside select/input blocks
    # It's easier to just blindly replace 'background: white;' and 'background: #fff;' with 'background: var(--bg-card);' 
    # anywhere they appear in the CSS that looks like it's inside an input or select block. 
    # Since we can't easily parse CSS, let's just do a blanket replacement of 'background: white' to 'background: var(--bg-card)'
    # where it is safe.
    
    content = re.sub(r'(select|input|textarea)\s*\{([^}]*)background:\s*(?:white|#fff|#ffffff);', 
                     r'\1 {\2background: var(--bg-card);', 
                     content)

    # Also check if they have hardcoded border: ... #eee;
    content = re.sub(r'(select|input|textarea)\s*\{([^}]*)border:\s*([^;]+)(?:#eee|#ddd);', 
                     r'\1 {\2border: \3var(--border-color);', 
                     content)

    # If any specific 'background: white' or '#fff' remains inside other UI elements that shouldn't be white in dark mode:
    # We already fixed .card and .container in the previous script.
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Fixed top-nav and input/select styles")
