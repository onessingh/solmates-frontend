const fs = require('fs');
let css = fs.readFileSync('tools/resumebuilder/style.css', 'utf8');

const desktopCss = `

/* ===== LAPTOP / DESKTOP LAYOUT (min-width: 1241px) ===== */
/* Phone view (max-width: 1240px) is untouched - this only applies to real desktop/laptop browsers */
@media (min-width: 1241px) {
  /* Change viewport so desktop browser renders at real width, not the phone-emulated 900px */
  /* We handle this via CSS: allow the page to expand fully */
  
  .page {
    width: 100% !important;
    max-width: 100% !important;
    padding: 0 20px !important;
    box-sizing: border-box;
  }

  /* Hero: compact two-column row instead of big stacked block */
  .hero {
    max-width: 100% !important;
    padding: 20px 40px !important;
    margin: 0 0 20px 0 !important;
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    gap: 30px !important;
    border-radius: 12px !important;
  }

  .hero-content {
    flex: 1 !important;
  }

  .hero-content h1 {
    font-size: 1.8rem !important;
    margin-bottom: 4px !important;
  }

  .hero-subtitle {
    font-size: 0.85rem !important;
    margin-bottom: 10px !important;
  }

  .eyebrow {
    font-size: 0.75rem !important;
    margin-bottom: 4px !important;
  }

  .hero-actions {
    margin-bottom: 12px !important;
  }

  .hero-metrics {
    display: flex !important;
    flex-direction: row !important;
    gap: 16px !important;
  }

  .metric {
    padding: 8px 14px !important;
  }

  .metric-value {
    font-size: 1.2rem !important;
  }

  .metric-label {
    font-size: 0.7rem !important;
  }

  .hero-visual {
    width: 200px !important;
    flex-shrink: 0 !important;
  }

  .hero-image {
    width: 100% !important;
    max-height: 150px !important;
    object-fit: contain !important;
  }

  /* Builder layout: full-width two-column side by side */
  .builder-layout {
    max-width: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
  }

  .builder-columns {
    display: grid !important;
    grid-template-columns: 1fr 1fr !important;
    flex-direction: unset !important;
    gap: 20px !important;
    max-width: 100% !important;
    margin: 0 !important;
    align-items: start !important;
  }

  .form-panel {
    max-width: 100% !important;
    width: 100% !important;
    margin: 0 !important;
    height: calc(100vh - 220px) !important;
    overflow-y: auto !important;
    position: sticky !important;
    top: 80px !important;
  }

  .preview-panel {
    max-width: 100% !important;
    width: 100% !important;
    margin: 0 !important;
  }

  /* Tabs: stretch full width */
  .rb-tabs {
    margin: 0 0 16px 0 !important;
    border-radius: 12px !important;
  }

  /* Templates tab: use multi-column grid */
  .templates {
    width: 100% !important;
    padding: 0 !important;
  }

  .tpl-grid {
    grid-template-columns: repeat(4, 1fr) !important;
  }

  /* Resume preview: no scale transform on desktop */
  #resume-preview {
    transform: none !important;
    margin-bottom: 0 !important;
    width: 100% !important;
  }

  /* JD match panel */
  .jd-match {
    max-width: 100% !important;
    width: 100% !important;
  }
}
`;

// Append before the last line
css = css + desktopCss;
fs.writeFileSync('tools/resumebuilder/style.css', css, 'utf8');
console.log('Desktop CSS added!');
