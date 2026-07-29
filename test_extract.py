import os
import re

html_path = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\notification.html"
with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Find all @media (prefers-color-scheme: dark) { blocks
start_str = "@media (prefers-color-scheme: dark)"
extracted_css = []

while True:
    match = re.search(r'@media\s*\(\s*prefers-color-scheme:\s*dark\s*\)\s*\{', html)
    if not match:
        break
        
    start_idx = match.start()
    content_start = match.end()
    
    brace_count = 1
    end_idx = -1
    for i in range(content_start, len(html)):
        if html[i] == '{':
            brace_count += 1
        elif html[i] == '}':
            brace_count -= 1
            if brace_count == 0:
                end_idx = i
                break
                
    if end_idx != -1:
        inner_content = html[content_start:end_idx]
        extracted_css.append(inner_content)
        # Remove original block
        html = html[:start_idx] + "/* dark mode moved */" + html[end_idx+1:]
    else:
        break

if extracted_css:
    combined_css = "\n".join(extracted_css)
    # Insert new style tag right before </head>
    new_style = f'\n<style id="solmates-dark-style" media="(prefers-color-scheme: dark)">\n{combined_css}\n</style>\n'
    html = html.replace('</head>', new_style + '</head>')
    
    with open("C:\\Users\\Toshiba\\OneDrive\\Desktop\\solmates\\frontend\\notification_test.html", "w", encoding='utf-8') as f:
        f.write(html)
    print(f"Extracted {len(extracted_css)} dark mode blocks!")
