const fs = require('fs');
let html = fs.readFileSync('tools/resumebuilder/index.html', 'utf8');

// Remove old viewport + detection script
const oldViewportBlock = `  <meta name="viewport" content="width=900, user-scalable=no" />
  <script>
    (function() {
      // Add is-desktop class to <html> so CSS can target desktop without relying on viewport width
      if (window.screen.width >= 1000 && !/Mobi|Android/i.test(navigator.userAgent)) {
        document.documentElement.classList.add('is-desktop');
      }
    })();
  </script>`;

const newViewportBlock = `  <script>
    // Detect desktop BEFORE viewport meta is parsed. document.write() inserts synchronously.
    (function() {
      var ua = navigator.userAgent || '';
      var isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(ua);
      var screenW = window.screen ? window.screen.width : 900;
      if (!isMobile && screenW >= 900) {
        // Desktop: use real device width so media queries work properly
        document.write('<meta name="viewport" content="width=device-width, initial-scale=1">');
        document.documentElement.classList.add('is-desktop');
      } else {
        // Phone: keep the fixed 900px viewport so phone view stays unchanged
        document.write('<meta name="viewport" content="width=900, user-scalable=no">');
      }
    })();
  </script>`;

html = html.replace(oldViewportBlock, newViewportBlock);
fs.writeFileSync('tools/resumebuilder/index.html', html, 'utf8');
console.log('HTML fixed with document.write viewport approach');

// Also update CSS to use BOTH media query AND is-desktop class
let css = fs.readFileSync('tools/resumebuilder/style.css', 'utf8');

const desktopStart = css.indexOf('/* ===== LAPTOP / DESKTOP LAYOUT (class-based');
if (desktopStart !== -1) {
  css = css.substring(0, desktopStart);
}

const desktopCss = `
/* ===== LAPTOP / DESKTOP LAYOUT ===== */
/* Triggered by is-desktop class (set via document.write viewport + JS) */
/* Also triggered by min-width: 1241px for devices that already use device-width */

html.is-desktop .page,
@media (min-width: 1241px) { .page {
  width: 100% !important;
  max-width: 100% !important;
  padding: 0 24px !important;
  box-sizing: border-box !important;
} }
`;

