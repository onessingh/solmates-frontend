import re

with open(r"c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\sw.js", "r", encoding="utf-8") as f:
    content = f.read()

smart_routing = """
    // Smart Routing: Auto-detect the category from the notification title or body
    if (targetUrl === '/notification' || targetUrl === '/') {
        const textToSearch = (title + " " + body).toLowerCase();
        if (textToSearch.includes('pyq') || textToSearch.includes('previous year') || textToSearch.includes('question paper')) {
            targetUrl = '/database/pyqs';
        } else if (textToSearch.includes('one shot') || textToSearch.includes('oneshot')) {
            targetUrl = '/database/oneshot';
        } else if (textToSearch.includes('note')) {
            targetUrl = '/database/notes';
        } else if (textToSearch.includes('live class') || textToSearch.includes('live session')) {
            targetUrl = '/database/classes';
        } else if (textToSearch.includes('recorded')) {
            targetUrl = '/database/view?category=recorded-class';
        } else if (textToSearch.includes('e-book') || textToSearch.includes('ebook') || textToSearch.includes('e book')) {
            targetUrl = '/database/view?category=elearning';
        } else if (textToSearch.includes('youtube') || textToSearch.includes('video')) {
            targetUrl = '/database/youtube-browse';
        }
    }
    
    const options = {"""

content = content.replace("const options = {", smart_routing)
content = content.replace("solmates-cache-v705", "solmates-cache-v706")

with open(r"c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\sw.js", "w", encoding="utf-8") as f:
    f.write(content)

print("Injected smart routing logic into sw.js.")
