import re

with open(r"c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\platform-guide.html", "r", encoding="utf-8") as f:
    content = f.read()

fixes = {
    # Replace Live Classes URL
    r'<a href="/database" class="guide-item-card"([^>]*)>\s*<h3>Live Classes<\/h3>': r'<a href="/database/classes" class="guide-item-card"\1>\n          <h3>Live Classes</h3>',
    r'<a href="/database" class="guide-item-card"([^>]*)>\s*<h3>Recorded Classes<\/h3>': r'<a href="/database/view?category=recorded-class" class="guide-item-card"\1>\n          <h3>Recorded Classes</h3>',
    r'<a href="/database" class="guide-item-card"([^>]*)>\s*<h3>Notes<\/h3>': r'<a href="/database/notes" class="guide-item-card"\1>\n          <h3>Notes</h3>',
    r'<a href="/database" class="guide-item-card"([^>]*)>\s*<h3>PYQs<\/h3>': r'<a href="/database/pyqs" class="guide-item-card"\1>\n          <h3>PYQs</h3>',
    r'<a href="/database" class="guide-item-card"([^>]*)>\s*<h3>One Shot Notes<\/h3>': r'<a href="/database/oneshot" class="guide-item-card"\1>\n          <h3>One Shot Notes</h3>',
    r'<a href="/database" class="guide-item-card"([^>]*)>\s*<h3>E-Books<\/h3>': r'<a href="/database/view?category=elearning" class="guide-item-card"\1>\n          <h3>E-Books</h3>',
    r'<a href="/database" class="guide-item-card"([^>]*)>\s*<h3>YouTube Videos<\/h3>': r'<a href="/database/youtube-browse" class="guide-item-card"\1>\n          <h3>YouTube Videos</h3>',
    r'<a href="/database" class="guide-item-card"([^>]*)>\s*<h3>Class Materials<\/h3>': r'<a href="/database/professor" class="guide-item-card"\1>\n          <h3>Class Materials</h3>',
    
    r'<a href="/" class="guide-item-card"([^>]*)>\s*<h3>Notifications Page<\/h3>': r'<a href="/notification" class="guide-item-card"\1>\n          <h3>Notifications Page</h3>',
    r'<a href="/" class="guide-item-card"([^>]*)>\s*<h3>AI Chatbot<\/h3>': r'<a href="/ai-chatbot" class="guide-item-card"\1>\n          <h3>AI Chatbot</h3>',
}

for pattern, replacement in fixes.items():
    content = re.sub(pattern, replacement, content)

with open(r"c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\platform-guide.html", "w", encoding="utf-8") as f:
    f.write(content)

print("Fixed incorrect links.")
