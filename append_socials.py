import os
from bs4 import BeautifulSoup

base_dir = r'c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend'
journey_path = os.path.join(base_dir, 'journey', 'index.html')

with open(journey_path, 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

def get_fb_icon(url):
    html = f'<a href="{url}" target="_blank" style="color: #1877F2; transition: transform 0.2s;" onmouseover="this.style.transform=\'scale(1.1)\'" onmouseout="this.style.transform=\'scale(1)\'"><i class="fab fa-facebook"></i></a>'
    return BeautifulSoup(html, 'html.parser').a

def get_tg_icon(url):
    html = f'<a href="{url}" target="_blank" style="color: #0088cc; transition: transform 0.2s;" onmouseover="this.style.transform=\'scale(1.1)\'" onmouseout="this.style.transform=\'scale(1)\'"><i class="fab fa-telegram-plane"></i></a>'
    return BeautifulSoup(html, 'html.parser').a

def get_x_icon(url):
    html = f'<a href="{url}" target="_blank" style="color: #000000; transition: transform 0.2s;" onmouseover="this.style.transform=\'scale(1.1)\'" onmouseout="this.style.transform=\'scale(1)\'"><i class="fab fa-twitter"></i></a>'
    return BeautifulSoup(html, 'html.parser').a

cards = soup.find_all('div', class_='team-member-card')
for card in cards:
    name_el = card.find('div', class_='member-name')
    if not name_el: continue
    name = name_el.text.strip()
    socials = card.find('div', class_='member-socials')
    if not socials: continue

    if name == 'Prince Gothwal':
        socials.append(get_fb_icon('https://www.facebook.com/share/1EZcQcBTU4/'))
        socials.append(get_x_icon('https://x.com/gothwalprnce'))
        
    elif name == 'Parth Nayyar':
        socials.append(get_fb_icon('https://www.facebook.com/share/1CGPaWuQnh/'))
        socials.append(get_tg_icon('https://t.me/parthnayyar'))
        
    elif name == 'Vikas Bal':
        socials.append(get_fb_icon('https://www.facebook.com/share/1K5y1G9tmu/'))
        
    elif name == 'Parvesh Raj':
        socials.append(get_tg_icon('https://t.me/Parveshr99'))

with open(journey_path, 'w', encoding='utf-8') as f:
    f.write(str(soup))
print("Successfully appended Facebook, Telegram, and Twitter icons!")
