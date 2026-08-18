import re

with open(r'C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\index.html', 'r', encoding='utf-8') as f:
    content = f.read()

new_arrays = """    const GREETINGS_MORNING = [
      "Good Morning! Aaj kya crack karein? 🎯",
      "Shubh Prabhat! Chalo padhte hain. ☕",
      "Morning! Aaj ka goal kya hai? 📚",
      "Rise and shine! Ready to help. ✨",
      "Hey buddy! Padhai shuru karein? 🚀",
      "Morning! Ready to dominate? 🔥",
      "Start with fresh learning! 📖",
      "Utho aur shuru ho jao! 🏃‍♂️",
      "Naya din, naye challenges! 💪",
      "Good morning boss! Phod dena hai. 💯",
      "Wake up! Kuch naya seekhte hain. 🌅",
      "Breakfast done? Let's study! 🥞",
      "Morning champ! Ready for hustle? 💼",
      "Aalas chhodo, kitabein uthao! ☀️",
      "Build your tomorrow, today! 🚀",
      "Good morning! Chapters finish karein? 📖",
      "Suraj nikal gaya, syllabus kab? 🌞",
      "Fresh morning, fresh mindset! 🏔️",
      "Strong coffee aur ek chapter? ☕",
      "Sapne bade, mehnat badi! 🌟",
      "Uth gaye? Action ka time hai! 🎬",
      "Morning hustle! Let's go! 📈",
      "Make today productive! ⚡",
      "Good Morning! Plan set hai? 📅",
      "New morning, new energy! 📘"
    ];
    const GREETINGS_EVENING = [
      "Good Evening! Chai aur revision? ☕📚",
      "Evening buddy! Kuch naya seekhein? 🌟",
      "Hey! Aaj ka din kaisa raha? 🤝",
      "Ready for evening sessions? 📖",
      "What's on your mind tonight? 📝",
      "1% luck, 99% preparation! 🏆",
      "Shaam ho gayi, hustle baki hai! 🌆",
      "Evening vibes! Syllabus niptao. 🎒",
      "Thak gaye? Thoda aur push karo! 💪",
      "Good Evening! Ek ghanta aur? ⏳",
      "Snacks ready? Padhai shuru! 🍿",
      "Sunset and study! Perfect. 🌇",
      "Stop when you're done! 🔥",
      "Shaam ka time, sabse prime! 🧠",
      "Aakhri push! Kuch bada karte hain. 🎯",
      "Chai pee li? Ab notes khol lo! ☕",
      "Din gaya, padhai abhi baaki hai. ⏳",
      "Evening session! No distractions. 📵",
      "Alag banna hai to padhna padega! 💪",
      "Revision ka waqt ho gaya hai. 🔄",
      "Shaam productive honi chahiye! 🌆",
      "Thoda break, and back to hustle! 🚶‍♂️",
      "Good evening champ! Kitna cover kiya? 📊",
      "Hawa mast, padhai bhi mast! 🌬️",
      "Evening wrap-up! Finish it. ✅"
    ];
    const GREETINGS_NIGHT = [
      "Raat gayi, par padhai nahi! 🦉💡",
      "Still up? Let's finish this. 💪",
      "Night owl mode ON! 🌙",
      "Late night study session? 💻",
      "Good Night buddy! Sona kab hai? 🚀",
      "Dream big, study bigger! ✨",
      "Finish strong before sleeping! 🏁",
      "Shor kam, focus zyada! 🤫",
      "Neend aa rahi? Ek topic bas! ☕",
      "Midnight motivation! You got this! 🌌",
      "Jo sote hain wo khote hain! 🛡️",
      "Raaton ki neend gawa kar success! 🏆",
      "Good night? Abhi syllabus baki hai. 📚",
      "Peaceful night, deep focus! 🧘‍♂️",
      "One step closer to your dream! 💡",
      "Duniya so rahi, aap padh rahe. Respect! 🫡",
      "Raat ki shanti, syllabus tez! 🤫",
      "Ek coffee aur ek chapter? ☕📖",
      "Night focus! Only studying. 📵",
      "Target complete karke sona! 🎯",
      "Neend aa rahi? Muh dho lo! 🚰",
      "Late night grind! Mehnat rang layegi. 🌈",
      "Doing great! Thoda aur push karo. 🚀",
      "Aadhi raat, aadhi kitabein! 📚",
      "Shh! Study in progress... 🤫💡"
    ];
    const GREETINGS_AFTERNOON = [
      "Good Afternoon! Padhai kaisi hai? 🧠",
      "Hey! Chalo brain workout karein. ⚡",
      "Afternoon! Taiyari kaisi chal rahi? 📝",
      "Lunch break done? Back to work! 🏗️",
      "Check out today's market news! 📉",
      "Good Afternoon! Need a boost? 🚀",
      "Keep moving forward! 🧗",
      "Dopahar ki neend bhagao! ☀️",
      "Lunch wali neend? No chance! ☕",
      "Half day gone! Make it count. ⏳",
      "Afternoon slump? Deep breath! 🌬️",
      "Bache hue tasks niptate hain! 📋",
      "Don't lose the momentum. 🏃‍♀️",
      "Productivity on high alert! 🚨",
      "Thoda aur focus, doing great! 👍",
      "Dopahar ho gayi! Focus maintain rakho. 🎯",
      "Lunch heavy tha? Easy topic uthao! 🍔",
      "Quick power nap, then books? 💤",
      "Neend ko bye, career ko hi! 👋",
      "Sun is shining, keep studying! ☀️",
      "Afternoon grind is tough! 💪",
      "Break lamba ho gaya, ab padhai! ⏱️",
      "Boring topics abhi nipta lo! 🥱",
      "Keep your focus sharp today! 🗡️",
      "Din badh raha, syllabus bhi? 🚶‍♂️"
    ];"""

pattern = r'const GREETINGS_MORNING = \[.*?\];\s*const GREETINGS_EVENING = \[.*?\];\s*const GREETINGS_NIGHT = \[.*?\];\s*const GREETINGS_AFTERNOON = \[.*?\];'

new_content = re.sub(pattern, new_arrays, content, flags=re.DOTALL)

if new_content != content:
    with open(r'C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\index.html', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Updated greetings to be shorter.")
else:
    print("No changes made. Regex might have failed.")
