import os

def fix_index_dark_mode():
    filepath = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\index.html"
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    dark_overrides = """
          /* Chat Message UI Fixes for Dark Mode */
          .chat-message .content {
            background: var(--bg-card) !important;
            color: var(--text-main) !important;
            border-color: var(--border-color) !important;
          }
          .user-message .content {
            background: #0071e3 !important;
            color: white !important;
            border-color: #0071e3 !important;
          }
          .msg-action-btn {
            background: var(--bg-card-hover) !important;
            color: var(--text-main) !important;
            border-color: var(--border-color) !important;
          }
          .msg-action-btn:hover {
            background: var(--bg-card) !important;
            color: #0071e3 !important;
          }
          .quiz-trigger {
            background: var(--bg-card-hover) !important;
            color: var(--text-main) !important;
            border-color: var(--border-color) !important;
          }
          .quiz-trigger:hover {
            background: var(--bg-card) !important;
          }
"""
    
    parts = content.split('</style>')
    if len(parts) > 1 and '.chat-message .content {' not in parts[0].split('@media (prefers-color-scheme: dark)')[-1]:
        last_brace_idx = parts[0].rfind('}')
        if last_brace_idx != -1:
            new_style_content = parts[0][:last_brace_idx] + dark_overrides + parts[0][last_brace_idx:]
            content = new_style_content + '</style>' + parts[1]

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Fixed index.html")

def fix_notification_dark_mode():
    filepath = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\notification.html"
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    dark_overrides = """
          .view-btn {
            background: var(--bg-card-hover) !important;
            color: var(--text-main) !important;
          }
          .view-btn.join-btn {
            background: linear-gradient(135deg, #28C76F 0%, #0396FF 100%) !important;
            color: white !important;
          }
"""
    
    parts = content.split('</style>')
    for i, part in enumerate(parts):
        if '@media (prefers-color-scheme: dark)' in part and '.view-btn {' not in part.split('@media (prefers-color-scheme: dark)')[-1]:
            last_brace_idx = part.rfind('}')
            if last_brace_idx != -1:
                parts[i] = part[:last_brace_idx] + dark_overrides + part[last_brace_idx:]
    
    new_content = '</style>'.join(parts)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Fixed notification.html")

fix_index_dark_mode()
fix_notification_dark_mode()
