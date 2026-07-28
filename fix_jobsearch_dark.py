import re

html_path = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\tools\job-search\index.html"
with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

html = re.sub(r'<!-- INJECTED DARK MODE -->.*?<!-- END INJECTED DARK MODE -->', '', html, flags=re.DOTALL)

dark_css = '''
<!-- INJECTED DARK MODE -->
<style>
@media (prefers-color-scheme: dark) {
    /* Base Body */
    body, html { background-color: #0f172a !important; color: #f8fafc !important; }
    
    /* Job Search Specific Containers */
    .container, .sol-form-wrap, .sol-card, .tab-btn.active {
        background-color: #1e293b !important;
        border-color: #334155 !important;
        box-shadow: none !important;
    }
    
    .tab-group, .header-bar {
        background-color: #0f172a !important;
        border-color: #334155 !important;
    }
    
    /* Headers & Text */
    h1, h2, h3, h4, h5, h6, .sol-form-title, .tab-btn.active { color: #f8fafc !important; }
    p, span, label, .sol-form-label, .tab-btn { color: #94a3b8 !important; }
    
    /* Interactive Elements */
    input, select, textarea, .sol-form-input {
        background-color: #334155 !important;
        color: #f8fafc !important;
        border: 1px solid #475569 !important;
    }
    input::placeholder, textarea::placeholder { color: #64748b !important; }
    input:focus, select:focus, textarea:focus, .sol-form-input:focus { border-color: #60a5fa !important; background-color: #1e293b !important; }
    
    /* Buttons */
    .sol-btn { background-color: #2563eb !important; color: #ffffff !important; }
    .sol-btn:hover { background-color: #1d4ed8 !important; }
    
    .back-btn { background-color: #334155 !important; color: #f8fafc !important; border-color: #475569 !important; }
    .back-btn:hover { background-color: #475569 !important; }
    
    /* Fix tab group */
    .tab-group { background: rgba(255, 255, 255, 0.05) !important; }
}
</style>
<!-- END INJECTED DARK MODE -->
'''

html = html.replace('</head>', dark_css + '\n</head>')

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)
print("Injected custom dark mode for job search")
