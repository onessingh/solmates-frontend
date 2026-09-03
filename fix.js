const fs = require('fs');

let notif = fs.readFileSync('notification.html', 'utf8');
notif = notif.replace(
    'if (confirm("Stop receiving notifications on this device?")) {',
    'if (confirm("Stop receiving notifications on this device?")) { try { window.solmatesAPI && window.solmatesAPI.unsubscribeFromPush(); } catch(e){} '
);
fs.writeFileSync('notification.html', notif);

let idx = fs.readFileSync('index.html', 'utf8');
idx = idx.replace(
    'if (window.solmatesAPI && typeof window.solmatesAPI.silentPushTokenRefresh === \'function\') {',
    'if (localStorage.getItem("sol_notif_enabled") !== "false" && window.solmatesAPI && typeof window.solmatesAPI.silentPushTokenRefresh === "function") {'
);
fs.writeFileSync('index.html', idx);
console.log("Done");
