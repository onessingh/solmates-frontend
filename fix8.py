import sys

with open('games/quiz-battle/game.js', 'r', encoding='utf-8') as f:
    game_js = f.read()

old_block = '''        if (committed && snapshot.val() === myId) {
            isHost = true;
            roomState.questions = roomState.backupQuestions;
            roomState.currentAnswers = {};
            
            if (peer) peer.destroy();
            
            setTimeout(() => {
                initPeer((id) => {
                    hideAllScreens();
                    document.getElementById('screen-game').classList.remove('hidden');
                    showToast("You are the new host!");'''

new_block = '''        if (committed && snapshot.val() === myId) {
            isHost = true;
            roomState.questions = roomState.backupQuestions;
            roomState.currentAnswers = {};
            
            let oldHostPlayer = roomState.players.find(p => p.id === hostId);
            if (oldHostPlayer) {
                oldHostPlayer.id = hostId + '-LEFT';
                roomState.scores[oldHostPlayer.id] = roomState.scores[hostId] || 0;
                roomState.correctCounts[oldHostPlayer.id] = roomState.correctCounts[hostId] || 0;
            }
            let myOldId = myId;
            
            if (peer) peer.destroy();
            
            setTimeout(() => {
                initPeer((id) => {
                    let me = roomState.players.find(p => p.id === myOldId);
                    if (me) me.id = myId;
                    roomState.scores[myId] = roomState.scores[myOldId] || 0;
                    roomState.correctCounts[myId] = roomState.correctCounts[myOldId] || 0;
                    
                    hideAllScreens();
                    document.getElementById('screen-game').classList.remove('hidden');
                    showToast("You are the new host!");'''

game_js = game_js.replace(old_block, new_block)

with open('games/quiz-battle/game.js', 'w', encoding='utf-8') as f:
    f.write(game_js)
