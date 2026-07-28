import re
import glob

files = glob.glob(r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\skills\*.html")

input_css = """
    input, select, textarea {
      background: var(--bg-card-hover) !important;
      color: var(--text-main) !important;
      border: 1px solid var(--border-color) !important;
      outline: none;
    }
    input::placeholder, textarea::placeholder {
      color: var(--text-muted) !important;
      opacity: 0.7;
    }
    input:focus, select:focus, textarea:focus {
      border-color: #0071e3 !important;
      box-shadow: 0 0 0 2px rgba(0,113,227,0.2);
    }
"""

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Inject the input_css before </style>
    if "input::placeholder" not in content:
        content = content.replace("</style>", input_css + "\n    </style>")
        
    # Also bump cache
    content = re.sub(r'sol-cache\.js\?v=[0-9.]+', r'sol-cache.js?v=92.0', content)
    content = re.sub(r'config\.js\?v=[0-9.]+', r'config.js?v=119.0', content)

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Injected input CSS fix in all skills HTML files")
