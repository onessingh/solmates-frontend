import os
import re

games_dir = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\games"
game_folders = ["quiz-battle", "rapid-fire", "case-study-arena", "shark-pitch", "market-mavericks"]

for folder in game_folders:
    # Fix game.js
    game_js_path = os.path.join(games_dir, folder, "game.js")
    if os.path.exists(game_js_path):
        with open(game_js_path, 'r', encoding='utf-8') as f:
            content = f.read()
        # Replace the hardcoded bg-white player card
        content = re.sub(
            r'class="bg-white p-3 rounded-lg border border-slate-200 font-bold shadow-sm"',
            r'class="player-item"',
            content
        )
        with open(game_js_path, 'w', encoding='utf-8') as f:
            f.write(content)
            
    # Fix index.html
    index_path = os.path.join(games_dir, folder, "index.html")
    if os.path.exists(index_path):
        with open(index_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # 1. Fix text-slate-700 on the question numbers/spans
        # Match spans that have text-slate-700 but not dark:text-slate-300
        content = re.sub(
            r'class="([^"]*?)text-slate-700([^"]*?)"',
            lambda m: f'class="{m.group(1)}text-slate-700 dark:text-slate-300{m.group(2)}"' if 'dark:text-slate' not in m.group(0) else m.group(0),
            content
        )
        
        # 2. Add player-item CSS
        css_addition = """
        .player-item { padding: 12px; border-radius: 8px; font-weight: bold; box-shadow: 0 1px 2px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; background: #fff; color: #0f172a; margin-bottom: 8px; }
"""
        dark_css_addition = """
            .player-item { background: var(--card-bg); border-color: var(--glass-border); color: var(--text-main); }
"""
        if '.player-item {' not in content:
            content = content.replace('</style>', css_addition + '</style>')
            # Find the dark mode block and add the dark css
            content = content.replace('      }', dark_css_addition + '      }')

        # 3. Specific Shark Pitch challenge box fix
        if folder == 'shark-pitch':
            content = content.replace(
                'class="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6"',
                'class="challenge-box"'
            )
            if '.challenge-box {' not in content:
                content = content.replace(
                    '</style>', 
                    '.challenge-box { background: #fffbeb; border: 1px solid #fde68a; border-radius: 12px; padding: 16px; margin-bottom: 24px; }\n</style>'
                )
                content = content.replace(
                    '      }',
                    '      .challenge-box { background: rgba(245, 158, 11, 0.1); border-color: rgba(245, 158, 11, 0.2); }\n      }'
                )

        with open(index_path, 'w', encoding='utf-8') as f:
            f.write(content)

print("Fixed players list and question numbers!")
