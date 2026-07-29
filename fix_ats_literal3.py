import re

html_path = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\tools\ats-checker.html"
with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

bad_dasharray = 'circle.setAttribute("stroke-dasharray", , 100);'
bad_dasharray2 = 'circle.setAttribute("stroke-dasharray", ${score}, 100);'
good_dasharray = 'circle.setAttribute("stroke-dasharray", `${score}, 100`);'

html = html.replace(bad_dasharray, good_dasharray)
html = html.replace(bad_dasharray2, good_dasharray)

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)
print("Fixed dasharray literals in ats-checker")
