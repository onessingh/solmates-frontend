import re

html_path = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\index.html"
with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Extract dark mode media query
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
        
        # Replace original
        html = html[:start_idx] + "/* dark mode moved to separate style tag */" + html[end_idx+1:]
        
        # Insert theme-dark-style
        style_close_idx = html.find('</style>')
        if style_close_idx != -1:
            new_style_block = f'''
</style>
<style id="theme-dark-style" media="(prefers-color-scheme: dark)">
{dark_mode_content}
</style>
<style>
'''
            html = html[:style_close_idx] + new_style_block + html[style_close_idx+8:]

# 2. Add Anti-Flash Script
head_idx = html.find('<head>')
if head_idx != -1:
    anti_flash = '''
  <script>
    (function() {
      const savedTheme = localStorage.getItem('solmates_theme');
      if (savedTheme) {
        // We can't rely on getElementById yet since body is not parsed,
        // but we can write a tiny style tag to force it, or just use document.write
        // Wait, since theme-dark-style is in the head, we CAN get it if it's placed before this script.
        // Actually, we'll place this script AFTER the styles.
      }
    })();
  </script>
'''
    # We will just insert it before </head>
    head_close_idx = html.find('</head>')
    
    anti_flash_script = '''
  <script>
    (function() {
      const savedTheme = localStorage.getItem('solmates_theme');
      if (savedTheme) {
        const darkStyle = document.getElementById('theme-dark-style');
        if (darkStyle) {
          if (savedTheme === 'dark') {
            darkStyle.media = 'all';
          } else if (savedTheme === 'light') {
            darkStyle.media = 'not all';
          }
        }
      }
    })();
  </script>
'''
    html = html[:head_close_idx] + anti_flash_script + html[head_close_idx:]

# 3. Add Theme Toggle Button
btn_html = '''
        <button class="theme-toggle-btn" id="themeToggleBtn" onclick="toggleTheme()" title="Toggle Theme">
          <i class="fas fa-moon" id="themeToggleIcon"></i>
        </button>
'''
nav_idx = html.find('<div class="notification-btn"')
if nav_idx != -1:
    html = html[:nav_idx] + btn_html + html[nav_idx:]

# 4. Add CSS for Button
btn_css = '''
      .theme-toggle-btn {
        background: rgba(15, 43, 70, 0.05);
        color: var(--brand-primary);
        border: none;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s;
        margin-right: 12px;
        font-size: 0.95rem;
      }
      .theme-toggle-btn:hover {
        background: rgba(15, 43, 70, 0.1);
        transform: translateY(-1px);
        color: #0071e3;
      }
'''
style_end = html.find('</style>')
if style_end != -1:
    html = html[:style_end] + btn_css + html[style_end:]

# 5. Add JS logic
js_logic = '''
    // Theme Toggle Logic
    function toggleTheme() {
      const darkStyle = document.getElementById('theme-dark-style');
      if (!darkStyle) return;
      
      let isDarkCurrently;
      const currentMedia = darkStyle.media;
      
      if (currentMedia === 'all') {
        isDarkCurrently = true;
      } else if (currentMedia === 'not all') {
        isDarkCurrently = false;
      } else {
        isDarkCurrently = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      
      const newTheme = isDarkCurrently ? 'light' : 'dark';
      darkStyle.media = newTheme === 'dark' ? 'all' : 'not all';
      localStorage.setItem('solmates_theme', newTheme);
      updateThemeIcon(newTheme);
    }
    
    function updateThemeIcon(theme) {
      const icon = document.getElementById('themeToggleIcon');
      if (!icon) return;
      
      if (theme === 'dark') {
        icon.className = 'fas fa-sun';
      } else if (theme === 'light') {
        icon.className = 'fas fa-moon';
      } else {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
      }
    }
    
    // Initialize icon on load
    document.addEventListener('DOMContentLoaded', () => {
      const saved = localStorage.getItem('solmates_theme');
      updateThemeIcon(saved);
      
      // Listen for OS theme changes if not overridden
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('solmates_theme')) {
          updateThemeIcon(null);
        }
      });
    });
'''
script_end = html.rfind('</script>')
if script_end != -1:
    html = html[:script_end] + js_logic + html[script_end:]

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)
print("Applied Theme Toggle modifications!")
