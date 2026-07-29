$files = @("tools/pdf-tools/add-pages.html", "tools/pdf-tools/delete-pages.html", "tools/pdf-tools/favicon-generator.html")

foreach ($file in $files) {
    $content = Get-Content $file -Raw
    
    # 1. Add tailwind config
    $twScript = "<script src=`"https://cdn.tailwindcss.com`"></script>"
    if ($content -match $twScript -and $content -notmatch "darkMode: 'class'") {
        $twConfig = "$twScript`n    <script>tailwind.config = { darkMode: 'class' }</script>"
        $content = $content -replace [regex]::Escape($twScript), $twConfig
    }
    
    # 2. Replace the old toggle script with the new robust one
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
      
      // Still need to toggle solmates-dark-style for non-Tailwind elements
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
      
      // Also apply immediately if the element is already parsed
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
        Set-Content $file $content -NoNewline
        Write-Host "Updated $file"
    }
}
