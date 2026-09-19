import os
import re

base_dir = r'c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend'
journey_path = os.path.join(base_dir, 'journey', 'index.html')

with open(journey_path, 'r', encoding='utf-8') as f:
    content = f.read()

shivarn_card_regex = r'(<!-- Team Member 4 - Shivarn Singh \(Web Development Lead\) -->\s*<div class="team-member-card">)\s*<a href="https://shivarnsingh-portfolio\.vercel\.app/" target="_blank" class="member-link">\s*(<div class="member-image">.*?</div>\s*<div class="member-info">\s*<div class="member-name">Shivarn Singh</div>\s*<div class="member-role">Technical Lead</div>\s*<div class="member-bio">.*?</div>)\s*(</div>)\s*</a>\s*(</div>)'

def replacer(match):
    prefix = match.group(1)
    inner_content = match.group(2)
    end_info = match.group(3)
    end_card = match.group(4)
    
    socials_html = '''
                  <div class="member-socials" style="margin-top: 15px; display: flex; gap: 12px; font-size: 18px; padding-top: 15px; border-top: 1px solid rgba(0,0,0,0.05);">
                    <a href="https://www.linkedin.com/in/onessingh" target="_blank" style="color: #0a66c2; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'"><i class="fab fa-linkedin"></i></a>
                    <a href="https://www.instagram.com/__s.singh._/" target="_blank" style="color: #E1306C; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'"><i class="fab fa-instagram"></i></a>
                    <a href="https://www.facebook.com/shivarnsingh.raj" target="_blank" style="color: #1877F2; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'"><i class="fab fa-facebook"></i></a>
                    <a href="https://www.snapchat.com/add/one_ssingh" target="_blank" style="color: #FFFC00; text-shadow: 0 0 1px #000; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'"><i class="fab fa-snapchat-ghost"></i></a>
                    <a href="https://x.com/one_ssingh" target="_blank" style="color: #000000; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'"><i class="fab fa-twitter"></i></a>
                    <a href="https://t.me/one_ssingh" target="_blank" style="color: #0088cc; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'"><i class="fab fa-telegram-plane"></i></a>
                    <a href="https://shivarnsingh-portfolio.vercel.app/" target="_blank" style="color: #c0962d; margin-left: auto; font-size: 14px; font-weight: 600; text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='#0f2b46'" onmouseout="this.style.color='#c0962d'">Portfolio <i class="fas fa-arrow-right" style="font-size: 12px; margin-left: 3px;"></i></a>
                  </div>
'''
    return f"{prefix}\n              <div class=\"member-content-wrapper\" style=\"display: block; text-decoration: none; color: inherit;\">\n                {inner_content}{socials_html}\n              {end_info}\n              </div>\n            {end_card}"

new_content = re.sub(shivarn_card_regex, replacer, content, flags=re.DOTALL)

if new_content != content:
    with open(journey_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Successfully updated Shivarn's card with social links!")
else:
    print("Regex failed to match Shivarn's card.")
