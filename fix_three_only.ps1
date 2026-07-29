$files = Get-ChildItem tools/pdf-tools/*.html, tools/image-tools/*.html -ErrorAction SilentlyContinue

$keepFiles = @("add-pages.html", "delete-pages.html", "favicon-generator.html")

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw

    if ($keepFiles -contains $file.Name) {
        # For the 3 files, fix the order: move <script> AFTER <style>
        $scriptRegex = '(?s)<script>\s*\(function\(\) \{\s*const savedTheme = localStorage\.getItem\(''solmates_theme''\);.*?\n\s*</script>'
        if ($content -match $scriptRegex) {
            $extractedScript = $matches[0]
            $content = $content -replace $scriptRegex, ''
            # Insert right after the style block
            $content = $content -replace '</style>', "</style>`n$extractedScript"
            Set-Content $file.FullName $content -NoNewline
            Write-Host "Fixed order in $($file.Name)"
        }
    } else {
        # For the other 29 files, completely remove the injected dark mode script and style block
        $scriptRegex = '(?s)<script>\s*\(function\(\) \{\s*const savedTheme = localStorage\.getItem\(''solmates_theme''\);.*?\n\s*</script>'
        $content = $content -replace $scriptRegex, ''
        
        $styleRegex = '(?s)<style id="solmates-dark-style".*?</style>'
        $content = $content -replace $styleRegex, ''
        
        Set-Content $file.FullName $content -NoNewline
        Write-Host "Removed injected dark mode from $($file.Name)"
    }
}
