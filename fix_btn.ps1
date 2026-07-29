$f = "tools/flashcards.html"
$content = Get-Content $f -Raw

# Remove inline style from the button and add class "start-btn"
$content = $content -replace '<button onclick="startStudy\(\)" style="[^"]+">', '<button onclick="startStudy()" class="start-btn">'

# Add base style for start-btn
$baseStyle = @"
    .start-banner { background: linear-gradient(135deg, var(--primary), #1a3c5e); padding: 25px; border-radius: 16px; color: white; text-align: center; margin-top: 30px; box-shadow: 0 10px 30px rgba(15,43,70,0.2); }
    .start-btn { background: #ffffff; color: var(--primary); border: none; padding: 12px 30px; border-radius: 30px; font-weight: 700; font-size: 1.05rem; cursor: pointer; transition: 0.2s; }
    .start-btn:hover { transform: scale(1.05); }
"@
$content = $content -replace '\.start-banner \{[^\}]+ \}', $baseStyle

# Add dark mode style for start-btn
$darkModeStyle = @"
      .done-state * { color: var(--text-main, #f8fafc) !important; }
      .start-btn { background: var(--bg-card-hover, #334155) !important; color: var(--text-main, #f8fafc) !important; }
"@
$content = $content -replace '\.done-state \* \{ color: var\(--text-main, #f8fafc\) !important; \}', $darkModeStyle

Set-Content $f $content -NoNewline
Write-Host "Updated flashcards.html"
