(() => {
    if (localStorage.getItem('hideInstallBanner') === 'true') return;

    let deferredPrompt = null;
    let isAndroid = /android/i.test(navigator.userAgent);
    let isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;

    if (isStandalone) return;

    function showBanner(type) {
        if (document.getElementById('solmates-install-banner')) return;

        const banner = document.createElement('div');
        banner.id = 'solmates-install-banner';
        banner.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            width: 90%;
            max-width: 400px;
            background: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.15);
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 15px 20px;
            z-index: 999999;
            font-family: system-ui, -apple-system, sans-serif;
            border: 1px solid #eaeaea;
        `;

        banner.innerHTML = `
            <div style="display: flex; align-items: center; gap: 15px;">
                <img src="/android-chrome-192x192.png" alt="Icon" style="width: 45px; height: 45px; border-radius: 8px;">
                <div>
                    <h4 style="margin: 0; font-size: 15px; color: #111;">Solmates App</h4>
                    <p style="margin: 2px 0 0; font-size: 12px; color: #666;">Get the free app</p>
                </div>
            </div>
            <div style="display: flex; align-items: center; gap: 10px;">
                <button id="solmates-install-btn" style="background: #007bff; color: #fff; border: none; padding: 8px 16px; border-radius: 20px; font-weight: 600; font-size: 13px; cursor: pointer;">Install</button>
                <button id="solmates-close-banner" style="background: transparent; color: #999; border: none; font-size: 20px; cursor: pointer; padding: 0 5px;">&times;</button>
            </div>
        `;

        document.body.appendChild(banner);

        document.getElementById('solmates-close-banner').onclick = () => {
            banner.remove();
            localStorage.setItem('hideInstallBanner', 'true');
        };

        document.getElementById('solmates-install-btn').onclick = async () => {
            banner.remove();
            localStorage.setItem('hideInstallBanner', 'true');
            if (type === 'android') {
                window.location.href = '/solmates.apk';
            } else if (type === 'pwa' && deferredPrompt) {
                deferredPrompt.prompt();
                await deferredPrompt.userChoice;
                deferredPrompt = null;
            }
        };
    }

    if (isAndroid) {
        setTimeout(() => showBanner('android'), 3000);
    } else {
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            showBanner('pwa');
        });
    }
})();
