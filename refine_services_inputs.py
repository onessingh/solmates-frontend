import re

cs_path = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\tools\custom-services.html"
with open(cs_path, 'r', encoding='utf-8') as f:
    cs_content = f.read()

# Change input background from --bg-card to --bg-body
cs_content = re.sub(
    r'\.input-field,\s*\.select-field,\s*\.textarea-field\s*\{\s*width:\s*100%;\s*padding:\s*12px\s*15px;\s*border:\s*2px\s*solid\s*var\(--border-color\);\s*border-radius:\s*12px;\s*font-size:\s*16px;\s*background:\s*var\(--bg-card\);\s*color:\s*var\(--text-main\);\s*transition:\s*0\.3s;\s*\}',
    r'.input-field, .select-field, .textarea-field {\n      width: 100%;\n      padding: 12px 15px;\n      border: 2px solid var(--border-color);\n      border-radius: 12px;\n      font-size: 16px;\n      background: var(--bg-body);\n      color: var(--text-main);\n      transition: 0.3s;\n    }',
    cs_content
)

# Same for file-input-wrapper
cs_content = re.sub(
    r'\.file-input-wrapper\s*\{\s*position:\s*relative;\s*display:\s*flex;\s*align-items:\s*center;\s*gap:\s*10px;\s*padding:\s*15px;\s*border:\s*2px\s*dashed\s*var\(--border-color\);\s*border-radius:\s*12px;\s*background:\s*var\(--bg-card\);\s*cursor:\s*pointer;\s*transition:\s*all\s*0\.3s;\s*color:\s*var\(--text-main\);\s*\}',
    r'.file-input-wrapper {\n      position: relative;\n      display: flex;\n      align-items: center;\n      gap: 10px;\n      padding: 15px;\n      border: 2px dashed var(--border-color);\n      border-radius: 12px;\n      background: var(--bg-body);\n      cursor: pointer;\n      transition: all 0.3s;\n      color: var(--text-main);\n    }',
    cs_content
)

# Add media query for placeholder colors in inputs just in case
if "::placeholder" not in cs_content:
    cs_content = cs_content.replace("</style>", "\n    .input-field::placeholder, .textarea-field::placeholder {\n      color: var(--text-muted);\n    }\n    </style>")

# Bump cache versions
cs_content = re.sub(r'sol-cache\.js\?v=[0-9.]+', r'sol-cache.js?v=102.0', cs_content)
cs_content = re.sub(r'config\.js\?v=[0-9.]+', r'config.js?v=129.0', cs_content)

with open(cs_path, 'w', encoding='utf-8') as f:
    f.write(cs_content)
print("Updated custom-services inputs")

