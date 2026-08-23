const fs = require('fs');

// 1. Replace viewport + detection script in index.html
let html = fs.readFileSync('tools/resumebuilder/index.html', 'utf8');

// Replace the viewport + script we added
html = html.replace(
  `  <meta name="viewport" content="width=900, user-scalable=no" id="vp-meta" />
  <script>
    (function() {
      // On real laptops/desktops (actual screen >= 1000px), switch to device-width viewport
      // Phone stays on the fixed width=900 viewport so nothing breaks
      if (window.screen.width >= 1000 && !/Mobi|Android/i.test(navigator.userAgent)) {
        document.getElementById('vp-meta').setAttribute('content', 'width=device-width, initial-scale=1');
      }
    })();
  </script>`,
  `  <meta name="viewport" content="width=900, user-scalable=no" />
  <script>
    (function() {
      // Add is-desktop class to <html> so CSS can target desktop without relying on viewport width
      if (window.screen.width >= 1000 && !/Mobi|Android/i.test(navigator.userAgent)) {
        document.documentElement.classList.add('is-desktop');
      }
    })();
  </script>`
);
fs.writeFileSync('tools/resumebuilder/index.html', html, 'utf8');
console.log('HTML updated');

// 2. Fix CSS - replace media query with .is-desktop class selectors
let css = fs.readFileSync('tools/resumebuilder/style.css', 'utf8');

// Remove old desktop block
const desktopStart = css.indexOf('/* ===== LAPTOP / DESKTOP LAYOUT (min-width: 1241px) =====');
if (desktopStart !== -1) {
  css = css.substring(0, desktopStart);
}

const desktopCss = `
/* ===== LAPTOP / DESKTOP LAYOUT (class-based, screen >= 1000px) ===== */
/* is-desktop class is added by JS when screen.width >= 1000 and not mobile UA */
/* Phone stays on width=900 viewport - NOTHING below affects phones */

html.is-desktop .page {
  width: 100% !important;
  max-width: 100% !important;
  padding: 0 24px !important;
  box-sizing: border-box !important;
}

/* Hero: slim horizontal strip */
html.is-desktop .hero {
  max-width: 100% !important;
  padding: 14px 28px !important;
  margin: 0 0 14px 0 !important;
  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;
  gap: 20px !important;
}
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

/* Tabs: full width */
html.is-desktop .rb-tabs {
  max-width: 100% !important;
  margin: 0 0 10px 0 !important;
}

/* Wizard header: full width */
html.is-desktop .wizard-header {
  max-width: 100% !important;
  margin: 0 0 10px 0 !important;
}

/* Builder layout: side-by-side form + preview, full width */
html.is-desktop .builder-layout {
  max-width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
}

html.is-desktop .builder-columns {
  display: grid !important;
  grid-template-columns: 1fr 1fr !important;
  flex-direction: unset !important;
  gap: 16px !important;
  max-width: 100% !important;
  margin: 0 !important;
  align-items: start !important;
}

html.is-desktop .form-panel {
  max-width: 100% !important;
  width: 100% !important;
  margin: 0 !important;
  max-height: calc(100vh - 180px) !important;
  overflow-y: auto !important;
  position: sticky !important;
  top: 60px !important;
}

html.is-desktop .preview-panel {
  max-width: 100% !important;
  width: 100% !important;
  margin: 0 !important;
}

/* JD Match: full width */
html.is-desktop .jd-match {
  max-width: 100% !important;
  width: 100% !important;
  margin: 0 !important;
  box-sizing: border-box !important;
}

html.is-desktop .jd-panel {
  width: 100% !important;
}

/* Templates: full width, no scrolling */
html.is-desktop .templates {
  max-width: 100% !important;
  width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
  box-sizing: border-box !important;
}

html.is-desktop .tpl-gallery {
  max-height: none !important;
  overflow-y: visible !important;
  overflow: visible !important;
}

html.is-desktop .tpl-grid {
  grid-template-columns: repeat(5, 1fr) !important;
  gap: 10px !important;
}

html.is-desktop .template-card {
  padding: 8px !important;
  min-height: auto !important;
}

html.is-desktop .template-preview {
  height: 90px !important;
}

html.is-desktop .template-info h3 {
  font-size: 0.8rem !important;
}

html.is-desktop .template-info p {
  font-size: 0.68rem !important;
}

/* No transform on preview */
html.is-desktop #resume-preview {
  transform: none !important;
  margin-bottom: 0 !important;
  width: 100% !important;
}
`;

css = css + desktopCss;
fs.writeFileSync('tools/resumebuilder/style.css', css, 'utf8');
console.log('CSS updated with .is-desktop class selectors!');
