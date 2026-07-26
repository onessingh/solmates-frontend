import sys

with open('games/quiz-battle/game.js', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("el.innerHTML = <h2>", "el.innerHTML = \<h2>")
content = content.replace("Leave</button></div>;", "Leave</button></div>\;")

with open('games/quiz-battle/game.js', 'w', encoding='utf-8') as f:
    f.write(content)
