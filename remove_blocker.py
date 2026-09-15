import os
import glob

files = [
    r"c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database\elearning-subjects.html",
    r"c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database\folder-content.html",
    r"c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database\view.html",
    r"c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database\youtube-browse.html",
    r"c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database\youtube-content.html"
]

for file_path in files:
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    # Comment out the appendChild calls so the blocker never gets attached to the DOM
    content = content.replace("document.documentElement.appendChild(__lockBlockerMba);", "// document.documentElement.appendChild(__lockBlockerMba);")
    content = content.replace("document.documentElement.appendChild(__lockBlockerHc);", "// document.documentElement.appendChild(__lockBlockerHc);")
    
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

print("Removed lock blockers from all 5 files.")
