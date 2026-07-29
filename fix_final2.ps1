$f = "tools/flashcards.html"
$content = Get-Content $f -Raw

# 1. Fix the Start Swipe Study button
$content = $content -replace 'style="background: var\(--bg-card\);', 'style="background: var(--card, #ffffff);'

# 2. Fix the .done-state border
$content = $content -replace ', \.done-state \{ \r?\n          background: var\(--bg-card', ' { 
          background: var(--bg-card'
$content = $content -replace ', \.done-state \* \{', ' {'

$content = $content -replace '\.done-state \{ background: transparent !important; \}', ".done-state { background: transparent !important; border: none !important; }`n      .done-state * { color: var(--text-main, #f8fafc) !important; }"

Set-Content $f $content -NoNewline
Write-Host "Updated flashcards.html"
