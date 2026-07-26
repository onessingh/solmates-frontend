import os

path = "c:/Users/Toshiba/OneDrive/Desktop/solmates/frontend/games/quiz-battle/game.js"
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

live_scores_func = """
function updateLiveScoresUI() {
    const container = document.getElementById('live-scores-container');
    if (!container) return;
    container.innerHTML = roomState.players.map(p => 
        <div class="px-3 py-1.5 rounded-full border border-slate-200 bg-white text-xs font-bold text-slate-700 ">
            : <span class="text-sky-600"></span>
        </div>
    ).join('');
}

function renderQuestion(q, qNum, totalQ) {
    updateLiveScoresUI();
"""

content = content.replace("function renderQuestion(q, qNum, totalQ) {", live_scores_func)

show_result_patch = """    if(document.getElementById(opt-).classList.contains('selected')) {
        fbt.textContent = Correct!;
        fbt.className = "text-xl font-bold text-green-400";
    } else {
        fbt.textContent = Wrong!;
        fbt.className = "text-xl font-bold text-red-400";
    }
    updateLiveScoresUI();
}"""
content = content.replace("""    if(document.getElementById(opt-).classList.contains('selected')) {
        fbt.textContent = Correct!;
        fbt.className = "text-xl font-bold text-green-400";
    } else {
        fbt.textContent = Wrong!;
        fbt.className = "text-xl font-bold text-red-400";
    }
}""", show_result_patch)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Patched quiz-battle live scores")
