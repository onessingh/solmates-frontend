import re

with open(r"c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\platform-guide.html", "r", encoding="utf-8") as f:
    content = f.read()

new_logo = """<a href="/" class="logo" style="text-decoration: none; display: flex; align-items: center; gap: 10px; font-size: 1.8rem; font-weight: 900; letter-spacing: 1px; font-family: 'Outfit', sans-serif;">
      <i class="fas fa-graduation-cap" style="color: #c0962d; font-size: 1.6rem; filter: drop-shadow(0 2px 4px rgba(192,150,45,0.3));"></i>
      <span style="background: linear-gradient(135deg, var(--text-main, #0f2b46) 30%, #c0962d 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">SOLMATES</span>
    </a>"""

# Replace the existing simple logo link with the stylish one
content = re.sub(r'<a href="/" class="logo".*?SOLMATES<\/a>', new_logo, content, flags=re.DOTALL)

with open(r"c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\platform-guide.html", "w", encoding="utf-8") as f:
    f.write(content)

print("Logo styled beautifully.")
