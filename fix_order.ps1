$files = @("tools/pdf-tools/add-pages.html", "tools/pdf-tools/delete-pages.html", "tools/pdf-tools/favicon-generator.html")

foreach ($file in $files) {
    $content = Get-Content $file -Raw
    $scriptRegex = '(?s)<script>\s*\(function\(\) \{\s*const savedTheme = localStorage\.getItem\(''solmates_theme''\);.*?\n\s*</script>'
    if ($content -match $scriptRegex) {
        $extractedScript = $matches[0]
        $content = $content -replace $scriptRegex, ''
        # Insert right before </head> which is after the style block
        $content = $content -replace '</head>', "$extractedScript`n</head>"
        Set-Content $file $content -NoNewline
        Write-Host "Fixed order in $file"
    }
}
