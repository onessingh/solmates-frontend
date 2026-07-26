$files = @(
    "c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\games\rapid-fire\game.js",
    "c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\games\business-hangman\game.js",
    "c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\games\market-mavericks\game.js",
    "c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\games\shark-pitch\game.js",
    "c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\games\case-study-arena\game.js",
    "c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\games\quiz-battle\game.js"
)

foreach ($file in $files) {
    if(Test-Path $file) {
        $content = Get-Content $file -Raw
        
        # 1. Update the 'me' finder to use name fallback
        $content = $content -replace "let me = players\.find\(p => p\.id === myOldId\);", "let me = players.find(p => p.id === myOldId || p.name === myName);"
        
        # 2. Force disconnect for others
        $target = "oldHostPlayer\.disconnected = true;"
        if ($content -match $target -and $content -notmatch "p\.name \!== myName") {
            $content = $content -replace "oldHostPlayer\.disconnected = true;", "oldHostPlayer.disconnected = true;`n              }`n              // Forcefully disconnect anyone who isn't 'me'`n              players.forEach(p => {`n                  if (p.id !== myId && p.name !== myName) {`n                      p.disconnected = true;`n                  }`n              });`n              if (oldHostPlayer) {"
        }
        
        Set-Content $file -Value $content
    }
}
Write-Host "Updated migrateHost logic!"
