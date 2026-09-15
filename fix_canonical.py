import re

with open(r"c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\platform-guide.html", "r", encoding="utf-8") as f:
    content = f.read()

content = re.sub(r'<link rel="canonical" href="https:\/\/solmates\.in\/?">', r'<link rel="canonical" href="https://solmates.in/platform-guide">', content)

with open(r"c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\platform-guide.html", "w", encoding="utf-8") as f:
    f.write(content)

print("Fixed canonical URL.")
