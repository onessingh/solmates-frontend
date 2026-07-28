import os
import re

tools = [
    r"resumebuilder\index.html",
    r"job-search\index.html",
    r"careertest.html",
    r"interview.html",
    r"email-generator.html",
    r"ats-checker.html",
    r"cover-letter.html",
    r"salary-calculator.html",
    r"linkedin-checklist.html",
    r"portfolio-builder\index.html",
    r"notice-period\index.html",
    r"corporate-translator.html",
    r"resignation-kit.html",
    r"freelance-calculator.html"
]

base_path = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\tools"

universal_dark_css = '''
    /* UNIVERSAL DARK MODE OVERRIDES */
    @media (prefers-color-scheme: dark) {
        body { background: var(--bg-body, #0f172a) !important; color: var(--text-main, #f8fafc) !important; }
        .top-nav, .header-bar, header { background: var(--bg-nav, rgba(15,23,42,0.95)) !important; border-bottom: 1px solid var(--border-color, #334155) !important; }
        .card, .form-card, .result-box, .white-box, .container, .main-content, .card-body, .resume-preview, .feature-item, .info-box { 
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

for tool in tools:
    path = os.path.join(base_path, tool)
    if not os.path.exists(path):
        continue
        
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Don't add if already added
    if "UNIVERSAL DARK MODE OVERRIDES" not in content:
        # Inject just before the last </style>
        # Finding the last </style>
        parts = content.rsplit('</style>', 1)
        if len(parts) == 2:
            new_content = parts[0] + universal_dark_css + '\n</style>' + parts[1]
            # Bump cache
            new_content = re.sub(r'sol-cache\.js\?v=[0-9.]+', r'sol-cache.js?v=111.0', new_content)
            new_content = re.sub(r'config\.js\?v=[0-9.]+', r'config.js?v=141.0', new_content)
            
            with open(path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Fixed dark mode in {tool}")
        else:
            print(f"Could not find </style> in {tool}")

print("Done universal injection.")
