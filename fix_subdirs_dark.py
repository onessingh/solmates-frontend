import os
import re

tools_dir = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\tools"

UNIVERSAL_CSS = '''
<!-- INJECTED DARK MODE -->
<style>
@media (prefers-color-scheme: dark) {
    /* Base Body */
    body, html { background-color: #0f172a !important; color: #f8fafc !important; }
    
    /* Common Containers */
    .container, .card, .glass-panel, .form-container, .tool-container, main, section, .modal-content, .stats-card, .filter-box, .result-card {
        background-color: #1e293b !important;
        border: 1px solid #334155 !important;
        box-shadow: none !important;
    }
    
    /* Headers & Text */
    h1, h2, h3, h4, h5, h6 { color: #f8fafc !important; }
    p, span, label, .text-muted, .description { color: #94a3b8 !important; }
    
    /* Interactive Elements */
    input, select, textarea, .form-control {
        background-color: #334155 !important;
        color: #f8fafc !important;
        border: 1px solid #475569 !important;
    }
    input::placeholder, textarea::placeholder { color: #64748b !important; }
    input:focus, select:focus, textarea:focus { border-color: #3b82f6 !important; }
    
    /* Buttons */
    button.primary-btn, .btn-primary { background-color: #2563eb !important; color: #ffffff !important; }
    button.secondary-btn, .btn-secondary { background-color: #475569 !important; color: #f8fafc !important; }
    
    /* Tables & Lists */
    table, th, td, .list-group-item {
        background-color: #1e293b !important;
        border-color: #334155 !important;
        color: #f8fafc !important;
    }
    th { background-color: #0f172a !important; }
}
</style>
<!-- END INJECTED DARK MODE -->
'''

for root, dirs, files in os.walk(tools_dir):
    for file in files:
        if file == 'index.html' and 'resumebuilder' not in root:
            file_path = os.path.join(root, file)
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                
            # If already injected, replace it. Else append before </head>
            if '<!-- INJECTED DARK MODE -->' in content:
                content = re.sub(r'<!-- INJECTED DARK MODE -->.*?<!-- END INJECTED DARK MODE -->', UNIVERSAL_CSS, content, flags=re.DOTALL)
            else:
                content = content.replace('</head>', UNIVERSAL_CSS + '\n</head>')
                
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print("Injected into: " + file_path)
