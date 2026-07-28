import re
import glob

files = glob.glob(r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\skills\*.html")

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace hardcoded light backgrounds in inline styles with var(--bg-card-hover) or var(--bg-card)
    content = re.sub(r'background:\s*#(?:f9f9fb|f5f5f7|f0f0f0|e8f4fd|f8f9fa|fff5f5|ffe5e5)', r'background: var(--bg-card-hover)', content)
    
    # Also replace any other hardcoded inline colors that might be white or light
    # Actually just check for border: 1px solid #ddd;
    content = re.sub(r'border:\s*1px\s*solid\s*#ddd', r'border: 1px solid var(--border-color)', content)

    # Let's fix quote-box explicitly
    content = re.sub(r'(\.quote-box\s*\{[^}]*background:\s*)#[a-fA-F0-9]+;', r'\1var(--bg-card-hover);', content)

    # And .disrupt-box in growth-opportunities
    content = re.sub(r'(\.disrupt-box\s*\{[^}]*background:\s*)#[a-fA-F0-9]+;', r'\1var(--bg-card-hover);', content)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Fixed inline light backgrounds")
