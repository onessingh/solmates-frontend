import os

filepath = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\feedback.html"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Make body use variables natively
content = content.replace("background: #fdfdfd;", "background: var(--bg-body, #fdfdfd);")

dark_css = """
        body {
          background: var(--bg-body);
          color: var(--text-main);
        }
        .header h1 {
          color: var(--text-main);
        }
        .header p {
          color: var(--text-muted);
        }
        .input-field, .select-field, .textarea-field {
          background: var(--bg-body);
          color: var(--text-main);
          border-color: var(--border-color);
        }
        .star-rating label {
          color: #334155;
        }
        .rating-label {
          color: var(--text-muted);
        }
        .submit-btn {
          background: #0071e3;
        }
        .submit-btn:hover {
          background: #005bb5;
        }
        .file-input-btn {
          background: rgba(255, 255, 255, 0.05);
          border-color: var(--border-color);
          color: var(--text-muted);
        }
        .direct-mail {
          background: rgba(0, 113, 227, 0.1);
          border-color: rgba(0, 113, 227, 0.2);
          color: var(--text-main);
        }
"""

parts = content.split('</style>')
for i, part in enumerate(parts):
    if '@media (prefers-color-scheme: dark)' in part:
        last_brace_idx = part.rfind('}')
        if last_brace_idx != -1:
            part = part[:last_brace_idx] + dark_css + part[last_brace_idx:]
        parts[i] = part

new_content = '</style>'.join(parts)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(new_content)
print("Fixed feedback dark mode UI")
