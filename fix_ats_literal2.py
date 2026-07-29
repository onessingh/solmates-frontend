import re

html_path = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\tools\ats-checker.html"
with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

bad_metrics = """      document.getElementById('valWordCount').innerHTML = <i class="fas fa-font"></i> ;
      document.getElementById('valVerbs').innerHTML = <i class="fas fa-bolt"></i> ;
      document.getElementById('valNumbers').innerHTML = <i class="fas fa-chart-bar"></i> ;
      document.getElementById('valKeywords').innerHTML = <i class="fas fa-key"></i> ;"""

good_metrics = """      document.getElementById('valWordCount').innerHTML = `<i class="fas fa-font"></i> ${data.wordCount || 0}`;
      document.getElementById('valVerbs').innerHTML = `<i class="fas fa-bolt"></i> ${data.actionVerbs || 0}`;
      document.getElementById('valNumbers').innerHTML = `<i class="fas fa-chart-bar"></i> ${data.measurableMetrics || 0}`;
      document.getElementById('valKeywords').innerHTML = `<i class="fas fa-key"></i> ${data.keywordMatch || 'N/A'}`;"""

html = html.replace(bad_metrics, good_metrics)

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)
print("Fixed metric literals in ats-checker")
