import re
import glob
import os

files_to_modify = [
    'view.html',
    'e-books.html',
    'folder-content.html',
    'youtube-browse.html',
    'youtube-content.html'
]

base_dir = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database"

for file_name in files_to_modify:
    file_path = os.path.join(base_dir, file_name)
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # We will replace the .breadcrumb { ... } block with the hidden version
        # Or, we can just inject .breadcrumb { display: none !important; margin: 0 !important; padding: 0 !important; height: 0 !important; border: none !important; overflow: hidden !important; } before </style>
        
        hidden_css = "\n    .breadcrumb { display: none !important; margin: 0 !important; padding: 0 !important; height: 0 !important; border: none !important; overflow: hidden !important; }\n"
        
        if "display: none !important; margin: 0 !important" not in content:
            content = content.replace("</style>", hidden_css + "</style>")
            
        # Bump cache versions
        content = re.sub(r'sol-cache\.js\?v=[0-9.]+', r'sol-cache.js?v=96.0', content)
        content = re.sub(r'config\.js\?v=[0-9.]+', r'config.js?v=123.0', content)

        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {file_name}")
    else:
        print(f"Not found: {file_name}")

