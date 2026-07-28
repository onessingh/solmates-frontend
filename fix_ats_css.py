import re

html_path = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\tools\ats-checker.html"
with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

custom_css = '''
<!-- ADDITIONAL DARK MODE FIXES -->
<style>
@media (prefers-color-scheme: dark) {
    /* Fix textarea placeholders */
    textarea::placeholder {
        color: #94a3b8 !important;
        opacity: 1 !important;
    }

    /* Fix drag and drop zone text */
    .upload-zone h3, .upload-zone p {
        color: #f8fafc !important;
    }

    /* Fix metric cards */
    .metric-title {
        color: #94a3b8 !important;
    }
    .metric-val {
        color: #f8fafc !important;
    }
    .metric-card {
        background: #1e293b !important;
        border-color: #334155 !important;
    }
    
    /* Overall result box tweaks */
    .result-box {
        background: #1e293b !important;
        border-color: #334155 !important;
    }

    /* Fix score text explicitly */
    #scoreText {
        fill: #f8fafc !important;
    }
}
</style>
<!-- END ADDITIONAL DARK MODE FIXES -->
'''

# Ensure no duplicates
html = re.sub(r'<!-- ADDITIONAL DARK MODE FIXES -->.*?<!-- END ADDITIONAL DARK MODE FIXES -->', '', html, flags=re.DOTALL)
html = html.replace('</head>', custom_css + '\n</head>')

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)
print("Injected dark mode CSS fixes for ATS Checker")
