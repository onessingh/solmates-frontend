import re

html_path = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\tools\careertest.html"
with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Fix **Mate** text
html = html.replace('**Mate** is crafting unique questions for your profile', 'Mate is crafting unique questions for your profile')

# Replace the previous custom CSS block
html = re.sub(r'<!-- ADDITIONAL DARK MODE FIXES -->.*?<!-- END ADDITIONAL DARK MODE FIXES -->', '', html, flags=re.DOTALL)

custom_css = '''
<!-- ADDITIONAL DARK MODE FIXES -->
<style>
@media (prefers-color-scheme: dark) {
    /* Fix Options Container for Dropdowns */
    .searchable-select .options-container, .searchable-select .dropdown { 
        background: #1e293b !important;
        border-color: #334155 !important;
    }
    .searchable-select .optgroup {
        background: #334155 !important;
        color: #94a3b8 !important;
    }
    .searchable-select .option-item {
        background: #1e293b !important;
        color: #f8fafc !important;
    }
    .searchable-select .option-item:hover, .searchable-select .option-item.selected {
        background: #334155 !important;
    }

    /* Fix Upload Zone */
    .upload-zone {
        background: rgba(15, 23, 42, 0.4) !important;
        border-color: #475569 !important;
    }
    .upload-zone:hover {
        background: rgba(96, 165, 250, 0.1) !important;
        border-color: #60a5fa !important;
    }
    .upload-placeholder i {
        background: transparent !important;
        color: #cbd5e1 !important;
        -webkit-background-clip: initial !important;
        background-clip: initial !important;
        -webkit-text-fill-color: initial !important;
    }

    /* Fix Question & Loading Text */
    .question-text, .loading-title, .review-item .q-num {
        color: #f8fafc !important;
    }
    .loading-sub, .review-item .explanation {
        color: #94a3b8 !important;
    }

    /* Fix Review Item Background */
    .review-item {
        background: #1e293b !important;
        border-color: #334155 !important;
    }
    
    /* Fix Selected Test Option (Question Answers) */
    .option.selected {
        background: #3b82f6 !important;
        border-color: #60a5fa !important;
        color: #ffffff !important;
    }
    
    /* Fix Dual Badge (Experience Select) */
    .dual-badge {
        background: #334155 !important;
        border-color: #475569 !important;
    }
    .dual-badge select {
        background: transparent !important;
        border: none !important;
    }
    
    /* Fix Result Score 1/15 */
    .result-score {
        background: linear-gradient(145deg, #f8fafc, #cbd5e1) !important;
        -webkit-background-clip: text !important;
        background-clip: text !important;
        -webkit-text-fill-color: transparent !important;
    }
}
</style>
<!-- END ADDITIONAL DARK MODE FIXES -->
'''

html = html.replace('</head>', custom_css + '\n</head>')

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)
print("Injected comprehensive dark mode fixes for careertest")
