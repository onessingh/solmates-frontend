import os
import re

base_dir = r'c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend'
journey_path = os.path.join(base_dir, 'journey', 'index.html')

with open(journey_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Helper function to generate social icons
def make_socials(insta=None, snap=None):
    html = '<div class="member-socials" style="margin-top: 15px; display: flex; gap: 12px; font-size: 18px; padding-top: 15px; border-top: 1px solid rgba(0,0,0,0.05);">'
    if insta:
        html += f'\n<a href="{insta}" target="_blank" style="color: #E1306C; transition: transform 0.2s;" onmouseover="this.style.transform=\'scale(1.1)\'" onmouseout="this.style.transform=\'scale(1)\'"><i class="fab fa-instagram"></i></a>'
    if snap:
        html += f'\n<a href="{snap}" target="_blank" style="color: #FFFC00; text-shadow: 0 0 1px #000; transition: transform 0.2s;" onmouseover="this.style.transform=\'scale(1.1)\'" onmouseout="this.style.transform=\'scale(1)\'"><i class="fab fa-snapchat-ghost"></i></a>'
    html += '\n</div>'
    return html

# 1. Shivarn Singh: Make image clickable to portfolio
shivarn_pattern = re.compile(r'(<div class="member-content-wrapper"[^>]*>)\s*(<div class="member-image">.*?<div class="image-fallback" id="fallback-4">Shivarn Singh</div>\s*</div>)', re.DOTALL)
if shivarn_pattern.search(content):
    content = shivarn_pattern.sub(r'\1\n<a href="https://shivarnsingh-portfolio.vercel.app/" target="_blank" style="display:block;">\2</a>', content)
    print("Updated Shivarn")

# 2. Parth Nayyar
parth_pattern = re.compile(r'(<a href="([^"]*linkedin[^"]*)" target="_blank" class="member-link">)\s*(<div class="member-image">.*?<div class="image-fallback" id="fallback-2">Parth Nayyar</div>\s*</div>)\s*(<div class="member-info">.*?</div>)\s*</a>', re.DOTALL)
parth_match = parth_pattern.search(content)
if parth_match:
    linkedin_url = parth_match.group(2)
    img_block = parth_match.group(3)
    info_block = parth_match.group(4)
    socials = make_socials(insta="https://www.instagram.com/parth.nayyar?stkn=MWl1a3k4cW9kb2dsZQ==", snap="https://www.snapchat.com/add/parth_nayyar20?share_id=Yjb7ZKlyJLQ&locale=en-IN")
    info_block = info_block.replace('</div>', f'{socials}\n</div>', 1) # Insert before last closing div
    info_block = re.sub(r'</div>\s*$', f'{socials}\n</div>', info_block) # more reliable
    
    new_card = f'<div class="member-content-wrapper" style="display: block; text-decoration: none; color: inherit;">\n<a href="{linkedin_url}" target="_blank" style="display:block;">{img_block}</a>\n{info_block}\n</div>'
    content = content[:parth_match.start()] + new_card + content[parth_match.end():]
    print("Updated Parth")

# 3. Prince Gothwal
prince_pattern = re.compile(r'(<a href="([^"]*linkedin[^"]*)" target="_blank" class="member-link">)\s*(<div class="member-image">.*?<div class="image-fallback" id="fallback-6">Prince Gothwal</div>\s*</div>)\s*(<div class="member-info">.*?</div>)\s*</a>', re.DOTALL)
prince_match = prince_pattern.search(content)
if prince_match:
    linkedin_url = prince_match.group(2)
    img_block = prince_match.group(3)
    info_block = prince_match.group(4)
    socials = make_socials(insta="https://www.instagram.com/gothwalprnce?stkn=OWMwY3Nya2hydXA1", snap="https://www.snapchat.com/add/gothwalprince?share_id=FyxfPKgBE-Y&locale=en-IN")
    info_block = re.sub(r'</div>\s*$', f'{socials}\n</div>', info_block)
    
    new_card = f'<div class="member-content-wrapper" style="display: block; text-decoration: none; color: inherit;">\n<a href="{linkedin_url}" target="_blank" style="display:block;">{img_block}</a>\n{info_block}\n</div>'
    content = content[:prince_match.start()] + new_card + content[prince_match.end():]
    print("Updated Prince")

# 4. Parvesh Raj
parvesh_pattern = re.compile(r'(<a href="([^"]*linkedin[^"]*)" target="_blank" class="member-link">)\s*(<div class="member-image">.*?<div class="image-fallback" id="fallback-8">Parvesh Raj</div>\s*</div>)\s*(<div class="member-info">.*?</div>)\s*</a>', re.DOTALL)
parvesh_match = parvesh_pattern.search(content)
if parvesh_match:
    linkedin_url = parvesh_match.group(2)
    img_block = parvesh_match.group(3)
    info_block = parvesh_match.group(4)
    socials = make_socials(insta="https://www.instagram.com/parvesh_rajput_077?stkn=c2l5bGkxZXRld2Fu", snap="https://www.snapchat.com/add/parvesh_raj07?share_id=oZ9Iv1uvbnc&locale=en-IN")
    info_block = re.sub(r'</div>\s*$', f'{socials}\n</div>', info_block)
    
    new_card = f'<div class="member-content-wrapper" style="display: block; text-decoration: none; color: inherit;">\n<a href="{linkedin_url}" target="_blank" style="display:block;">{img_block}</a>\n{info_block}\n</div>'
    content = content[:parvesh_match.start()] + new_card + content[parvesh_match.end():]
    print("Updated Parvesh")

# 5. Vikas Bal
vikas_pattern = re.compile(r'(<div class="member-image">.*?<div class="image-fallback" id="fallback-1">Vikas Bal</div>\s*</div>)\s*(<div class="member-info">.*?</div>)', re.DOTALL)
vikas_match = vikas_pattern.search(content)
if vikas_match:
    img_block = vikas_match.group(1)
    info_block = vikas_match.group(2)
    socials = make_socials(insta="https://www.instagram.com/viki2021?stkn=M2d5N2x3NHJubTlx")
    info_block = re.sub(r'</div>\s*$', f'{socials}\n</div>', info_block)
    
    new_card = f'<div class="member-content-wrapper" style="display: block; text-decoration: none; color: inherit;">\n{img_block}\n{info_block}\n</div>'
    content = content[:vikas_match.start()] + new_card + content[vikas_match.end():]
    print("Updated Vikas")

with open(journey_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Changes saved!")
