
          // Extract Native FCM Token and permissions from TWA URL parameter
      (function() {
        const urlParams = new URLSearchParams(window.location.search);
        let modified = false;

        const fcmDenied = urlParams.get('fcm_denied');
        if (fcmDenied === 'true') {
          localStorage.setItem('sol_native_permission_denied', 'true');
          urlParams.delete('fcm_denied');
          modified = true;
        } else if (urlParams.has('fcm_token')) {
          localStorage.removeItem('sol_native_permission_denied');
        }

        const fcmToken = urlParams.get('fcm_token');
        if (fcmToken) {
          localStorage.setItem('solmates_fcm_token', fcmToken);
          if (!localStorage.getItem('sol_subscribed_sems')) {
              localStorage.setItem('sol_subscribed_sems', JSON.stringify(['all']));
              localStorage.setItem('sol_notif_enabled', 'true');
          }
          urlParams.delete('fcm_token');
          modified = true;
        }
        if (urlParams.has('v')) { urlParams.delete('v'); modified = true; }
        
        if (modified) {
          const newUrl = window.location.pathname + (urlParams.toString() ? '?' + urlParams.toString() : '');
          window.history.replaceState({}, document.title, newUrl);
        }
      })();


// Set theme-color IMMEDIATELY before anything renders (for TWA nav bar)
    (function() {
      var t = localStorage.getItem('solmates_theme');
      var m = document.getElementById('theme-color-meta');
      if (t === 'dark' && m) m.setAttribute('content', '#0f172a');
    })();
  
