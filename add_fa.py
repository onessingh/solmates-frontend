import glob

# Add FontAwesome to game files
game_files = glob.glob(r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\games\*\index.html")
fa_link = '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">'

for file in game_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    if "font-awesome" not in content:
        content = content.replace('</title>', '</title>\n      ' + fa_link)
        
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Added FontAwesome to game files.")
