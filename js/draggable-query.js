/**
 * Solmates - Draggable Ask Query Button (Hold to Move)
 * Requires long-press / hold (~350ms) before dragging is enabled.
 * If user attempts to drag without holding, displays a sleek "Hold to move ✋" tooltip.
 * Quick tap/click continues to open the Ask Query modal normally.
 * Remembers dragged position across page reloads/navigations via localStorage.
 */
(function() {
  'use strict';

  function initDraggableQuery() {
    const btn = document.getElementById('queryFloatBtn');
    if (!btn || btn.__draggableInitialized) return;
    btn.__draggableInitialized = true;

    // Inject styles for hold-to-move, smooth dragging, and sleek tooltip
    const styleId = 'solmates-draggable-query-style';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        #queryFloatBtn {
          position: fixed;
          touch-action: none !important;
          user-select: none !important;
          -webkit-user-select: none !important;
          -webkit-touch-callout: none !important;
          cursor: pointer;
          transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        #queryFloatBtn svg,
        #queryFloatBtn * {
          pointer-events: none !important;
        }
        #queryFloatBtn.is-hold-unlocked {
          transform: scale(1.08) !important;
          box-shadow: 0 10px 28px rgba(15,43,70,0.65), 0 0 0 3px rgba(56, 189, 248, 0.5) !important;
          cursor: grabbing !important;
        }
        #queryFloatBtn.is-dragging {
          cursor: grabbing !important;
          opacity: 0.95 !important;
          box-shadow: 0 12px 30px rgba(15,43,70,0.7), 0 0 0 3px rgba(56, 189, 248, 0.6) !important;
          transform: scale(1.08) !important;
          transition: none !important;
          z-index: 10001 !important;
        }
        #queryHoldTip {
          position: absolute;
          bottom: calc(100% + 10px);
          left: 50%;
          transform: translateX(-50%) translateY(4px);
          background: rgba(15, 23, 42, 0.94);
          color: #ffffff;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.3px;
          padding: 5px 12px;
          border-radius: 20px;
          white-space: nowrap;
          pointer-events: none !important;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s ease;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          z-index: 10002;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        #queryHoldTip::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border-width: 5px;
          border-style: solid;
          border-color: rgba(15, 23, 42, 0.94) transparent transparent transparent;
        }
        #queryHoldTip.tip-bottom {
          bottom: auto;
          top: calc(100% + 10px);
          transform: translateX(-50%) translateY(-4px);
        }
        #queryHoldTip.tip-bottom::after {
          top: auto;
          bottom: 100%;
          border-color: transparent transparent rgba(15, 23, 42, 0.94) transparent;
        }
        #queryHoldTip.show {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0);
        }
        @media (max-width: 768px) {
          #queryFloatBtn {
            padding: 7px 12px !important;
            font-size: 12px !important;
            border-radius: 30px !important;
            gap: 5px !important;
            box-shadow: 0 3px 12px rgba(15,43,70,0.35) !important;
          }
          #queryFloatBtn svg {
            width: 14px !important;
            height: 14px !important;
          }
        }
      `;
      document.head.appendChild(style);
    }

    // Create & append Hold Tooltip
    let tip = document.getElementById('queryHoldTip');
    if (!tip) {
      tip = document.createElement('div');
      tip.id = 'queryHoldTip';
      tip.innerHTML = 'Hold to move ✋';
      btn.appendChild(tip);
    }

    let tipTimer = null;
    function showHoldTip(text, durationMs) {
      if (!tip) return;
      tip.innerHTML = text || 'Hold to move ✋';
      const rect = btn.getBoundingClientRect();
      if (rect.top < 50) {
        tip.classList.add('tip-bottom');
      } else {
        tip.classList.remove('tip-bottom');
      }
      tip.classList.add('show');
      if (tipTimer) clearTimeout(tipTimer);
      if (durationMs !== 0) {
        tipTimer = setTimeout(() => {
          tip.classList.remove('show');
        }, durationMs || 1500);
      }
    }

    function hideHoldTip() {
      if (tipTimer) clearTimeout(tipTimer);
      if (tip) tip.classList.remove('show');
    }

    const margin = 10;
    const HOLD_DELAY = 350; // Hold threshold in milliseconds
    const DRAG_SLOP = 8;    // Minimum movement before triggering drag / warning

    let holdTimer = null;
    let isHoldUnlocked = false;
    let isDragging = false;
    let hasMoved = false;
    let attemptedPrematureMove = false;
    let startX = 0;
    let startY = 0;
    let initialLeft = 0;
    let initialTop = 0;
    let suppressClickUntil = 0;

    // Helper: Clamp coordinate within viewport bounds
    function clampPosition(x, y) {
      const btnW = btn.offsetWidth || 120;
      const btnH = btn.offsetHeight || 44;
      const maxLeft = Math.max(margin, window.innerWidth - btnW - margin);
      const maxTop = Math.max(margin, window.innerHeight - btnH - margin);
      return {
        left: Math.min(Math.max(margin, x), maxLeft),
        top: Math.min(Math.max(margin, y), maxTop)
      };
    }

    // Helper: Apply position
    function setPosition(x, y) {
      const clamped = clampPosition(x, y);
      btn.style.left = clamped.left + 'px';
      btn.style.top = clamped.top + 'px';
      btn.style.right = 'auto';
      btn.style.bottom = 'auto';
      return clamped;
    }

    // Restore saved position if user previously moved it
    try {
      const saved = JSON.parse(localStorage.getItem('solmates_query_btn_pos'));
      if (saved && typeof saved.left === 'number' && typeof saved.top === 'number') {
        setPosition(saved.left, saved.top);
      }
    } catch (e) {}

    // Adjust position on window resize
    window.addEventListener('resize', function() {
      if (btn.style.left && btn.style.top && btn.style.right === 'auto') {
        const currLeft = parseFloat(btn.style.left) || margin;
        const currTop = parseFloat(btn.style.top) || margin;
        setPosition(currLeft, currTop);
      }
    });

    // Pointer events implementation
    function onPointerDown(e) {
      // Only primary mouse button or touch
      if (e.button !== undefined && e.button !== 0) return;

      isHoldUnlocked = false;
      isDragging = false;
      hasMoved = false;
      attemptedPrematureMove = false;
      startX = e.clientX;
      startY = e.clientY;

      const rect = btn.getBoundingClientRect();
      initialLeft = rect.left;
      initialTop = rect.top;

      try {
        btn.setPointerCapture(e.pointerId);
      } catch (err) {}

      // Start hold timer (~350ms)
      if (holdTimer) clearTimeout(holdTimer);
      holdTimer = setTimeout(() => {
        isHoldUnlocked = true;
        btn.classList.add('is-hold-unlocked');
        if (navigator.vibrate) {
          try { navigator.vibrate(35); } catch (err) {}
        }
        showHoldTip('Drag to move ✥', 1200);
      }, HOLD_DELAY);
    }

    function onPointerMove(e) {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      const dist = Math.hypot(dx, dy);

      // If hold delay hasn't completed yet
      if (!isHoldUnlocked) {
        // If user tries to drag before holding:
        if (dist > DRAG_SLOP) {
          if (holdTimer) {
            clearTimeout(holdTimer);
            holdTimer = null;
          }
          attemptedPrematureMove = true;
          showHoldTip('Hold to move ✋', 1500);
        }
        return;
      }

      // Hold is unlocked -> User can now drag freely!
      if (!hasMoved) {
        if (dist > 4) {
          hasMoved = true;
          isDragging = true;
          btn.classList.add('is-dragging');
        } else {
          return;
        }
      }

      setPosition(initialLeft + dx, initialTop + dy);
      if (e.cancelable) e.preventDefault();
    }

    function onPointerUp(e) {
      if (holdTimer) {
        clearTimeout(holdTimer);
        holdTimer = null;
      }

      try {
        btn.releasePointerCapture(e.pointerId);
      } catch (err) {}

      btn.classList.remove('is-hold-unlocked');
      btn.classList.remove('is-dragging');

      if (hasMoved || attemptedPrematureMove || isHoldUnlocked) {
        suppressClickUntil = Date.now() + 400;
      }

      if (hasMoved) {
        const rect = btn.getBoundingClientRect();
        try {
          localStorage.setItem('solmates_query_btn_pos', JSON.stringify({
            left: rect.left,
            top: rect.top
          }));
        } catch (err) {}
        hideHoldTip();
      } else if (!attemptedPrematureMove) {
        hideHoldTip();
      }

      isHoldUnlocked = false;
      isDragging = false;
    }

    if (window.PointerEvent) {
      btn.addEventListener('pointerdown', onPointerDown);
      btn.addEventListener('pointermove', onPointerMove);
      btn.addEventListener('pointerup', onPointerUp);
      btn.addEventListener('pointercancel', onPointerUp);
    } else {
      // Touch fallback for legacy environments
      btn.addEventListener('touchstart', function(e) {
        const t = e.touches[0];
        onPointerDown({ clientX: t.clientX, clientY: t.clientY, pointerId: 1, button: 0 });
      }, { passive: false });

      document.addEventListener('touchmove', function(e) {
        const t = e.touches[0];
        onPointerMove({ clientX: t.clientX, clientY: t.clientY, cancelable: e.cancelable, preventDefault: () => e.preventDefault() });
      }, { passive: false });

      document.addEventListener('touchend', function(e) {
        onPointerUp({ pointerId: 1 });
      });

      // Mouse fallback
      btn.addEventListener('mousedown', function(e) {
        onPointerDown(e);
        const mouseMove = (ev) => onPointerMove(ev);
        const mouseUp = (ev) => {
          onPointerUp(ev);
          document.removeEventListener('mousemove', mouseMove);
          document.removeEventListener('mouseup', mouseUp);
        };
        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', mouseUp);
      });
    }

    // Capture-phase click listener: suppresses click if user dragged or attempted premature move
    btn.addEventListener('click', function(e) {
      if (hasMoved || attemptedPrematureMove || Date.now() < suppressClickUntil) {
        e.stopImmediatePropagation();
        e.preventDefault();
        hasMoved = false;
        attemptedPrematureMove = false;
        return false;
      }
    }, true);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDraggableQuery);
  } else {
    initDraggableQuery();
  }
  setTimeout(initDraggableQuery, 100);
  setTimeout(initDraggableQuery, 500);
})();