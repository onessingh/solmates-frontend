import re

with open(r"c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\platform-guide.html", "r", encoding="utf-8") as f:
    content = f.read()

# Replace /ai-chatbot with /?action=chat
content = content.replace('href="/ai-chatbot"', 'href="/?action=chat"')

with open(r"c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\platform-guide.html", "w", encoding="utf-8") as f:
    f.write(content)

print("Updated AI Chatbot link in platform-guide.html.")
