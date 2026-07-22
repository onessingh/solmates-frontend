// Robust Storage Fallback (v113.3)
(function() {
  let storageSupported = true;
  try {
    const testKey = '__storage_test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
  } catch (e) {
    storageSupported = false;
  }

  if (!storageSupported) {
    console.warn('[STORAGE] localStorage/sessionStorage is blocked or throwing. Falling back to memory storage.');
    const createMemoryStorage = () => {
      const store = {};
      return {
        getItem: function(key) {
          return key in store ? store[key] : null;
        },
        setItem: function(key, value) {
          store[key] = String(value);
        },
        removeItem: function(key) {
          delete store[key];
        },
        clear: function() {
          for (let key in store) delete store[key];
        },
        key: function(index) {
          const keys = Object.keys(store);
          return keys[index] || null;
        },
        get length() {
          return Object.keys(store).length;
        }
      };
    };

    try {
      Object.defineProperty(window, 'localStorage', {
        value: createMemoryStorage(),
        writable: true,
        configurable: true
      });
      Object.defineProperty(window, 'sessionStorage', {
        value: createMemoryStorage(),
        writable: true,
        configurable: true
      });
    } catch (err) {
      // Direct assignment fallback
      try {
        window.localStorage = createMemoryStorage();
        window.sessionStorage = createMemoryStorage();
      } catch (err2) {
        console.error('[STORAGE] Critical: Could not redefine storage objects', err2);
      }
    }
  }
  // Define backward compatibility aliases
  window.safeStorage = window.localStorage;
  window.safeSessionStorage = window.sessionStorage;
})();
window.SOL_APP_VERSION = '117.8';
// Floating Mobile Debug Console (v113.2)
(function() {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('debug') === 'true' || localStorage.getItem('solmates_debug') === 'true') {
    localStorage.setItem('solmates_debug', 'true');
    
    // Create UI overlay
    const container = document.createElement('div');
    container.id = 'sol-debug-console';
    container.style = 'position:fixed;bottom:0;left:0;right:0;height:180px;background:rgba(0,0,0,0.85);color:#00ff00;font-family:monospace;font-size:10px;overflow-y:auto;z-index:999999;padding:10px;border-top:2px solid #ff3b30;pointer-events:auto;user-select:text !important;-webkit-user-select:text !important;';
    
    const header = document.createElement('div');
    header.style = 'font-weight:bold;margin-bottom:5px;color:#ff9500;display:flex;justify-content:space-between;';
    header.innerHTML = '<span>SOLMATES DEBUG CONSOLE</span><button onclick="localStorage.removeItem(\'solmates_debug\');document.getElementById(\'sol-debug-console\').remove();" style="background:red;color:white;border:none;padding:2px 5px;cursor:pointer;">Disable</button>';
    container.appendChild(header);
    
    const logList = document.createElement('div');
    logList.id = 'sol-debug-logs';
    container.appendChild(logList);
    
    const appendToLogs = (text, color) => {
      const p = document.createElement('p');
      p.style.color = color;
      p.style.margin = '2px 0';
      p.style.whiteSpace = 'pre-wrap';
      p.innerText = text;
      logList.appendChild(p);
      container.scrollTop = container.scrollHeight;
    };
    
    if (document.body) {
      document.body.appendChild(container);
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        document.body.appendChild(container);
      });
    }
    
    const origLog = console.log;
    const origError = console.error;
    const origWarn = console.warn;
    
    window.onerror = function(msg, url, lineNo, columnNo, error) {
      appendToLogs('[CRASH] ' + msg + '\n  at ' + url + ':' + lineNo + ':' + (columnNo || 0), '#ff3b30');
      if (origError) origError(msg, url, lineNo);
      return false;
    };
    
    console.error = function(...args) {
      appendToLogs('[ERROR] ' + args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '), '#ff9500');
      if (origError) origError.apply(console, args);
    };

    console.warn = function(...args) {
      appendToLogs('[WARN] ' + args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '), '#ffcc00');
      if (origWarn) origWarn.apply(console, args);
    };

    console.log = function(...args) {
      appendToLogs('[LOG] ' + args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '), '#00ff00');
      if (origLog) origLog.apply(console, args);
    };
  }
})();

/**
 * SOLMATES Production API Configuration
 * HIGH FIX #4: Environment-based configuration for production deployment
 * 
 * =============================================================================
 * DEPLOYMENT INSTRUCTIONS - READ CAREFULLY BEFORE DEPLOYING
 * =============================================================================
 * 
 * 1. BEFORE DEPLOYMENT: Replace 'YOUR_BACKEND_URL_HERE' with your actual backend URL
 * 2. Include this file BEFORE api-client.js in ALL HTML files
 * 3. Ensure the URL does NOT have a trailing slash
 * 
 * =============================================================================
 * EXAMPLE CONFIGURATIONS
 * =============================================================================
 * 
 * Render.com:
 *   window.PRODUCTION_API_URL = 'YOUR_BACKEND_URL_HERE/api';
 * 
 * Heroku:
 *   window.PRODUCTION_API_URL = 'https://solmates-api.herokuapp.com/api';
 * 
 * Railway:
 *   window.PRODUCTION_API_URL = 'https://solmates-backend.up.railway.app/api';
 * 
 * AWS/DigitalOcean/Custom:
 *   window.PRODUCTION_API_URL = 'https://api.solmates.com/api';
 * 
 * Vercel with Proxy (requires vercel.json configuration):
 *   window.PRODUCTION_API_URL = '/api';
 * 
 * =============================================================================
 * CONFIGURATION
 * =============================================================================
 */

