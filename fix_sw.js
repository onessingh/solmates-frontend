const fs = require('fs');
const path = require('path');

function removeUnregister(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace the service worker unregister block with a simple cache update log
  content = content.replace(
    /if \('serviceWorker' in navigator\) \{[\s\n]*const regs = await navigator\.serviceWorker\.getRegistrations\(\);[\s\n]*await Promise\.all\(regs\.map\(function\(r\) \{ return r\.unregister\(\); \}\)\);[\s\n]*\}/g,
    '// SW unregister removed to preserve Push Subscriptions\n          if ("serviceWorker" in navigator) { console.log("Updating SW caches..."); }'
  );
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Fixed:', filePath);
}

removeUnregister('c:/Users/Toshiba/OneDrive/Desktop/solmates/frontend/index.html');
removeUnregister('c:/Users/Toshiba/OneDrive/Desktop/solmates/frontend/notification.html');

// Add auto-heal to notification.html
let notifContent = fs.readFileSync('c:/Users/Toshiba/OneDrive/Desktop/solmates/frontend/notification.html', 'utf8');
const healLogic = `
        // Auto-heal push subscriptions
        if (localStorage.getItem('sol_notif_enabled') === 'true') {
           if (window.solmatesAPI && window.solmatesAPI.subscribeToPush) {
              const lastSync = localStorage.getItem('sol_push_last_sync_autoheal');
              const now = Date.now();
              if (!lastSync || now - parseInt(lastSync) > 86400000) {
                 let semArr = ['all'];
                 try { semArr = JSON.parse(localStorage.getItem('sol_subscribed_sems')) || ['all']; } catch(e){}
                 window.solmatesAPI.subscribeToPush(semArr).catch(e => console.warn('Auto-heal failed', e));
                 localStorage.setItem('sol_push_last_sync_autoheal', now.toString());
              }
           }
        }
`;
if (!notifContent.includes('Auto-heal push subscriptions')) {
  notifContent = notifContent.replace(
    /if \(window\.solmatesAPI && window\.solmatesAPI\.subscribeToPush\) updateNotifyUI\(\);/,
    healLogic + '\n        if (window.solmatesAPI && window.solmatesAPI.subscribeToPush) updateNotifyUI();'
  );
  fs.writeFileSync('c:/Users/Toshiba/OneDrive/Desktop/solmates/frontend/notification.html', notifContent, 'utf8');
  console.log('Added auto-heal to notification.html');
}

// Do the same for index.html if it has push logic (it doesn't have subscribe logic normally, but let's check)

