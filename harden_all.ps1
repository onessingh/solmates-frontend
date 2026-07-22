$htmlFiles = Get-ChildItem -Path . -Recurse -Filter "*.html"

foreach ($file in $htmlFiles) {
    $content = [System.IO.File]::ReadAllText($file.FullName)
    $modified = $false

    # 1. Inject notranslate meta tag if not present
    if ($content -notmatch 'meta name="google" content="notranslate"') {
        if ($content -match '<head>') {
            $meta = "`n  <meta name=""google"" content=""notranslate"">"
            $content = $content -replace '<head>', "<head>$meta"
            $modified = $true
        }
    }

    # 2. Inject global-lockdown.css link if not present
    if ($content -notmatch 'global-lockdown.css') {
        if ($content -match '<meta name="google" content="notranslate">') {
            $link = "`n  <link rel=""stylesheet"" href=""/css/global-lockdown.css?v=111.9"">"
            $content = $content -replace '<meta name="google" content="notranslate">', "$&$link"
            $modified = $true
        } elseif ($content -match '<head>') {
             $link = "`n  <link rel=""stylesheet"" href=""/css/global-lockdown.css?v=111.9"">"
             $content = $content -replace '<head>', "<head>$link"
             $modified = $true
        }
    }

    if ($modified) {
        [System.IO.File]::WriteAllText($file.FullName, $content)
        Write-Host "Hardened: $($file.FullName)"
    }
}
