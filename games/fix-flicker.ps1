$files = @(
    "c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\games\rapid-fire\game.js",
    "c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\games\case-study-arena\game.js",
    "c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\games\business-hangman\game.js",
    "c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\games\market-mavericks\game.js",
    "c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\games\shark-pitch\game.js",
    "c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\games\quiz-battle\game.js"
)

foreach ($file in $files) {
    if(Test-Path $file) {
        $content = Get-Content $file -Raw
        
        $target1 = @"
                // Forcefully disconnect anyone who isn't 'me'
                players.forEach(p => {
                    if (p.id !== myId && p.name !== myName) {
                        p.disconnected = true;
                    }
                });
"@
        $replacement1 = @"
                // Delay disconnect to prevent UI flicker
                players.forEach(p => {
                    if (p.id !== myId && p.name !== myName) {
                        const oldId = p.id;
                        setTimeout(() => {
                            if (p.id === oldId) p.disconnected = true;
                        }, 8000);
                    }
                });
"@
        $target1 = $target1 -replace "`r`n", "`n"
        $replacement1 = $replacement1 -replace "`r`n", "`n"
        $content = $content -replace "`r`n", "`n"
        $content = $content.Replace($target1, $replacement1)
        
        $target2 = @"
                // Forcefully disconnect anyone who isn't 'me'
                roomState.players.forEach(p => {
                    if (p.id !== myId && p.name !== myName) {
                        p.disconnected = true;
                    }
                });
"@
        $replacement2 = @"
                // Delay disconnect to prevent UI flicker
                roomState.players.forEach(p => {
                    if (p.id !== myId && p.name !== myName) {
                        const oldId = p.id;
                        setTimeout(() => {
                            if (p.id === oldId) p.disconnected = true;
                        }, 8000);
                    }
                });
"@
        $target2 = $target2 -replace "`r`n", "`n"
        $replacement2 = $replacement2 -replace "`r`n", "`n"
        $content = $content.Replace($target2, $replacement2)

        Set-Content $file -Value $content
    }
}

Write-Host "Updated UI flicker in all games"
