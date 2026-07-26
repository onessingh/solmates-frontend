$files = @(
    "c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\games\rapid-fire\game.js",
    "c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\games\case-study-arena\game.js",
    "c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\games\quiz-battle\game.js"
)

foreach ($file in $files) {
    if(Test-Path $file) {
        $content = Get-Content $file -Raw
        
        $target = "while(cleanOptions.length < 4) cleanOptions.push(`"None of the above`");"
        $replacement = "if (cleanOptions.length === 4 && cleanOptions.every(opt => /^[A-D]$/i.test(opt))) {`n                              cleanOptions = cleanOptions.map(opt => `"Option `" + opt.toUpperCase());`n                          }`n                          while(cleanOptions.length < 4) cleanOptions.push(`"None of the above`");"
        
        $content = $content.Replace($target, $replacement)
        Set-Content $file -Value $content
    }
}
Write-Host "Fixed AI option parsing!"
