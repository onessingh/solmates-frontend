import re

html_path = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\tools\resumebuilder\index.html"
with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Remove the old injected dark mode block
html = re.sub(r'<!-- INJECTED DARK MODE -->.*?<!-- END INJECTED DARK MODE -->', '', html, flags=re.DOTALL)

dark_css = '''
<!-- INJECTED DARK MODE -->
<style>
@media (prefers-color-scheme: dark) {
    body, .page { background: #0f172a !important; color: #f8fafc !important; }
    .site-header, .top-nav, .header-bar { background: rgba(15,23,42,0.95) !important; border-bottom: 1px solid #334155 !important; }
    
    /* Interface Cards */
    .card, .form-panel, .panel-section, .hero, .rb-tab-content, .white-box, .metric, .template-card, .rb-tabs, .wizard-header, .builder-layout, .jd-match, .score-card, .repeater-item, .section-item, .wizard-nav { 
        background: #1e293b !important; 
        border-color: #334155 !important; 
        box-shadow: none !important;
    }
    
    .rb-tab { color: #94a3b8 !important; }
    .rb-tab.active { background: #334155 !important; color: #f8fafc !important; }
    
    /* Scoped Text Colors (to avoid touching Live Preview) */
    .hero-content h1, .section-header h2, .metric-value, .template-card h3, .jd-match h2, .score-card h3, .jd-score-value { 
        color: #f8fafc !important; 
        -webkit-text-fill-color: #f8fafc !important; 
        background: none !important; 
    }
    
    .hero-subtitle, .eyebrow, .field label, .field-hint, .wizard-step-text, .metric-label, .section-item span, .jd-match p, .score-card p, .jd-score-label, .jd-score-feedback, .suggestion-item, .section-header p { 
        color: #94a3b8 !important; 
    }
    
    /* Form Inputs */
    input:not([type="checkbox"]):not([type="radio"]), select, textarea, .form-input, .input-field { 
        background: #334155 !important; 
        color: #f8fafc !important; 
        border: 1px solid #475569 !important; 
    }
    
    input:focus, select:focus, textarea:focus { border-color: #60a5fa !important; }
    
    /* Fix bottom bar */
    .wizard-nav { border-top: 1px solid #334155 !important; }
    
    /* FIX: Force Resume Preview container to ALWAYS be white paper */
    .preview-panel, .preview-panel .resume-preview, #resume-preview {
        background: #ffffff !important;
        border: 1px solid #d9e1ec !important;
    }
    /* We DO NOT apply text colors globally so Live Preview retains its original colors! */
}
</style>
<!-- END INJECTED DARK MODE -->
'''

html = html.replace('</head>', dark_css + '\n</head>')
html = re.sub(r'style\.css\?v=[0-9.]+', 'style.css?v=112.0', html)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)
print("Injected fixed dark mode into resumebuilder/index.html")

css_path = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\tools\resumebuilder\style.css"
with open(css_path, 'r', encoding='utf-8') as f:
    css = f.read()

# Remove the old custom block from style.css completely as we are now fully relying on index.html injection
css = re.sub(r'/\* CUSTOM DARK MODE FOR RESUME BUILDER \*/[\s\S]*', '', css)

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(css)
print("Removed old custom block from resumebuilder/style.css")
