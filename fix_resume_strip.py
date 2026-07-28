import re

html_path = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\tools\resumebuilder\index.html"
with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Fix the header selector by replacing "header {" with ".site-header {" (but wait, it was ".site-header, .top-nav, .header-bar, header {")
html = html.replace('.site-header, .top-nav, .header-bar, header {', '.site-header, .top-nav, .header-bar {')

# Add .repeater-item to the background list
html = html.replace('.wizard-header, .builder-layout, .jd-match, .score-card {', '.wizard-header, .builder-layout, .jd-match, .score-card, .repeater-item {')

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)
print("Updated resumebuilder/index.html")

css_path = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\tools\resumebuilder\style.css"
with open(css_path, 'r', encoding='utf-8') as f:
    css = f.read()

css = css.replace('.site-header, .top-nav, .header-bar, header {', '.site-header, .top-nav, .header-bar {')
css = css.replace('.wizard-header { \n        background: #1e293b', '.wizard-header, .repeater-item { \n        background: #1e293b')

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(css)
print("Updated resumebuilder/style.css")
