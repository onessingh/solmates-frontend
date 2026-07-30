// ==========================================
// CAPACITOR PREMIUM FEATURES INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', async () => {
    if (window.Capacitor && window.Capacitor.isNative) {
        
        const { StatusBar } = window.Capacitor.Plugins.StatusBar ? window.Capacitor.Plugins : {};
        const { CapacitorUpdater } = window.Capacitor.Plugins.CapacitorUpdater ? window.Capacitor.Plugins : {};
        const { App } = window.Capacitor.Plugins.App ? window.Capacitor.Plugins : {};
        const { Browser } = window.Capacitor.Plugins.Browser ? window.Capacitor.Plugins : {};

        // 1. DYNAMIC STATUS BAR
        if (StatusBar) {
            const syncStatusBar = async () => {
                const theme = document.documentElement.getAttribute('data-solmates-theme') || localStorage.getItem('solmates_theme') || 'light';
                try {
                    if (theme === 'dark') {
                        await StatusBar.setStyle({ style: 'DARK' });
                        await StatusBar.setBackgroundColor({ color: '#0f172a' }); 
                    } else {
                        await StatusBar.setStyle({ style: 'LIGHT' });
                        await StatusBar.setBackgroundColor({ color: '#ffffff' }); 
                    }
                } catch (e) {
                    console.log('Status Bar Error:', e);
                }
            };
            
            syncStatusBar();
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.attributeName === 'data-solmates-theme') {
                        syncStatusBar();
                    }
                });
            });
            observer.observe(document.documentElement, { attributes: true });
        }

        // 2. SILENT AUTO UPDATE (Like Instagram)
        if (CapacitorUpdater) {
            try {
                await CapacitorUpdater.notifyAppReady();
                const response = await fetch('https://solmates.in/version.json?t=' + Date.now());
                if (response.ok) {
                    const data = await response.json();
                    const currentVersion = localStorage.getItem('solmates_apk_version') || '1.0.0';
                    
                    if (data.version && data.version !== currentVersion) {
                        // Silent Download
                        const update = await CapacitorUpdater.download({
                            version: data.version,
                            url: data.url
                        });
                        localStorage.setItem('solmates_apk_version', data.version);
                        
                        // Apply silently on next restart, or instantly if we wanted, but silent means setting it as pending.
                        // Setting it right away usually restarts the app instantly.
                        // We will set it right away since users expect updates to take effect.
                        await CapacitorUpdater.set({ id: update.id });
                    }
                }
            } catch (e) {
                console.log('OTA Error:', e);
            }
        }

        // 3. HARDWARE BACK BUTTON FIX
        if (App) {
            App.addListener('backButton', ({ canGoBack }) => {
                const currentPath = window.location.pathname;
                if (currentPath === '/index.html' || currentPath === '/' || currentPath === '') {
                    // We are at root, exit app
                    App.exitApp();
                } else {
                    // We can go back
                    window.history.back();
                }
            });
        }

        // 4. IN-APP BROWSER FOR EXTERNAL LINKS
        if (Browser) {
            document.body.addEventListener('click', async (e) => {
                const link = e.target.closest('a');
                if (link && link.getAttribute('target') === '_blank') {
                    e.preventDefault();
                    await Browser.open({ url: link.href, presentationStyle: 'popover' });
                }
            });
        }
    }
});
