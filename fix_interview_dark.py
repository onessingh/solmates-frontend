import re

html_path = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\tools\interview.html"
with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

custom_css = '''
<!-- ADDITIONAL DARK MODE FIXES -->
<style>
@media (prefers-color-scheme: dark) {
    /* Fix input placeholder */
    input::placeholder, textarea::placeholder {
        color: #94a3b8 !important;
        opacity: 1 !important;
    }

    /* Fix loading texts */
    .loading-title {
        color: #f8fafc !important;
    }
    .loading-sub {
        color: #94a3b8 !important;
    }

    /* Fix question text and subtitle */
    .q-text, .subtitle {
        color: #f8fafc !important;
    }

    /* Fix question container */
    .question-item {
        background: #1e293b !important;
        border-color: #334155 !important;
    }

    /* Fix tip / How to answer block */
    .q-tip {
        background: rgba(96, 165, 250, 0.1) !important;
        border-left-color: #3b82f6 !important;
        color: #93c5fd !important;
    }
    .q-tip strong {
        color: #60a5fa !important;
    }
}
</style>
<!-- END ADDITIONAL DARK MODE FIXES -->
'''

html = re.sub(r'<!-- ADDITIONAL DARK MODE FIXES -->.*?<!-- END ADDITIONAL DARK MODE FIXES -->', '', html, flags=re.DOTALL)
html = html.replace('</head>', custom_css + '\n</head>')

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)
print("Injected dark mode fixes for interview.html")
