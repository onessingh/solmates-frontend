import os
import re
from bs4 import BeautifulSoup

base_dir = r'c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend'
journey_path = os.path.join(base_dir, 'journey', 'index.html')

with open(journey_path, 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

cards = soup.find_all('div', class_='team-member-card')
for card in cards:
    name_el = card.find('div', class_='member-name')
    if not name_el: continue
    name = name_el.text.strip()

    if name == 'Shivarn Singh':
        # Remove the arrow from the portfolio link
        socials = card.find('div', class_='member-socials')
        if socials:
            portfolio_a = socials.find('a', string=re.compile('Portfolio', re.IGNORECASE))
            if not portfolio_a:
                # In case string match doesn't work because of child elements
                for a_tag in socials.find_all('a'):
                    if 'Portfolio' in a_tag.text:
                        portfolio_a = a_tag
                        break
            if portfolio_a:
                arrow = portfolio_a.find('i', class_='fa-arrow-right')
                if arrow:
                    arrow.extract()
                    # Also strip trailing spaces if any
                    portfolio_a.string = 'Portfolio'
                    
    elif name in ['Parth Nayyar', 'Prince Gothwal', 'Parvesh Raj']:
        # Extract LinkedIn URL from the image onclick attribute
        img_div = card.find('div', class_='member-image')
        if img_div and 'onclick' in img_div.attrs:
            onclick_str = img_div['onclick']
            # e.g. window.open('https://...', '_blank')
            match = re.search(r"window\.open\('([^']+)'", onclick_str)
            if match:
                linkedin_url = match.group(1)
                if 'linkedin.com' in linkedin_url:
                    socials = card.find('div', class_='member-socials')
                    if socials:
                        # Check if linkedin is already there
                        if not socials.find('i', class_='fa-linkedin'):
                            linkedin_html = f'<a href="{linkedin_url}" target="_blank" style="color: #0a66c2; transition: transform 0.2s;" onmouseover="this.style.transform=\'scale(1.1)\'" onmouseout="this.style.transform=\'scale(1)\'"><i class="fab fa-linkedin"></i></a>'
                            linkedin_soup = BeautifulSoup(linkedin_html, 'html.parser')
                            socials.insert(0, linkedin_soup.a)

with open(journey_path, 'w', encoding='utf-8') as f:
    f.write(str(soup))
print("Successfully added LinkedIn icons and removed the portfolio arrow!")
