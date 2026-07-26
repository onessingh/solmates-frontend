$file = "c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\games\case-study-arena\game.js"
$content = Get-Content $file -Raw
$target = "                            } else {`n                                if (gameState.gameOver) return;`n        const q = gameState.caseData ? gameState.caseData.questions[gameState.qIndex] : gameState.questions[gameState.qIndex];`n        if (!q) return;`n                                broadcast({ type: 'QUESTION', qIndex: gameState.qIndex, question: q });`n                                showQuestion(gameState.qIndex, q);`n                                clearTimeout(forceRevealTimer);`n                                forceRevealTimer = setTimeout(() => {`n                                    players.filter(p => !p.disconnected).forEach(p => {`n                                        if (!gameState.currentAnswers[p.id]) gameState.currentAnswers[p.id] = { idx: -1, elapsed: TIME_LIMIT_MS };`n                                    });`n                                    checkAllAnswered();`n                                }, TIME_LIMIT_MS + 2000);`n                            }"
$replacement = "                            } else {`n                                nextQuestion();`n                            }"
$content = $content.Replace($target, $replacement)
Set-Content $file -Value $content

$file2 = "c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\games\rapid-fire\game.js"
$content2 = Get-Content $file2 -Raw
$target2 = "                        if (gameState.gameStarted && !gameState.gameOver && gameState.qIndex < gameState.questions.length) {`n                            const q = gameState.questions[gameState.qIndex];`n                            broadcast({ type: 'QUESTION', qIndex: gameState.qIndex, question: q });`n                            showQuestion(gameState.qIndex, q);`n                            clearTimeout(forceRevealTimer);`n                            forceRevealTimer = setTimeout(() => {`n                                players.filter(p => !p.disconnected).forEach(p => {`n                                    if (!gameState.currentAnswers[p.id]) gameState.currentAnswers[p.id] = { idx: -1, elapsed: TIME_LIMIT_MS };`n                                });`n                                checkAllAnswered();`n                            }, TIME_LIMIT_MS + 2000);`n                        }"
$replacement2 = "                        if (gameState.gameStarted && !gameState.gameOver) {`n                            nextQuestion();`n                        }"
$content2 = $content2.Replace($target2, $replacement2)
Set-Content $file2 -Value $content2

Write-Host "Updated resume logic"
