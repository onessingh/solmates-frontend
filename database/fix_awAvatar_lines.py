import re
import os

path = r'c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database\awareness.html'
with open(path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    if 'document.querySelector(\'input[name="awAvatar"]' in line and 'checked = true;' in line:
        new_lines.append('    document.querySelector(\'input[name="awAvatar"][value="🤡"]\').checked = true;\n')
    elif 'var avatar = avatarInput ? avatarInput.value :' in line:
        new_lines.append('    var avatar = avatarInput ? avatarInput.value : \'🤡\';\n')
    else:
        new_lines.append(line)

with open(path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("Fixed JS avatar lines completely!")
