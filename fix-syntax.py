import sys

files = [
    'games/rapid-fire/game.js',
    'games/business-hangman/game.js',
    'games/market-mavericks/game.js',
    'games/shark-pitch/game.js',
    'games/case-study-arena/game.js'
]

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    content = content.replace(r"\n        hostConn.on('host_disconnect_early", "\n        hostConn.on('host_disconnect_early")
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Fixed syntax errors!")
