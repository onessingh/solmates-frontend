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

    /* Fix general advice box */
    .general-advice {
        background: rgba(245, 158, 11, 0.1) !important;
        border-color: #b45309 !important;
    }
    .general-advice h4 {
        color: #fcd34d !important;
        -webkit-text-fill-color: #fcd34d !important;
    }
    .general-advice p {
        color: #fef3c7 !important;
    }
}
</style>
<!-- END ADDITIONAL DARK MODE FIXES -->
'''

html = re.sub(r'<!-- ADDITIONAL DARK MODE FIXES -->.*?<!-- END ADDITIONAL DARK MODE FIXES -->', custom_css, html, flags=re.DOTALL)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)
print("Updated dark mode fixes for interview.html")
