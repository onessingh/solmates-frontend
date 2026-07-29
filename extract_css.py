import re

html_path = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\index.html"
with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

start_str = "@media (prefers-color-scheme: dark) {"
start_idx = html.find(start_str)

if start_idx != -1:
    content_start = start_idx + len(start_str)
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
        dark_mode_content = html[content_start:end_idx]
        
        # We replace the original media query with a closed empty one (or just remove it)
        # and create a new style tag
        new_html = html[:start_idx] + "/* original media query moved */" + html[end_idx+1:]
        
        # insert the new style tag right after the main <style> tag closes
        style_close_idx = new_html.find('</style>', start_idx)
        if style_close_idx != -1:
            new_style_block = f'''
</style>
<style id="theme-dark-style" media="(prefers-color-scheme: dark)">
{dark_mode_content}
</style>
<style>
'''
            new_html = new_html[:style_close_idx] + new_style_block + new_html[style_close_idx+8:]
            
        with open("C:\\Users\\Toshiba\\OneDrive\\Desktop\\solmates\\frontend\\refactor_test.html", "w", encoding='utf-8') as f:
            f.write(new_html)
        print("Successfully extracted media query!")
    else:
        print("Could not find end brace")
else:
    print("Could not find start str")
