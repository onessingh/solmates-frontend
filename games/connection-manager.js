/**
 * Solmates Connection Manager
 * Automatically handles Wake Lock (prevents screen sleep) and connection recovery when the user switches tabs or apps.
 */

let wakeLock = null;

// Function to request Wake Lock
async function requestWakeLock() {
    try {
        if ('wakeLock' in navigator) {
            wakeLock = await navigator.wakeLock.request('screen');
            wakeLock.addEventListener('release', () => {
                console.log('Wake Lock was released');
            });
            console.log('Wake Lock acquired successfully.');
        }
    } catch (err) {
        console.warn(`${err.name}, ${err.message}`);
    }
}

// Request wake lock when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    requestWakeLock();
});

// Re-request wake lock and attempt auto-reconnect when user returns to the tab
document.addEventListener('visibilitychange', async () => {
    if (document.visibilityState === 'visible') {
        // Re-acquire wake lock if released
        if (wakeLock !== null && wakeLock.released) {
            await requestWakeLock();
        }

        // Try to auto-reconnect PeerJS if it exists
        if (typeof peer !== 'undefined' && peer !== null) {
            let socketDead = false;
            try {
                // Check if internal WebSocket is not OPEN (readyState 1)
                if (peer.socket && peer.socket._socket && peer.socket._socket.readyState !== 1) {
                    socketDead = true;
                }
            } catch(e) {}

            if (peer.disconnected || socketDead) {
                console.log('Visibility restored: Connection dead. Force reconnecting PeerJS...');
                
                // If it's not officially disconnected but socket is dead, force disconnect first
                if (!peer.disconnected) {
                    peer.disconnect();
                }
                
                // Wait slightly then reconnect to same ID
                setTimeout(() => {
                    if (peer.destroyed) return; // Cannot reconnect if completely destroyed
                    peer.reconnect();
                }, 500);
                
                if (typeof showToast === 'function') {
                    showToast('Restoring room connection...');
                }
            }
        }
    }
});
