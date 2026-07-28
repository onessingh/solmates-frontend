import os

games_dir = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\games"

# 1. Fix games/index.html
index_path = os.path.join(games_dir, "index.html")
if os.path.exists(index_path):
    with open(index_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Redefine --primary and --card-bg in dark mode media query
    if '--primary: #0f172a;' not in content:
        content = content.replace(
            '--bg-body: #0f172a;',
            '--bg-body: #0f172a;\n          --primary: #0f172a;\n          --card-bg: rgba(30, 41, 59, 0.8);'
        )
    
    # Fix the body background to use --primary instead of white
    with open(index_path, 'w', encoding='utf-8') as f:
        f.write(content)


# 2. Fix the 5 game pages
game_folders = ["quiz-battle", "rapid-fire", "case-study-arena", "shark-pitch", "market-mavericks"]
dark_css_override = """
        @media (prefers-color-scheme: dark) {
            .input-box { background: var(--primary); border-color: var(--glass-border); color: var(--text-main); }
            .option-btn { background: var(--primary); border-color: var(--glass-border); color: var(--text-main); }
            .option-btn:hover:not(:disabled) { background: var(--card-bg); border-color: var(--text-muted); }
            .btn-primary { background: #0ea5e9; color: white; }
            .btn-primary:hover { background: #0284c7; }
            .btn-secondary { background: var(--card-bg); color: var(--text-main); border-color: var(--glass-border); }
            .btn-secondary:hover { background: var(--primary); }
            .glass-card { background: var(--card-bg); }
        }
"""

for folder in game_folders:
    game_path = os.path.join(games_dir, folder, "index.html")
    if os.path.exists(game_path):
        with open(game_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        if '.btn-primary { background: #0ea5e9;' not in content: # Avoid double inject
            content = content.replace('</style>', dark_css_override + '\n</style>')
            
            with open(game_path, 'w', encoding='utf-8') as f:
                f.write(content)

print("Fixed games dark mode UI")
