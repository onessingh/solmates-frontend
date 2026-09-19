import os
from bs4 import BeautifulSoup

base_dir = r'c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend'
journey_path = os.path.join(base_dir, 'journey', 'index.html')

with open(journey_path, 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

def make_socials(insta=None, snap=None):
    html = '<div class="member-socials" style="margin-top: 15px; display: flex; gap: 12px; font-size: 18px; padding-top: 15px; border-top: 1px solid rgba(0,0,0,0.05);">'
    if insta:
        html += f'\n<a href="{insta}" target="_blank" style="color: #E1306C; transition: transform 0.2s;" onmouseover="this.style.transform=\'scale(1.1)\'" onmouseout="this.style.transform=\'scale(1)\'"><i class="fab fa-instagram"></i></a>'
    if snap:
        html += f'\n<a href="{snap}" target="_blank" style="color: #FFFC00; text-shadow: 0 0 1px #000; transition: transform 0.2s;" onmouseover="this.style.transform=\'scale(1.1)\'" onmouseout="this.style.transform=\'scale(1)\'"><i class="fab fa-snapchat-ghost"></i></a>'
    html += '\n</div>'
    return BeautifulSoup(html, 'html.parser')

cards = soup.find_all('div', class_='team-member-card')
for card in cards:
    name_el = card.find('div', class_='member-name')
    if not name_el: continue
    name = name_el.text.strip()
    
    if name == 'Shivarn Singh':
        # Shivarn is already processed in f332b5df except the onclick vs <a> wrapper.
        # Wait, in f332b5df, his image has NO link at all!
        # Because in the very first regex, I completely removed the <a href="portfolio"> tag and replaced it with just <div class="member-content-wrapper"> !
        # Let's add the onclick handler to his .member-image !
        img_div = card.find('div', class_='member-image')
        if img_div:
            img_div['onclick'] = "window.open('https://shivarnsingh-portfolio.vercel.app/', '_blank')"
            img_div['style'] = "cursor: pointer;"
        
    elif name == 'Parth Nayyar':
        # Find the wrapping <a> tag
        link_tag = card.find('a', class_='member-link')
        if link_tag:
            href = link_tag['href']
            # Remove the <a> tag but keep its children
            wrapper = soup.new_tag('div', attrs={'class': 'member-content-wrapper', 'style': 'display: block; text-decoration: none; color: inherit;'})
            
            # Move children from link_tag to wrapper
            for child in list(link_tag.children):
                wrapper.append(child)
            
            link_tag.replace_with(wrapper)
            
            # Now add onclick to the image
            img_div = wrapper.find('div', class_='member-image')
            if img_div:
                img_div['onclick'] = f"window.open('{href}', '_blank')"
                img_div['style'] = "cursor: pointer;"
                
            # Add socials
            info_div = wrapper.find('div', class_='member-info')
            if info_div:
                info_div.append(make_socials(insta="https://www.instagram.com/parth.nayyar?stkn=MWl1a3k4cW9kb2dsZQ==", snap="https://www.snapchat.com/add/parth_nayyar20?share_id=Yjb7ZKlyJLQ&locale=en-IN"))

    elif name == 'Prince Gothwal':
        link_tag = card.find('a', class_='member-link')
        if link_tag:
            href = link_tag['href']
            wrapper = soup.new_tag('div', attrs={'class': 'member-content-wrapper', 'style': 'display: block; text-decoration: none; color: inherit;'})
            for child in list(link_tag.children):
                wrapper.append(child)
            link_tag.replace_with(wrapper)
            
            img_div = wrapper.find('div', class_='member-image')
            if img_div:
                img_div['onclick'] = f"window.open('{href}', '_blank')"
                img_div['style'] = "cursor: pointer;"
                
            info_div = wrapper.find('div', class_='member-info')
            if info_div:
                info_div.append(make_socials(insta="https://www.instagram.com/gothwalprnce?stkn=OWMwY3Nya2hydXA1", snap="https://www.snapchat.com/add/gothwalprince?share_id=FyxfPKgBE-Y&locale=en-IN"))

    elif name == 'Parvesh Raj':
        link_tag = card.find('a', class_='member-link')
        if link_tag:
            href = link_tag['href']
            wrapper = soup.new_tag('div', attrs={'class': 'member-content-wrapper', 'style': 'display: block; text-decoration: none; color: inherit;'})
            for child in list(link_tag.children):
                wrapper.append(child)
            link_tag.replace_with(wrapper)
            
            img_div = wrapper.find('div', class_='member-image')
            if img_div:
                img_div['onclick'] = f"window.open('{href}', '_blank')"
                img_div['style'] = "cursor: pointer;"
                
            info_div = wrapper.find('div', class_='member-info')
            if info_div:
                info_div.append(make_socials(insta="https://www.instagram.com/parvesh_rajput_077?stkn=c2l5bGkxZXRld2Fu", snap="https://www.snapchat.com/add/parvesh_raj07?share_id=oZ9Iv1uvbnc&locale=en-IN"))

    elif name == 'Vikas Bal':
        # No <a> tag originally.
        # Just wrap everything in member-content-wrapper (or just leave it and append socials)
        # Actually, let's just append socials to his member-info!
        info_div = card.find('div', class_='member-info')
        if info_div:
            info_div.append(make_socials(insta="https://www.instagram.com/viki2021?stkn=M2d5N2x3NHJubTlx"))
            
        # Add wrapper just for consistency
        img_div = card.find('div', class_='member-image')
        if img_div and info_div:
            wrapper = soup.new_tag('div', attrs={'class': 'member-content-wrapper', 'style': 'display: block; text-decoration: none; color: inherit;'})
            # We must be careful not to detach them while iterating. 
            # Better way: replace img_div and info_div with wrapper, then append them to wrapper.
            img_div.wrap(wrapper)
            wrapper.append(info_div)

# Write out using pretty HTML? No, we don't want to destroy the formatting.
# Unfortunately bs4 can sometimes mess up formatting, but we use it carefully.
# Since bs4 alters the whole file formatting, let's just write it.
with open(journey_path, 'w', encoding='utf-8') as f:
    f.write(str(soup))
print("DOM successfully updated with beautifulsoup!")
