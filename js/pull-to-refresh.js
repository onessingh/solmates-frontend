// ==========================================
// PULL TO REFRESH IMPLEMENTATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // Only enable if Capacitor is native
    if (!window.Capacitor || !window.Capacitor.isNative) return;

    let startY = 0;
    let currentY = 0;
    let isPulling = false;
    const threshold = 120; // How far to pull down before refresh triggers

    // Create refresh indicator UI
    const refresher = document.createElement('div');
    refresher.id = 'sol-ptr-indicator';
    refresher.innerHTML = `
        <div style="
            position: fixed;
            top: -50px;
            left: 50%;
            transform: translateX(-50%);
            background: white;
            color: #0f2b46;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 10px rgba(0,0,0,0.15);
            z-index: 9999;
            transition: top 0.2s ease, transform 0.2s ease;
            font-size: 20px;
            opacity: 0;
        ">
            <i class="fas fa-sync-alt" id="sol-ptr-icon"></i>
        </div>
    `;
    document.body.appendChild(refresher);
    const indicator = refresher.firstElementChild;
    const icon = document.getElementById('sol-ptr-icon');

    document.addEventListener('touchstart', (e) => {
        if (window.scrollY === 0) {
            startY = e.touches[0].clientY;
            isPulling = true;
            indicator.style.transition = 'none'; // Follow finger exactly
        }
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
        if (!isPulling) return;
        
        currentY = e.touches[0].clientY;
        const diff = currentY - startY;

        if (diff > 0 && window.scrollY === 0) {
            // Prevent default scroll bounce
            if (e.cancelable) e.preventDefault();
            
            // Move indicator
            const pullDistance = Math.min(diff, threshold + 20);
            indicator.style.opacity = Math.min(diff / 50, 1);
            indicator.style.top = `${-50 + (pullDistance * 0.7)}px`;
            
            // Rotate icon based on pull distance
            icon.style.transform = `rotate(${diff * 2}deg)`;
        }
    }, { passive: false });

    document.addEventListener('touchend', () => {
        if (!isPulling) return;
        isPulling = false;
        
        const diff = currentY - startY;
        
        indicator.style.transition = 'top 0.3s ease, opacity 0.3s ease';

        if (diff >= threshold && window.scrollY === 0) {
            // Trigger refresh
            indicator.style.top = '20px';
            icon.style.animation = 'spin 1s linear infinite';
            
            // Reload page after a tiny delay for visual effect
            setTimeout(() => {
                window.location.reload();
            }, 500);
        } else {
            // Cancel refresh, hide indicator
            indicator.style.top = '-50px';
            indicator.style.opacity = '0';
            setTimeout(() => {
                icon.style.transform = 'rotate(0deg)';
            }, 300);
        }
        
        currentY = 0;
    });

    // Add CSS for spinning animation if not exists
    if (!document.getElementById('sol-ptr-style')) {
        const style = document.createElement('style');
        style.id = 'sol-ptr-style';
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
});
