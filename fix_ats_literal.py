import re

html_path = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\tools\ats-checker.html"
with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

# Fix the broken template literal
broken_fbHtml = """fbHtml += 
          <div class="feedback-card type-">
            <h4><i class="fas "></i> </h4>
            <p></p>
          </div>
          ;"""

fixed_fbHtml = """fbHtml += `
          <div class="feedback-card type-${f.type}">
            <h4><i class="fas ${icon}"></i> ${f.title}</h4>
            <p>${f.desc}</p>
          </div>
          `;"""

html = html.replace(broken_fbHtml, fixed_fbHtml)

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)
print("Fixed template literal in ats-checker")
