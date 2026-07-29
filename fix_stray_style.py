import re

html_path = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\index.html"
with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

# I accidentally added an opening <style> tag.
# We can find '</style>\n<style>\n</head>' or similar. Let's just find '</style>\n<style>' where the next tag is not a CSS rule.
html = html.replace('</style>\n<style>\n\n  <script>', '</style>\n\n  <script>')
html = html.replace('</style>\n<style>\n</head>', '</style>\n</head>')

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)
print("Removed stray <style> tag")
