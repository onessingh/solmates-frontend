import re

html_path = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\tools\email-generator.html"
with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

custom_css = '''
<!-- ADDITIONAL DARK MODE FIXES -->
<style>
@media (prefers-color-scheme: dark) {
    /* Fix Panels & Cards */
    .input-panel, .template-card, .placeholder-msg {
        background: #1e293b !important;
        border-color: #334155 !important;
    }
    
    /* Fix Placeholder Text */
    input::placeholder, textarea::placeholder {
        color: #94a3b8 !important;
        opacity: 1 !important;
    }

    /* Fix Empty State Icon */
    .placeholder-msg i {
        color: #475569 !important;
    }

    /* Fix Template Content Output */
    .template-content {
        background: #0f172a !important;
        border: 1px solid #334155 !important;
        color: #f8fafc !important;
    }
    
    /* Fix Template Headers */
    .template-header {
        border-color: #334155 !important;
    }
    .template-title {
        color: #f8fafc !important;
    }

    /* Fix Primary Button */
    .btn-generate {
        background: linear-gradient(135deg, #3b82f6, #2563eb) !important;
        color: #ffffff !important;
        border: none !important;
    }
}
</style>
<!-- END ADDITIONAL DARK MODE FIXES -->
'''

# Remove any existing custom CSS block
html = re.sub(r'<!-- ADDITIONAL DARK MODE FIXES -->.*?<!-- END ADDITIONAL DARK MODE FIXES -->', '', html, flags=re.DOTALL)
# Inject before </head>
html = html.replace('</head>', custom_css + '\n</head>')

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)
print("Injected dark mode fixes for email-generator.html")
