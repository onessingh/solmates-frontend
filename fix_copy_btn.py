import os
import re

games_dir = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\games"
game_folders = ["quiz-battle", "rapid-fire", "case-study-arena", "shark-pitch", "market-mavericks"]

old_btn = '<button onclick="copyInviteLink()" class="btn-secondary p-2 ml-4"><i data-lucide="copy" class="w-5 h-5"></i></button>'
new_btn = '<button onclick="copyInviteLink()" class="p-2 ml-4 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100 border border-slate-300 dark:border-slate-600 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"><i data-lucide="copy" class="w-5 h-5"></i></button>'

for folder in game_folders:
    index_path = os.path.join(games_dir, folder, "index.html")
    if os.path.exists(index_path):
        with open(index_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace the button
        if old_btn in content:
            content = content.replace(old_btn, new_btn)
            with open(index_path, 'w', encoding='utf-8') as f:
                f.write(content)

print("Copy button fixed!")
