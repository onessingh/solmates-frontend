import re

html_path = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\tools\resumebuilder\index.html"
with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

html = re.sub(r'<!-- INJECTED DARK MODE -->.*?<!-- END INJECTED DARK MODE -->', '', html, flags=re.DOTALL)

dark_css = '''
<!-- INJECTED DARK MODE -->
<style>
@media (prefers-color-scheme: dark) {
    body, .page { background: #0f172a !important; color: #f8fafc !important; }
    .site-header, .top-nav, .header-bar { background: rgba(15,23,42,0.95) !important; border-bottom: 1px solid #334155 !important; }
    
    /* Interface Cards */
    .card, .form-panel, .panel-section, .hero, .rb-tab-content, .white-box, .metric, .template-card, .rb-tabs, .wizard-header, .builder-layout, .jd-match, .score-card, .jd-score-card, .repeater-item, .section-item, .wizard-nav, .jd-panel, .chip-wrapper, .preview-panel { 
        background: #1e293b !important; 
        border-color: #334155 !important; 
        box-shadow: none !important;
    }
    
    .rb-tab { color: #94a3b8 !important; }
    .rb-tab.active { background: #334155 !important; color: #f8fafc !important; }
    
    /* Scoped Text Colors */
    .hero-content h1, .section-header h2, .metric-value, .template-card h3, .jd-match h2, .score-card h3, .jd-score-value, .jd-panel summary, .jd-panel-meta, .jd-list li, .jd-heatmap-body td, .jd-panel-content h3, .preview-header h2, .score-value, .score-total, .jd-toggle { 
        color: #f8fafc !important; 
        -webkit-text-fill-color: #f8fafc !important; 
        background: none !important; 
    }
    
    .hero-subtitle, .eyebrow, .field label, .field-hint, .wizard-step-text, .metric-label, .section-item span, .jd-match p, .score-card p, .jd-score-label, .jd-score-feedback, .suggestion-item, .section-header p, .chip-input::placeholder, .preview-header p, .score-feedback { 
        color: #94a3b8 !important; 
    }
    
    /* Form Inputs and Interactive */
    input:not([type="checkbox"]):not([type="radio"]), select, textarea, .form-input, .input-field, .btn-secondary, .btn-ghost, .chip, .jd-heatmap-head th { 
        background: #334155 !important; 
        color: #f8fafc !important; 
        border: 1px solid #475569 !important; 
    }
    
    input:focus, select:focus, textarea:focus { border-color: #60a5fa !important; }
    
    .btn-secondary:hover, .btn-ghost:hover { background: #1e293b !important; }
    
    /* Fix bottom bar */
    .wizard-nav { border-top: 1px solid #334155 !important; }
    
    /* FIX: Force ONLY the Resume Preview inner container to be white paper */
    .resume-preview, #resume-preview {
        background: #ffffff !important;
        border: 1px solid #d9e1ec !important;
    }
}
</style>
<!-- END INJECTED DARK MODE -->
'''

html = html.replace('</head>', dark_css + '\n</head>')
html = re.sub(r'style\.css\?v=[0-9.]+', 'style.css?v=113.2', html)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)
print("Injected final fixed dark mode into resumebuilder/index.html")
