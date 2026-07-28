import re

css_path = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\tools\resumebuilder\style.css"
with open(css_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the old universal block
content = re.sub(r'/\* UNIVERSAL DARK MODE OVERRIDES \*/[\s\S]*', '', content)

new_block = '''
/* CUSTOM DARK MODE FOR RESUME BUILDER */
@media (prefers-color-scheme: dark) {
    body { background: var(--bg-body, #0f172a) !important; color: var(--text-main, #f8fafc) !important; }
    .site-header, .top-nav, .header-bar, header { background: rgba(15,23,42,0.95) !important; border-bottom: 1px solid #334155 !important; }
    
    /* Interface Cards */
    .card, .form-panel, .white-box, .metric, .template-card, .rb-tabs, .wizard-header { 
        background: #1e293b !important; 
        border: 1px solid #334155 !important; 
    }
    
    .rb-tab { color: #94a3b8 !important; }
    .rb-tab.active { background: #334155 !important; color: #f8fafc !important; }
    
    h1, h2, h3, h4, .nav-logo, .hero-title { color: #f8fafc !important; -webkit-text-fill-color: #f8fafc !important; }
    .eyebrow, .hero-subtitle, p, label, .form-label, .wizard-step-text, .metric-label { color: #94a3b8 !important; }
    
    .metric-value { color: #f8fafc !important; }
    
    /* Form Inputs */
    input, select, textarea, .form-input, .input-field { 
        background: #334155 !important; 
        color: #f8fafc !important; 
        border: 1px solid #475569 !important; 
    }
    
    input:focus, select:focus, textarea:focus { border-color: #60a5fa !important; }
    
    /* FIX: Force Resume Preview to ALWAYS be white paper */
    .resume-preview, .resume-paper {
        background: #ffffff !important;
        color: #0f172a !important;
        border: 1px solid #d9e1ec !important;
    }
    
    /* Ensure text inside preview stays dark */
    .resume-preview *, .resume-paper * {
        color: #0f172a !important;
    }
}
'''

content += new_block

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated resumebuilder/style.css")

# Bump cache
html_path = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\tools\resumebuilder\index.html"
with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()
html = re.sub(r'style\.css\?v=[0-9.]+', 'style.css?v=111.5', html)
with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)
print("Bumped cache in index.html")
