import os

# 1. QUIZ BATTLE
path = "c:/Users/Toshiba/OneDrive/Desktop/solmates/frontend/games/quiz-battle/game.js"
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()
old_qb = """      if (course === 'MBA') {
          sem = document.getElementById('select-semester').value;
          if(!sem) { showToast("Please select a semester first"); return; }
          sub = document.getElementById('select-subject') ? (document.getElementById('select-subject').value || "All") : "All";
          topic = sub;
      }"""
new_qb = """      if (course === 'MBA') {
          sem = document.getElementById('select-semester').value;
          if(!sem) { showToast("Please select a semester first"); return; }
          sub = document.getElementById('select-subject') ? (document.getElementById('select-subject').value || "All") : "All";
          if (sub === 'All' && window.QUIZ_DATA && window.QUIZ_DATA.structure && window.QUIZ_DATA.structure["MBA"] && window.QUIZ_DATA.structure["MBA"][sem]) {
              topic = "MBA " + sem + " Topics: " + window.QUIZ_DATA.structure["MBA"][sem].join(", ");
          } else if (sub === 'All') {
              topic = "MBA " + sem + " all subjects";
          } else {
              topic = sub;
          }
      }"""
content = content.replace(old_qb, new_qb)
with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

# 2. RAPID FIRE
path = "c:/Users/Toshiba/OneDrive/Desktop/solmates/frontend/games/rapid-fire/game.js"
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()
old_rf = """      let topic = subject;
      if (course !== 'MBA') {
          const diff = document.getElementById('select-difficulty').value;
          topic = course + " (" + diff + ")";
      }"""
new_rf = """      let topic = subject;
      if (course !== 'MBA') {
          const diff = document.getElementById('select-difficulty').value;
          topic = course + " (" + diff + ")";
      } else if (course === 'MBA' && subject === 'All') {
          if (window.QUIZ_DATA && window.QUIZ_DATA.structure && window.QUIZ_DATA.structure["MBA"] && window.QUIZ_DATA.structure["MBA"][sem]) {
              topic = "MBA " + sem + " Topics: " + window.QUIZ_DATA.structure["MBA"][sem].join(", ");
          } else {
              topic = "MBA " + sem + " all subjects";
          }
      }"""
content = content.replace(old_rf, new_rf)
with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

# 3. CASE STUDY ARENA
path = "c:/Users/Toshiba/OneDrive/Desktop/solmates/frontend/games/case-study-arena/game.js"
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()
old_cs = """      const sem = document.getElementById('select-semester').value;
      if(!sem) { showToast("Please select a semester first"); return; }
      const topic = document.getElementById('select-subject').value || "All";"""
new_cs = """      const sem = document.getElementById('select-semester').value;
      if(!sem) { showToast("Please select a semester first"); return; }
      let topic = document.getElementById('select-subject').value || "All";
      
      if (topic === 'All' && window.QUIZ_DATA && window.QUIZ_DATA.structure && window.QUIZ_DATA.structure["MBA"] && window.QUIZ_DATA.structure["MBA"][sem]) {
          topic = "MBA " + sem + " Topics: " + window.QUIZ_DATA.structure["MBA"][sem].join(", ");
      } else if (topic === 'All') {
          topic = "MBA " + sem + " all subjects";
      }"""
content = content.replace(old_cs, new_cs)
with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Topics patched")
