$files = @(
    "games/quiz-battle/index.html",
    "games/rapid-fire/index.html",
    "games/case-study-arena/index.html",
    "games/shark-pitch/index.html",
    "games/market-mavericks/index.html"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        
        # 1. Strip the erroneous injected lines
        $content = $content -replace '(?m)^\s*\.player-item \{ background: var\(--card-bg\); border-color: var\(--glass-border\); color: var\(--text-main\); \}\r?\n?', ''
        $content = $content -replace '(?m)^\s*\.challenge-box \{ background: rgba\(245, 158, 11, 0\.1\); border-color: rgba\(245, 158, 11, 0\.2\); \}\r?\n?', ''
        
        # 2. Add tailwind config
        $twScript = "<script src=`"https://cdn.tailwindcss.com`"></script>"
        if ($content -match $twScript -and $content -notmatch "darkMode: 'class'") {
            $twConfig = "$twScript`n    <script>tailwind.config = { darkMode: 'class' }</script>"
            $content = $content -replace [regex]::Escape($twScript), $twConfig
        }
        
        # 3. Replace the old toggle script with the robust one
        $oldScriptRegex = '(?s)<script>\s*\(function\(\) \{\s*const savedTheme = localStorage\.getItem\(''solmates_theme''\);.*?\n\s*</script>'
        
        $newScript = @"
<script>
    (function() {
      const savedTheme = localStorage.getItem('solmates_theme');
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      const applyDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
      
      if (applyDark) {
          document.documentElement.classList.add('dark');
          document.documentElement.style.colorScheme = 'dark';
      } else {
          document.documentElement.classList.remove('dark');
          document.documentElement.style.colorScheme = 'light';
      }
      
      window.addEventListener('DOMContentLoaded', () => {
          const darkStyle = document.getElementById('solmates-dark-style');
          if (darkStyle) {
              if (applyDark) {
                  darkStyle.media = 'all'; 
                  darkStyle.disabled = false;
              } else {
                  darkStyle.media = 'not all'; 
                  darkStyle.disabled = true;
              }
          }
      });
      
      const darkStyleImm = document.getElementById('solmates-dark-style');
      if (darkStyleImm) {
          if (applyDark) {
              darkStyleImm.media = 'all'; 
              darkStyleImm.disabled = false;
          } else {
              darkStyleImm.media = 'not all'; 
              darkStyleImm.disabled = true;
          }
      }
    })();
  </script>
"@
        if ($content -match $oldScriptRegex) {
            $content = $content -replace $oldScriptRegex, $newScript
        }
        
        Set-Content $file $content -NoNewline
        Write-Host "Processed $file"
    }
}
