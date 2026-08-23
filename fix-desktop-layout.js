const fs = require('fs');
let css = fs.readFileSync('tools/resumebuilder/style.css', 'utf8');

// Remove the old desktop media query I added
const desktopStart = css.indexOf('/* ===== LAPTOP / DESKTOP LAYOUT (min-width: 1241px) =====');
if (desktopStart !== -1) {
  css = css.substring(0, desktopStart);
}

// Add a proper desktop media query
const desktopCss = `
/* ===== LAPTOP / DESKTOP LAYOUT (min-width: 1241px) ===== */
@media (min-width: 1241px) {

  /* Full width page, no padding wasted */
  .page {
    width: 100% !important;
    max-width: 100% !important;
    padding: 0 24px !important;
    box-sizing: border-box !important;
  }

  /* Hero: slim horizontal bar */
  .hero {
    max-width: 100% !important;
    padding: 16px 32px !important;
    margin: 0 0 16px 0 !important;
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    gap: 24px !important;
  }
  .hero-content { flex: 1 !important; }
  .hero-content h1 { font-size: 1.6rem !important; margin-bottom: 2px !important; }
  .hero-subtitle { font-size: 0.8rem !important; margin-bottom: 8px !important; }
  .eyebrow { font-size: 0.7rem !important; margin-bottom: 2px !important; }
  .hero-actions { margin-bottom: 8px !important; }
  .hero-metrics { display: flex !important; flex-direction: row !important; gap: 12px !important; }
  .metric { padding: 6px 12px !important; }
  .metric-value { font-size: 1.1rem !important; }
  .metric-label { font-size: 0.65rem !important; }
  .hero-visual { width: 140px !important; flex-shrink: 0 !important; }
  .hero-image { width: 100% !important; max-height: 100px !important; object-fit: contain !important; }

  /* Tabs: full width */
  .rb-tabs {
    max-width: 100% !important;
    margin: 0 0 12px 0 !important;
    border-radius: 12px !important;
  }

  /* Builder layout: side-by-side form + preview */
  .builder-layout {
    max-width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  .builder-columns {
    display: grid !important;
    grid-template-columns: 1fr 1fr !important;
    flex-direction: unset !important;
    gap: 16px !important;
    max-width: 100% !important;
    margin: 0 !important;
    align-items: start !important;
  }

  .form-panel {
    max-width: 100% !important;
    width: 100% !important;
    margin: 0 !important;
    max-height: calc(100vh - 200px) !important;
    overflow-y: auto !important;
    position: sticky !important;
    top: 70px !important;
  }

  .preview-panel {
    max-width: 100% !important;
    width: 100% !important;
    margin: 0 !important;
  }

  /* JD Match: full width */
  .jd-match {
    max-width: 100% !important;
    width: 100% !important;
    margin: 0 !important;
    box-sizing: border-box !important;
  }

  /* Templates: full width, no scrolling, multi-column */
  .templates {
    max-width: 100% !important;
    width: 100% !important;
    margin: 0 !important;
    box-sizing: border-box !important;
    padding: 0 !important;
  }

  .tpl-gallery {
    max-height: none !important;
    overflow-y: visible !important;
  }

  .tpl-grid {
    grid-template-columns: repeat(5, 1fr) !important;
    gap: 12px !important;
  }

  .template-card {
    padding: 8px !important;
  }

  .template-preview {
    height: 100px !important;
  }

  /* No transform on desktop for resume preview */
  #resume-preview {
    transform: none !important;
    margin-bottom: 0 !important;
    width: 100% !important;
  }

  /* Wizard header full width */
  .wizard-header {
    max-width: 100% !important;
    margin: 0 0 12px 0 !important;
  }
}
`;

css = css + desktopCss;
fs.writeFileSync('tools/resumebuilder/style.css', css, 'utf8');
console.log('Desktop layout fixed!');
