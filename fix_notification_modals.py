import os
import re

filepath = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\notification.html"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Fix "Subscribe to every update" label
old_label = 'style="display: flex; align-items: center; gap: 12px; background: #f8fafc; padding: 14px 18px; border-radius: 14px; cursor: pointer; border: 1px solid #e2e8f0; transition: all 0.2s;"'
new_label = 'class="all-sem-label" style="display: flex; align-items: center; gap: 12px; padding: 14px 18px; border-radius: 14px; cursor: pointer; transition: all 0.2s;"'
content = content.replace(old_label, new_label)

# 2. Fix Add Notification form inputs and buttons (inject CSS)
light_css = """
      .all-sem-label {
        background: #f8fafc;
        border: 1px solid #e2e8f0;
      }
      #modalTypePicker {
        background: #f5f5f7 !important;
      }
      /* End of Light Additions */
"""

dark_css = """
            .all-sem-label {
              background: var(--bg-card-hover) !important;
              border-color: var(--border-color) !important;
            }
            #modalTypePicker {
              background: var(--bg-card) !important;
            }
            .type-btn {
              background: var(--bg-card) !important;
              color: var(--text-main) !important;
              border-color: var(--border-color) !important;
            }
            .type-btn.active {
              background: var(--bg-card-hover) !important;
              border-color: var(--brand-primary) !important;
            }
            #addNoticeForm input, #addNoticeForm select, #addNoticeForm textarea {
              background: var(--bg-card) !important;
              color: var(--text-main) !important;
              border-color: var(--border-color) !important;
            }
"""

parts = content.split('</style>')
for i, part in enumerate(parts):
    if '@media (prefers-color-scheme: dark)' in part:
        # Add light CSS right before the media query starts
        mq_idx = part.find('@media (prefers-color-scheme: dark)')
        part = part[:mq_idx] + light_css + part[mq_idx:]
        
        # Add dark CSS inside the media query
        last_brace_idx = part.rfind('}')
        if last_brace_idx != -1:
            part = part[:last_brace_idx] + dark_css + part[last_brace_idx:]
        parts[i] = part

new_content = '</style>'.join(parts)

# Fix #modalTypePicker inline style to remove background:#f5f5f7 so CSS can take over cleanly
new_content = new_content.replace('background:#f5f5f7;', '')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(new_content)
print("Fixed notification modal UI")