// Actually let's just duplicate all rules with both selectors cleanly
const desktopRules = `
/* ===== LAPTOP / DESKTOP LAYOUT ===== */
/* Applied when screen >= 900px non-mobile device */

html.is-desktop .page { width: 100% !important; max-width: 100% !important; padding: 0 24px !important; box-sizing: border-box !important; }

/* Hero compact */
html.is-desktop .hero { max-width: 100% !important; padding: 14px 28px !important; margin: 0 0 14px 0 !important; display: flex !important; flex-direction: row !important; align-items: center !important; gap: 20px !important; }
html.is-desktop .hero-content { flex: 1 !important; }
html.is-desktop .hero-content h1 { font-size: 1.5rem !important; margin-bottom: 2px !important; }
html.is-desktop .hero-subtitle { font-size: 0.8rem !important; margin-bottom: 6px !important; }
html.is-desktop .eyebrow { font-size: 0.68rem !important; margin-bottom: 2px !important; }
html.is-desktop .hero-actions { margin-bottom: 6px !important; }
html.is-desktop .hero-metrics { display: flex !important; flex-direction: row !important; gap: 10px !important; }
html.is-desktop .metric { padding: 6px 10px !important; }
html.is-desktop .metric-value { font-size: 1rem !important; }
html.is-desktop .metric-label { font-size: 0.62rem !important; }
html.is-desktop .hero-visual { width: 120px !important; flex-shrink: 0 !important; }
html.is-desktop .hero-image { width: 100% !important; max-height: 90px !important; object-fit: contain !important; }

/* Tabs */
html.is-desktop .rb-tabs { max-width: 100% !important; margin: 0 0 10px 0 !important; }
html.is-desktop .wizard-header { max-width: 100% !important; margin: 0 0 10px 0 !important; }

/* Builder - side by side */
html.is-desktop .builder-layout { max-width: 100% !important; margin: 0 !important; padding: 0 !important; }
html.is-desktop .builder-columns { display: grid !important; grid-template-columns: 1fr 1fr !important; flex-direction: unset !important; gap: 16px !important; max-width: 100% !important; margin: 0 !important; align-items: start !important; }
html.is-desktop .form-panel { max-width: 100% !important; width: 100% !important; margin: 0 !important; max-height: calc(100vh - 160px) !important; overflow-y: auto !important; position: sticky !important; top: 60px !important; }
html.is-desktop .preview-panel { max-width: 100% !important; width: 100% !important; margin: 0 !important; }

/* JD Match full width */
html.is-desktop .jd-match { max-width: 100% !important; width: 100% !important; margin: 0 !important; box-sizing: border-box !important; }

/* Templates full width, no scroll */
html.is-desktop .templates { max-width: 100% !important; width: 100% !important; margin: 0 !important; padding: 0 !important; box-sizing: border-box !important; }
html.is-desktop .tpl-gallery { max-height: none !important; overflow-y: visible !important; overflow: visible !important; }
html.is-desktop .tpl-grid { grid-template-columns: repeat(5, 1fr) !important; gap: 10px !important; }
html.is-desktop .template-card { padding: 8px !important; }
html.is-desktop .template-preview { height: 90px !important; }
html.is-desktop .template-info h3 { font-size: 0.8rem !important; }
html.is-desktop .template-info p { font-size: 0.68rem !important; }

/* No scale transform on desktop preview */
html.is-desktop #resume-preview { transform: none !important; margin-bottom: 0 !important; width: 100% !important; }

/* Duplicate all above for media query as fallback */
@media (min-width: 1241px) {
  .page { width: 100% !important; max-width: 100% !important; padding: 0 24px !important; box-sizing: border-box !important; }
  .hero { max-width: 100% !important; padding: 14px 28px !important; margin: 0 0 14px 0 !important; display: flex !important; flex-direction: row !important; align-items: center !important; gap: 20px !important; }
  .hero-content { flex: 1 !important; }
  .hero-content h1 { font-size: 1.5rem !important; }
  .hero-subtitle { font-size: 0.8rem !important; }
  .hero-metrics { display: flex !important; flex-direction: row !important; gap: 10px !important; }
  .hero-visual { width: 120px !important; flex-shrink: 0 !important; }
  .hero-image { max-height: 90px !important; }
  .rb-tabs { max-width: 100% !important; margin: 0 0 10px 0 !important; }
  .wizard-header { max-width: 100% !important; margin: 0 0 10px 0 !important; }
  .builder-layout { max-width: 100% !important; margin: 0 !important; padding: 0 !important; }
  .builder-columns { display: grid !important; grid-template-columns: 1fr 1fr !important; flex-direction: unset !important; gap: 16px !important; max-width: 100% !important; margin: 0 !important; align-items: start !important; }
  .form-panel { max-width: 100% !important; width: 100% !important; margin: 0 !important; max-height: calc(100vh - 160px) !important; overflow-y: auto !important; position: sticky !important; top: 60px !important; }
  .preview-panel { max-width: 100% !important; width: 100% !important; margin: 0 !important; }
  .jd-match { max-width: 100% !important; width: 100% !important; margin: 0 !important; }
  .templates { max-width: 100% !important; width: 100% !important; margin: 0 !important; padding: 0 !important; }
  .tpl-gallery { max-height: none !important; overflow-y: visible !important; }
  .tpl-grid { grid-template-columns: repeat(5, 1fr) !important; gap: 10px !important; }
  .template-preview { height: 90px !important; }
  #resume-preview { transform: none !important; margin-bottom: 0 !important; width: 100% !important; }
}
`;

css = css + desktopRules;
fs.writeFileSync('tools/resumebuilder/style.css', css, 'utf8');
console.log('CSS updated!');
