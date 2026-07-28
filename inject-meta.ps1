 = Get-ChildItem -Path c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend -Filter *.html -Recurse

 = "
  <meta name="color-scheme" content="light only">
  <meta name="supported-color-schemes" content="light">"

foreach ( in ) {
     = Get-Content .FullName -Raw
    if ( -notmatch "color-scheme") {
         =  -replace "(<head.*?>)", "$1"
        Set-Content -Path .FullName -Value  -Encoding UTF8
    }
}
Write-Host "Injected meta tags into HTML files."
