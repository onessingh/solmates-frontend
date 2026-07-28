import os
import re

css_path = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\tools\resumebuilder\style.css"
html_path = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\tools\resumebuilder\index.html"

universal_dark_css = '''
/* UNIVERSAL DARK MODE OVERRIDES */
@media (prefers-color-scheme: dark) {
    body { background: var(--bg-body, #0f172a) !important; color: var(--text-main, #f8fafc) !important; }
    .top-nav, .header-bar, header { background: var(--bg-nav, rgba(15,23,42,0.95)) !important; border-bottom: 1px solid var(--border-color, #334155) !important; }
    .card, .form-card, .result-box, .white-box, .container, .main-content, .card-body, .resume-preview, .feature-item, .info-box, .builder-layout .form-panel { 
        background: var(--bg-card, #1e293b) !important; 
        border: 1px solid var(--border-color, #334155) !important; 
    }
    h1, h2, h3, h4, .nav-logo { color: var(--text-main, #f8fafc) !important; background: none !important; -webkit-text-fill-color: var(--text-main, #f8fafc) !important; }
    h1 i, h2 i, h3 i, .icon { -webkit-text-fill-color: var(--brand-accent, #c0962d) !important; color: var(--brand-accent, #c0962d) !important; }
    .apple-sub, p, label, .form-label, .text-muted { color: var(--text-muted, #94a3b8) !important; }
    input, select, textarea, .searchable-select .select-btn, .search-box input, .dropdown, .input-field, .select-field, .textarea-field { 
        background: var(--bg-card-hover, #334155) !important; 
        color: var(--text-main, #f8fafc) !important; 
        border: 1px solid var(--border-color, #475569) !important; 
    }
    input:focus, select:focus, textarea:focus, .searchable-select .select-btn:hover {
        border-color: var(--brand-primary, #60a5fa) !important;
    }
    .back-link, .btn-secondary { color: var(--brand-accent, #c0962d) !important; background: rgba(192, 150, 45, 0.1) !important; }
    .searchable-select .dropdown option, .searchable-select .option { background: var(--bg-card-hover, #334155) !important; color: var(--text-main, #f8fafc) !important; }
    .searchable-select .option:hover { background: var(--bg-card, #1e293b) !important; }
}
'''

if os.path.exists(css_path):
    with open(css_path, 'r', encoding='utf-8') as f:
        content = f.read()
    if "UNIVERSAL DARK MODE OVERRIDES" not in content:
        with open(css_path, 'a', encoding='utf-8') as f:
            f.write("\n" + universal_dark_css)
        print("Injected into resumebuilder/style.css")
        
        # Bump cache in HTML
        with open(html_path, 'r', encoding='utf-8') as f:
            html = f.read()
        html = re.sub(r'style\.css\?v=[0-9.]+', 'style.css?v=111.1', html)
        with open(html_path, 'w', encoding='utf-8') as f:
            f.write(html)

