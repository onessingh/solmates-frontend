import re
import os

path = r'c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\notification.html'
with open(path, 'r', encoding='utf-8') as f:
    c = f.read()

# Remove cache buster
c = c.replace('/sol/notifications/all?_t=${Date.now()}`', '/sol/notifications/all`')
# Change 60s polling to 5 minutes (300000ms)
c = c.replace('setInterval(() => { fetchNotifications(currentSemester); }, 60000);', 'setInterval(() => { fetchNotifications(currentSemester); }, 300000);')
# Change ALL_FETCH_COOLDOWN to 60000 so manual refreshes can happen every 1 min
c = c.replace('ALL_FETCH_COOLDOWN = 5000;', 'ALL_FETCH_COOLDOWN = 60000;')

with open(path, 'w', encoding='utf-8') as f:
    f.write(c)

print('Fixed frontend notification polling!')
