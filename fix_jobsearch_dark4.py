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
    .container, .sol-form-wrap, .sol-card, .tab-btn.active, .results-controls, .skeleton-card, .insight-card, .insights-panel {
        background-color: #1e293b !important;
        border-color: #334155 !important;
        box-shadow: none !important;
    }
    
    .tab-group, .header-bar {
        background-color: #0f172a !important;
        border-color: #334155 !important;
    }
    
    /* Skeletons */
    .skeleton {
        background: linear-gradient(90deg, #1e293b 25%, #334155 50%, #1e293b 75%) !important;
        background-size: 200% 100% !important;
    }
    .skeleton-loading-text {
        background: linear-gradient(90deg, #1e293b, #334155, #1e293b) !important;
        background-size: 200% 100% !important;
    }
    
    /* Fade Out Gradients */
    .sol-desc:not(.expanded)::after {
        background: linear-gradient(to bottom, rgba(30, 41, 59, 0), rgba(30, 41, 59, 1)) !important;
    }
    
    /* Headers & Text */
    h1, h2, h3, h4, h5, h6, .sol-form-title, .tab-btn.active, .sol-title, .sol-company, .insight-card h4, .insight-card .value { color: #f8fafc !important; }
    
    /* Exclude .platform-badge from becoming dim grey */
    p, span:not(.platform-badge), label, .sol-form-label, .sol-meta-item, .sol-desc, .platforms-info, .insight-card .sub-text { color: #cbd5e1 !important; }
    
    /* Force platform badge text to be bright white */
    .platform-badge { color: #ffffff !important; font-weight: 700 !important; }
    
    /* Make unselected tabs brighter */
    .tab-btn { color: #cbd5e1 !important; }
    
    /* Interactive Elements */
    input, select, textarea, .sol-form-input {
        background-color: #334155 !important;
        color: #f8fafc !important;
        border: 1px solid #475569 !important;
    }
    input::placeholder, textarea::placeholder { color: #94a3b8 !important; }
    input:focus, select:focus, textarea:focus, .sol-form-input:focus { border-color: #60a5fa !important; background-color: #1e293b !important; }
    
    /* Buttons */
    .sol-btn { background-color: #2563eb !important; color: #ffffff !important; }
    .sol-btn:hover { background-color: #1d4ed8 !important; }
    
    .back-btn { background-color: #334155 !important; color: #f8fafc !important; border-color: #475569 !important; }
    .back-btn:hover { background-color: #475569 !important; }
    
    /* Assist Buttons (AI Cover Letter, Interview Prep Guide) */
    .sol-btn--assist { 
        background: rgba(255, 255, 255, 0.1) !important; 
        color: #f8fafc !important; 
        border: 1px solid rgba(255, 255, 255, 0.2) !important; 
    }
    .sol-btn--assist:hover { 
        background: rgba(255, 255, 255, 0.2) !important; 
    }
    .sol-btn--assist i {
        color: #60a5fa !important; /* Make icons stand out */
    }
    
    /* Fix Save Button */
    .save-btn {
        background: #334155 !important;
        border-color: #475569 !important;
        color: #cbd5e1 !important;
    }
    .save-btn.active {
        background: #ef4444 !important;
        border-color: #ef4444 !important;
        color: #ffffff !important;
    }
    .save-btn:hover {
        border-color: #ef4444 !important;
        color: #ef4444 !important;
    }
    
    /* Fix overlap of logo and save button */
    .sol-card-header {
        padding-right: 50px !important;
    }
    
    /* Fix tab group */
    .tab-group { background: rgba(255, 255, 255, 0.05) !important; }
    
    /* Ensure Logos have clear contrast */
    .platform-logo { 
        background: #ffffff !important; 
        border-radius: 6px !important; 
        padding: 4px !important; 
        box-shadow: 0 2px 4px rgba(0,0,0,0.2) !important;
        object-fit: contain !important;
    }
}
</style>
<!-- END INJECTED DARK MODE -->
'''

html = html.replace('</head>', dark_css + '\n</head>')

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)
print("Injected custom dark mode for overlapping save button and dim badges")
