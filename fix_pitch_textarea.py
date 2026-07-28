import os

path = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\games\shark-pitch\index.html"
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

dark_css = ".pitch-textarea { background: var(--primary); border-color: var(--glass-border); color: var(--text-main); }"

# We want to insert this inside the @media (prefers-color-scheme: dark) block.
# I'll just replace '.input-box { background: var(--primary);' with '.pitch-textarea { background: var(--primary); border-color: var(--glass-border); color: var(--text-main); } .input-box { background: var(--primary);'

if '.pitch-textarea { background: var(--primary)' not in content:
    content = content.replace(
        '.input-box { background: var(--primary)',
        dark_css + '\n            .input-box { background: var(--primary)'
    )
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

print("Fixed pitch-textarea")
