$f = "tools/coverpage.html"
$content = Get-Content $f -Raw

# 1. Swap .container with .editor-panel
$content = $content -replace ', \.container,', ', .editor-panel,'
$content = $content -replace ', \.container \*,', ', .editor-panel *,'

# 2. Shield a4-content from the heading override
$oldHeadings = "h1, h2, h3, h4, h5, h6, p, span, li, a, label {"
$newHeadings = "h1:not(.a4-content *), h2:not(.a4-content *), h3:not(.a4-content *), h4:not(.a4-content *), h5:not(.a4-content *), h6:not(.a4-content *), p:not(.a4-content *), span:not(.a4-content *), li:not(.a4-content *), a:not(.a4-content *), label:not(.a4-content *) {"
$content = $content.Replace($oldHeadings, $newHeadings)

# 3. Add explicit reset for .a4-content background just in case
$resetA4 = @"
      .a4-content { background: white !important; }
      .a4-preview-wrapper { background: #e2e8f0 !important; }
"@
$content = $content -replace '</style>', "$resetA4`n</style>"

# 4. Bump cache version to 112.4
$content = $content -replace 'global-lockdown\.css\?v=112\.3', 'global-lockdown.css?v=112.4'

Set-Content $f $content -NoNewline
Write-Host "Updated coverpage.html"
