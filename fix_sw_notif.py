import re

with open(r"c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\sw.js", "r", encoding="utf-8") as f:
    content = f.read()

# Replace targetUrl = '/' with targetUrl = '/notification'
content = content.replace("let targetUrl = '/';", "let targetUrl = '/notification';")

# Replace targetUrl fallback in notificationclick
content = re.sub(r'const targetUrl = \(event\.notification\.data && event\.notification\.data\.url\) \? event\.notification\.data\.url : \'\/\';', r"const targetUrl = (event.notification.data && event.notification.data.url) ? event.notification.data.url : '/notification';", content)

# Also update the cache name
content = re.sub(r'solmates-cache-v704', 'solmates-cache-v705', content)

with open(r"c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\sw.js", "w", encoding="utf-8") as f:
    f.write(content)

print("Updated sw.js to route to /notification by default.")
