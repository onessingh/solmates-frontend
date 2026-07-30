$config = '{
  "appId": "com.onessingh.solmates",
  "appName": "Solmates",
  "webDir": "www"
}'
Set-Content capacitor.config.json $config -NoNewline

Write-Host "Creating www folder..."
Remove-Item -Recurse -Force www -ErrorAction SilentlyContinue
mkdir www -Force | Out-Null

$dirs = "admin", "css", "database", "games", "images", "journey", "js", "libs", "skills", "tools"
foreach ($d in $dirs) { 
    if (Test-Path $d) { Copy-Item -Path $d -Destination "www\" -Recurse -Force } 
}

$files = Get-ChildItem -File -Filter *.html ; foreach ($f in $files) { Copy-Item $f.FullName -Destination "www\" -Force }
if (Test-Path sw.js) { Copy-Item sw.js -Destination "www\" -Force }
if (Test-Path manifest.json) { Copy-Item manifest.json -Destination "www\" -Force }

Write-Host "Fixing Links and Injecting Premium Features..."
$htmlFiles = Get-ChildItem -Path www -Filter *.html -Recurse
$knownDirs = @("admin", "database", "games", "journey", "skills", "tools")

foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw
    
    # Inject Premium Scripts
    $inject = "<script src=`"/js/capacitor-init.js`" defer></script>`n<script src=`"/js/pull-to-refresh.js`" defer></script>`n</head>"
    $content = $content -replace '</head>', $inject

    # Fix root / links
    $content = $content -replace 'href="/"', 'href="/index.html"'
    $content = $content -replace 'window\.location\.href\s*=\s*[''"]/[''"]', "window.location.href='/index.html'"

    # Fix Directory Links (e.g. /tools -> /tools/index.html)
    foreach ($dir in $knownDirs) {
        $content = $content -replace "href=`"/$dir/?`"", "href=`"/$dir/index.html`""
        $content = $content -replace "window\.location\.href\s*=\s*['`"]/$dir/?['`"]", "window.location.href='/$dir/index.html'"
    }

    # Fix standard hrefs (e.g. /feedback -> /feedback.html, /tools/calculator -> /tools/calculator.html)
    $content = [regex]::Replace($content, 'href="/([^"\.]+?)(?<!/)"', 'href="/$1.html"')
    $content = [regex]::Replace($content, 'href="/([^"\.]+?)/"', 'href="/$1/index.html"')
    
    # Fix standard window.location.href
    $content = [regex]::Replace($content, 'window\.location\.href\s*=\s*[''"]/([^''"\.]+?)(?<!/)[''"]', 'window.location.href=''/$1.html''')
    $content = [regex]::Replace($content, 'window\.location\.href\s*=\s*[''"]/([^''"\.]+?)/[''"]', 'window.location.href=''/$1/index.html''')

    Set-Content -Path $file.FullName -Value $content -NoNewline
}

Write-Host "Syncing to Android Project..."
npx cap sync
Write-Host "Done! Build the APK again."
