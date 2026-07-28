import os
import re

filepath = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database\classes\index.html"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix nav-left color to be var(--brand-primary) instead of var(--text-main)
content = content.replace('color: var(--text-main);', 'color: var(--brand-primary);', 1) # Only the first one which is .nav-left

# Fix .database-btn
db_btn_style_old = '''.database-btn {
            background: var(--text-main);
            color: var(--bg-body);'''
db_btn_style_new = '''.database-btn {
            background: #0f2b46;
            color: white;'''
content = content.replace(db_btn_style_old, db_btn_style_new)

# Restore .database-btn:hover
content = content.replace('.database-btn:hover {\n            background: var(--bg-card);', '.database-btn:hover {\n            background: #1a3c5e;')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed classes/index.html header to match standard style")
