$files = @(
    "c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\games\rapid-fire\game.js",
    "c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\games\case-study-arena\game.js",
    "c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\games\business-hangman\game.js",
    "c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\games\market-mavericks\game.js",
    "c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\games\shark-pitch\game.js"
)

foreach ($file in $files) {
    if(Test-Path $file) {
        $content = Get-Content $file -Raw
        
        $content = [System.Text.RegularExpressions.Regex]::Replace($content, "(?s)// Forcefully disconnect anyone who isn't 'me'\s*players\.forEach\(p => \{\s*if \(p\.id !== myId && p\.name !== myName\) \{\s*p\.disconnected = true;\s*\}\s*\}\);", "// Delay disconnect to prevent UI flicker`n              players.forEach(p => {`n                  if (p.id !== myId && p.name !== myName) {`n                      const oldId = p.id;`n                      setTimeout(() => {`n                          if (p.id === oldId) { p.disconnected = true; renderPlayers(); }`n                      }, 8000);`n                  }`n              });")
        
        Set-Content $file -Value $content
    }
}

$file = "c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\games\quiz-battle\game.js"
$content = Get-Content $file -Raw
$content = [System.Text.RegularExpressions.Regex]::Replace($content, "(?s)// Forcefully disconnect anyone who isn't 'me'\s*roomState\.players\.forEach\(p => \{\s*if \(p\.id !== myId && p\.name !== myName\) \{\s*p\.disconnected = true;\s*\}\s*\}\);", "// Delay disconnect to prevent UI flicker`n              roomState.players.forEach(p => {`n                  if (p.id !== myId && p.name !== myName) {`n                      const oldId = p.id;`n                      setTimeout(() => {`n                          if (p.id === oldId) { p.disconnected = true; renderPlayers(); }`n                      }, 8000);`n                  }`n              });")
Set-Content $file -Value $content

Write-Host "Updated regex"
