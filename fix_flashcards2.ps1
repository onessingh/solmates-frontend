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

$newStyle = @"
<style id="solmates-dark-style" media="screen and (prefers-color-scheme: dark)">
      :root {
        --bg-body: #0f172a;
        --text-main: #f8fafc;
        --text-muted: #94a3b8;
        --text-lighter: #cbd5e1;
        --bg-nav: rgba(15, 23, 42, 0.98);
        --bg-card: #1e293b;
        --bg-card-hover: #334155;
        --border-color: #334155;
        --hero-bg: linear-gradient(to bottom, #0f172a, #1e293b);
        --brand-primary: #f8fafc;
        --brand-accent: #c0962d;
        --bg-light: var(--bg-card-hover, #334155);
      }

      body { background: var(--bg-body, #0f172a) !important; color: var(--text-main, #f8fafc) !important; }
      .top-nav, .header-bar, header { background: var(--bg-nav, rgba(15,23,42,0.95)) !important; border-bottom: 1px solid var(--border-color, #334155) !important; }
      .card, .form-card, .result-box, .result-area, .white-box, .container, .main-content, .card-body, .feature-item, .info-box, .upload-area, .upload-card, .tool-card, .calc-card, .flashcard, .topic-card, .overlay, .task-card, .glass-panel, .converter-box, .settings-panel, .control-panel, .action-card, .attendance-card, .search-box, .tab-content, .faq-q, .faq-item, .btn-tool, .input-card, .deck-item, .card-face, .done-state { 
          background: var(--bg-card, #1e293b) !important; 
          border: 1px solid var(--border-color, #334155) !important; 
          color: var(--text-main, #f8fafc) !important;
      }
      .card *, .form-card *, .result-box *, .result-area *, .white-box *, .container *, .main-content *, .card-body *, .feature-item *, .info-box *, .upload-area *, .upload-card *, .tool-card *, .calc-card *, .flashcard *, .topic-card *, .overlay *, .task-card *, .glass-panel *, .converter-box *, .settings-panel *, .control-panel *, .action-card *, .attendance-card *, .search-box *, .tab-content *, .faq-q *, .faq-item *, .btn-tool *, .input-card *, .deck-item *, .card-face *, .done-state * {
          color: var(--text-main, #f8fafc) !important;
      }
      h1, h2, h3, h4, h5, h6, p, span, li, a, label {
          color: var(--text-main, #f8fafc) !important;
      }
      input, select, textarea, .input-field, .add-sem-btn, .btn-secondary, .form-control, .prompt-box, .chat-input {
          background: var(--bg-card-hover, #334155) !important;
          border: 1px solid var(--border-color, #334155) !important;
          color: var(--text-main, #f8fafc) !important;
      }
      ::placeholder { color: var(--text-muted, #94a3b8) !important; opacity: 1 !important; }
      ::-webkit-input-placeholder { color: var(--text-muted, #94a3b8) !important; }
      ::-moz-placeholder { color: var(--text-muted, #94a3b8) !important; }
      .nav-logo { color: var(--brand-primary) !important; }
      .text-muted, .text-lighter { color: var(--text-muted) !important; }
      .btn-primary, .primary-btn, .btn, .btn-main { color: white !important; background: #0071e3 !important; border: none !important; }
      .back-link, .back-btn { background: var(--bg-card-hover) !important; color: var(--text-main) !important; border: 1px solid var(--border-color) !important; }
      
      /* Explicit overrides for flashcards */
      .input-card { background: var(--bg-card, #1e293b) !important; }
      .btn-forgot { background: #7f1d1d !important; color: #fca5a5 !important; border: 1px solid #991b1b !important; }
      .btn-remember { background: #14532d !important; color: #bbf7d0 !important; border: 1px solid #166534 !important; }
      .del-btn { background: #7f1d1d !important; color: #fca5a5 !important; }
      .del-btn:hover { background: #991b1b !important; }
      .card-face { background: var(--bg-card, #1e293b) !important; }
      .deck-item { background: var(--bg-card, #1e293b) !important; }
      .done-state { background: transparent !important; }
</style>
"@

foreach ($f in $files) {
    if (Test-Path $f) {
        $content = Get-Content $f -Raw
        $content = $content -replace '(?s)<style id="solmates-dark-style" media="screen and \(prefers-color-scheme: dark\)">(.*?)</style>', $newStyle
        Set-Content $f $content -NoNewline
        Write-Host "Updated $f"
    }
}
