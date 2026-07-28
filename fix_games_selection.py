import re
import glob

# Change option selection color to brand blue
game_files = glob.glob(r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\games\*\index.html")

for file in game_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Change .option-btn.selected from var(--text-main) to blue #0071e3
    content = re.sub(
        r'\.option-btn\.selected\s*\{\s*background:\s*var\(--text-main\);\s*border-color:\s*var\(--text-main\);\s*color:\s*var\(--bg-body\);\s*\}', 
        r'.option-btn.selected { background: #0071e3 !important; border-color: #0071e3 !important; color: #ffffff !important; }', 
        content
    )
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Updated selection color to blue.")
