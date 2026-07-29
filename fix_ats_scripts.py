import re

html_path = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\tools\ats-checker.html"
with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

scripts_to_add = """  <script src="/config.js?v=141.0"></script>
  <script src="/js/uptime-helper.js?v=101.0"></script>
  <script src="/js/api-client.js?v=89.0"></script>
  <script src="/js/sol-cache.js?v=111.0"></script>"""

if "api-client.js" not in html:
    html = html.replace('<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js"></script>', '<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js"></script>\n' + scripts_to_add)

    with open(html_path, "w", encoding="utf-8") as f:
        f.write(html)
    print("Added API scripts to ats-checker")
else:
    print("Scripts already exist")
