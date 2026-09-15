import re

with open(r"c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\platform-guide.html", "r", encoding="utf-8") as f:
    content = f.read()

# Fix the header background and text color to support Light/Dark mode dynamically
# Old string: background: #0f172a; border-bottom: 1px solid rgba(255,255,255,0.1);
# New string: background: var(--bg-body, #ffffff); border-bottom: 1px solid var(--border-color, rgba(0,0,0,0.05));
# Old logo color: color: #f8fafc;
# New logo color: color: var(--text-main, #0f2b46);

new_header = """  <header class="top-nav" style="justify-content: center; background: var(--bg-body, #ffffff); border-bottom: 1px solid var(--border-color, rgba(0,0,0,0.05));">
    <a href="/" class="logo" style="text-decoration: none; color: var(--text-main, #0f2b46); font-size: 1.8rem; font-weight: 800; letter-spacing: 2px; font-family: 'Outfit', sans-serif;">SOLMATES</a>
  </header>"""

# Regex replace the header block
content = re.sub(r'<header class="top-nav" style="justify-content: center;[^>]+>.*?<\/header>', new_header, content, flags=re.DOTALL)

with open(r"c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\platform-guide.html", "w", encoding="utf-8") as f:
    f.write(content)

print("Navbar theme colors fixed.")
