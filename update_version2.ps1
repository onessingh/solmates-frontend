$files = @(
    "tools/ai-study-companion/index.html",
    "tools/flashcards.html",
    "tools/calculator.html",
    "tools/coverpage.html",
    "tools/planner/index.html",
    "tools/converter.html",
    "tools/compressor.html",
    "tools/attendance.html",
    "tools/assignment-tracker.html",
    "tools/zero-size-pdf.html",
    "tools/teleprompter.html",
    "tools/text-humanizer.html"
)

foreach ($f in $files) {
    if (Test-Path $f) {
        $content = Get-Content $f -Raw
        $content = $content -replace 'global-lockdown\.css\?v=112\.0', 'global-lockdown.css?v=112.1'
        Set-Content $f $content -NoNewline
        Write-Host "Updated version in $f"
    }
}
