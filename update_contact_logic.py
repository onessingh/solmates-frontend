import os

base = r'c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend'
targets = [
    'notification.html',
    'database/pdf-viewer.html',
    'database/video-viewer.html',
    'database/index.html',
    'database/healthcare.html',
    'database/classes/index.html',
    'database/elearning-subjects.html',
    'database/youtube-browse.html',
    'database/youtube-content.html',
    'database/folder-content.html',
    'database/view.html'
]

for t in targets:
    path = os.path.join(base, t.replace('/', os.sep))
    if not os.path.exists(path): continue
    
    with open(path, 'r', encoding='utf-8', errors='replace') as f:
        c = f.read()

    # Labels
    c = c.replace('<label>Phone Number *</label>', '<label>Phone Number <span class="qopt">(or Email)</span></label>')
    c = c.replace('<label>Email Address <span class="qopt">(optional)</span></label>', '<label>Email Address <span class="qopt">(or Phone)</span></label>')

    # JS Validation
    old_val = 'if(!ph||!/^[0-9]{10}$/.test(ph)){alert("Please enter a valid 10-digit phone number.");return;}'
    new_val = 'if(!ph && !gm){alert("Please provide either your Phone Number or Email Address.");return;}if(ph && !/^[0-9]{10}$/.test(ph)){alert("Please enter a valid 10-digit phone number.");return;}'
    c = c.replace(old_val, new_val)

    # Rate Limiting Logic
    old_rl = 'if(!qRL(ph)){alert("You have reached the limit of 3 queries per day. Please try again tomorrow.");return;}'
    new_rl = 'if(!qRL(ph || gm)){alert("You have reached the limit of 3 queries per day. Please try again tomorrow.");return;}'
    c = c.replace(old_rl, new_rl)

    # Telegram message construction
    old_msg = 'var msg="\\u2753 Student Query\\n\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\n\\ud83d\\udc64 "+n+"\\n\\ud83d\\udcf1 "+ph+"\\n\\ud83d\\udce7 "+(gm||"Not provided")'
    new_msg = 'var msg="\\u2753 Student Query\\n\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\n\\ud83d\\udc64 "+n+"\\n\\ud83d\\udcf1 "+(ph||"Not provided")+"\\n\\ud83d\\udce7 "+(gm||"Not provided")'
    c = c.replace(old_msg, new_msg)

    with open(path, 'w', encoding='utf-8', errors='replace') as f:
        f.write(c)
    print("UPDATED:", t)
