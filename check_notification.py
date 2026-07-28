import os
import re

filepath = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\notification.html"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Let's count hardcoded colors
print(len(re.findall(r'#f0f2f5', content)))
print(len(re.findall(r'#1a202c', content)))
print(len(re.findall(r'#ffffff', content)))
print(len(re.findall(r'#64748b', content)))
