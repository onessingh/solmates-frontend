(() => {
    let isAndroid = /android/i.test(navigator.userAgent);
    let isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone || (window.Capacitor && window.Capacitor.isNative);

    if (!isAndroid || isStandalone) return;

    function showBanner() {
        if (document.getElementById('solmates-install-banner')) return;

        const isDark = document.body.classList.contains('dark-theme') ||
                       document.documentElement.classList.contains('dark-theme') ||
                       document.body.getAttribute('data-theme') === 'dark' ||
                       window.matchMedia('(prefers-color-scheme: dark)').matches;

        const bg     = isDark ? '#1e2535' : '#ffffff';
        const border = isDark ? '#2e3a50' : '#eaeaea';
        const title  = isDark ? '#f1f5f9' : '#111111';
        const sub    = isDark ? '#94a3b8' : '#666666';
        const shadow = isDark ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.15)';
        const close  = isDark ? '#94a3b8' : '#999999';

        const banner = document.createElement('div');
        banner.id = 'solmates-install-banner';
        banner.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            width: 90%;
            max-width: 400px;
            background: ${bg};
            border-radius: 12px;
            box-shadow: 0 4px 15px ${shadow};
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 15px 20px;
            z-index: 999999;
            font-family: system-ui, -apple-system, sans-serif;
            border: 1px solid ${border};
        `;

        banner.innerHTML = `
            <div style="display: flex; align-items: center; gap: 15px;">
                <img src="/android-chrome-192x192.png" alt="Icon" style="width: 45px; height: 45px; border-radius: 8px;">
                <div>
                    <h4 style="margin: 0; font-size: 15px; color: ${title};">Solmates App</h4>
                    <p style="margin: 2px 0 0; font-size: 12px; color: ${sub};">Get the free app</p>
                </div>
            </div>
            <div style="display: flex; align-items: center; gap: 10px;">
                <button id="solmates-install-btn" style="background: #0f2b46; color: #fff; border: none; padding: 8px 16px; border-radius: 20px; font-weight: 600; font-size: 13px; cursor: pointer;">Install</button>
                <button id="solmates-close-banner" style="background: transparent; color: ${close}; border: none; font-size: 20px; cursor: pointer; padding: 0 5px;">&times;</button>
            </div>
        `;

        document.body.appendChild(banner);

        document.getElementById('solmates-close-banner').onclick = (e) => {
            e.stopPropagation();
            banner.remove();
        };

        document.getElementById('solmates-install-btn').onclick = (e) => {
            e.stopPropagation();
            banner.remove();
            window.location.href = '/solmates.apk';
        };

        // Hide when clicking outside
        setTimeout(() => {
            document.addEventListener('click', function hideOnOutsideClick(e) {
                if (!banner.contains(e.target)) {
                    banner.remove();
                    document.removeEventListener('click', hideOnOutsideClick);
                }
            });
        }, 100);
    }

    setTimeout(() => showBanner(), 3000);
})();