// ⚠️  REPLACE THIS WITH YOUR ACTUAL BACKEND URL BEFORE DEPLOYMENT
// Examples:
// - Render: 'https://solmates-backend-w27e.onrender.com/api'
// - Heroku: 'https://solmates-api.herokuapp.com/api'
// - Railway: 'https://solmates-backend.up.railway.app/api'

// Production backend URL — Render deployment (must match backend CORS FRONTEND_URL)
window.PRODUCTION_API_URL = 'https://solmates-backend-w27e.onrender.com/api';

// RENDER_BACKEND_URL: Used by Socket.io to connect directly to backend
// Must be the base URL WITHOUT /api suffix
// Required if PRODUCTION_API_URL is set to a relative path like '/api'
window.RENDER_BACKEND_URL = 'https://solmates-backend-w27e.onrender.com';

// For local development, comment out the line above and api-client.js
// will auto-detect localhost:3000 automatically.

// For local development, this will auto-detect localhost
// For production, you MUST set the URL above

/**
 * Alternative: Set via window.API_CONFIG for advanced configuration
 * 
 * window.API_CONFIG = {
 *   baseURL: 'https://api.solmates.com/api',
 *   timeout: 30000
 * };
 */

/**
 * =============================================================================
 * DEPLOYMENT VERIFICATION
 * =============================================================================
 * 
 * After deployment, verify:
 * 1. Open browser developer console
 * 2. Check for errors related to API calls
 * 3. Verify content loads dynamically
 * 4. Test admin login
 * 5. No CORS errors appear
 * 
 * If you see "PRODUCTION_API_URL not configured" error:
 *   → You forgot to update this file with your backend URL
 * 
 * If you see CORS errors:
 *   → Check backend FRONTEND_URL environment variable matches your frontend domain
 * 
 * =============================================================================
 */


// ========== NUCLEAR LOCKDOWN MODE (v89.0 Security) ========== 

// 1. SILENCE CONSOLE: Wipe all logs so they don't see any data
if (false) { // Set to true for production
    if (typeof console !== "undefined") {
        const dummy = () => {};
        console.log = dummy;
        console.warn = dummy;
        console.error = dummy;
        console.info = dummy;
        console.debug = dummy;
    }
}

// 2. BLOCK INSPECTION SHORTCUTS & RIGHT CLICK
if (typeof document !== "undefined") {
    // Disable Right Click
    document.addEventListener('contextmenu', (e) => e.preventDefault());
    
    // Disable Selection (Total Lockdown v112.0)
    document.onselectstart = (e) => e.preventDefault();
    if (document.body) {
        document.body.onselectstart = (e) => e.preventDefault();
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            if (document.body) document.body.onselectstart = (e) => e.preventDefault();
        });
    }

    document.addEventListener('keydown', function(e) {
        // Prevent F12 (123)
        if (e.key === 'F12' || e.keyCode === 123) {
            e.preventDefault();
            return false;
        }
        // Prevent Ctrl+Shift+I / J / C (Inspect Tools)
        if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) {
            e.preventDefault();
            return false;
        }
        // Prevent Ctrl+U (View Source)
        if (e.ctrlKey && (e.key === 'U' || e.key === 'u')) {
            e.preventDefault();
            return false;
        }
        // Prevent Ctrl+S (Save Page)
        if (e.ctrlKey && (e.key === 'S' || e.key === 's')) {
            e.preventDefault();
            return false;
        }
    });

    // 3. DEVTOOLS DETERRENT: Pauses the debugger if console is open
    /* 
    setInterval(function() {
        const startTime = performance.now();
        debugger; 
        if (performance.now() - startTime > 100) {
            // User likely focused the debugger
            window.location.reload(); 
        }
    }, 1000);
    */
    // 4. [v111.9] GLOBAL SEARCH SUPPRESSION: Nuclear Fallback
    (function () {
        const inject = () => {
          // A. Inject notranslate meta
          if (!document.querySelector('meta[name="google"][content="notranslate"]')) {
              const meta = document.createElement('meta');
              meta.name = 'google';
              meta.content = 'notranslate';
              document.head.appendChild(meta);
          }
          // B. Inject global lockdown CSS
          if (!document.querySelector('link[href*="global-lockdown.css"]')) {
              const link = document.createElement('link');
              link.rel = 'stylesheet';
              link.href = '/css/global-lockdown.css?v=111.9';
              document.head.appendChild(link);
          }
          // C. Inject E-Notepad CSS
          if (!document.querySelector('link[href*="floating-notepad.css"]')) {
              const link = document.createElement('link');
              link.rel = 'stylesheet';
              link.href = '/css/floating-notepad.css?v=116.5';
              document.head.appendChild(link);
          }
          // D. Inject E-Notepad JS
          if (!document.querySelector('script[src*="floating-notepad.js"]')) {
              const script = document.createElement('script');
              script.src = '/js/floating-notepad.js?v=116.10';
              script.defer = true;
              document.head.appendChild(script);
          }
        };
        if (document.head) inject();
        else document.addEventListener('DOMContentLoaded', inject);
    })();
}
