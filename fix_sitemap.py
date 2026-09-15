import re

with open(r"c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\sitemap.xml", "r", encoding="utf-8") as f:
    content = f.read()

# Replace .html inside <loc> tags
def replacer(match):
    url = match.group(1)
    if url.endswith('/index.html'):
        return f"<loc>{url[:-11]}</loc>"
    elif url.endswith('.html'):
        return f"<loc>{url[:-5]}</loc>"
    return match.group(0)

new_content = re.sub(r'<loc>(.*?)<\/loc>', replacer, content)

with open(r"c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\sitemap.xml", "w", encoding="utf-8") as f:
    f.write(new_content)

print("Clean URLs enforced in Sitemap.")
