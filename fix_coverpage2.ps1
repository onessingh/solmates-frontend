$f = "tools/coverpage.html"
$content = Get-Content $f -Raw

# 1. Fix broken logo URL in HTML and JS
$content = $content -replace 'Delhi_Univer\r?\nsity', 'Delhi_University'

# 2. Fix Custom Fields Container in Dark Mode
# Add it explicitly to the end of the solmates-dark-style block
$customFieldsDark = @"
      .custom-fields-container { background: var(--bg-card-hover, #334155) !important; border: 1px solid var(--border-color, #334155) !important; }
"@
$content = $content -replace '</style>', "$customFieldsDark`n</style>"

# 3. Fix a4-content text color inheritance (stop it from becoming white)
$a4TextDark = @"
      .a4-content { color: black !important; }
      .a4-content * { color: black; }
"@
$content = $content -replace '</style>', "$a4TextDark`n</style>"

# 4. Bump Cache
$content = $content -replace 'global-lockdown\.css\?v=112\.4', 'global-lockdown.css?v=112.5'

Set-Content $f $content -NoNewline
Write-Host "Updated coverpage.html"
