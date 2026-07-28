import glob

# Fix copy button icon in game files
game_files = glob.glob(r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\games\*\index.html")

for file in game_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace lucide copy icon with FontAwesome
    content = content.replace('<i data-lucide="copy" class="w-5 h-5"></i>', '<i class="fas fa-copy"></i>')
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Fixed copy icon in individual games.")
