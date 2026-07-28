import os
import re

def fix_index_dark_mode():
    filepath = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\index.html"
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    dark_overrides = """
          /* Premium Search Bar overrides */
          .premium-search-bar {
            background: var(--bg-card) !important;
            border-color: var(--border-color) !important;
            color: var(--text-main) !important;
          }
          .premium-search-bar::placeholder {
            color: var(--text-muted) !important;
          }
          
          /* Chat Input overrides */
          .chat-input {
            background: var(--bg-card) !important;
            border-color: var(--border-color) !important;
            color: var(--text-main) !important;
          }
          .chat-input::placeholder {
            color: var(--text-muted) !important;
          }
          
          /* Suggestion Tag overrides */
          .suggestion-tag {
            background: var(--bg-card) !important;
            border-color: var(--border-color) !important;
            color: var(--text-main) !important;
          }
          .suggestion-tag:hover {
            background: var(--bg-card-hover) !important;
          }
"""
    
    parts = content.split('</style>')
    if len(parts) > 1 and '.premium-search-bar {' not in parts[0].split('@media (prefers-color-scheme: dark)')[-1]:
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
          body {
            background: var(--bg-body) !important;
            color: var(--text-main) !important;
            background-image: none !important;
          }
          .top-nav {
            background: var(--bg-nav) !important;
            border-bottom-color: var(--border-color) !important;
          }
          .notification-card {
            background: var(--bg-card) !important;
            box-shadow: none !important;
            border: 1px solid var(--border-color) !important;
          }
          .header h1 {
            color: var(--text-main) !important;
          }
          .header p {
            color: var(--text-muted) !important;
          }
          .tab-btn {
            background: var(--bg-card) !important;
            color: var(--text-muted) !important;
          }
          .tab-btn.active {
            background: var(--brand-primary) !important;
            color: var(--bg-body) !important;
          }
          .content-box div {
            color: var(--text-main);
          }
          .empty-state h3 {
            color: var(--text-main) !important;
          }
          .empty-state p {
            color: var(--text-muted) !important;
          }
          .card-btn {
            background: var(--bg-card-hover) !important;
            color: var(--text-main) !important;
          }
          .modal-content, .admin-modal-content {
            background: var(--bg-card) !important;
            color: var(--text-main) !important;
          }
"""
    # Wait, the content box has inline style color #64748b for date/time.
    content = content.replace('color: #64748b;', 'color: var(--text-muted);')
    content = content.replace('color: #1a202c;', 'color: var(--text-main);')
    
    parts = content.split('</style>')
    # notification.html might have two </style> tags. We want the one containing @media (prefers-color-scheme: dark)
    for i, part in enumerate(parts):
        if '@media (prefers-color-scheme: dark)' in part and 'body {' not in part.split('@media (prefers-color-scheme: dark)')[-1]:
            last_brace_idx = part.rfind('}')
            if last_brace_idx != -1:
                parts[i] = part[:last_brace_idx] + dark_overrides + part[last_brace_idx:]
    
    new_content = '</style>'.join(parts)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Fixed notification.html")

fix_index_dark_mode()
fix_notification_dark_mode()
