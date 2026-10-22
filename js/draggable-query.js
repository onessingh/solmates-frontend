/**
 * Solmates - Draggable Ask Query Button
 * Enables smooth drag & move on desktop (mouse) and mobile (touch) for #queryFloatBtn.
 * Remembers dragged position across page reloads/navigations via localStorage.
 */
(function() {
  'use strict';

  function initDraggableQuery() {
    const btn = document.getElementById('queryFloatBtn');
    if (!btn || btn.__draggableInitialized) return;
    btn.__draggableInitialized = true;

    // Inject styles for smooth dragging and visual feedback
    const styleId = 'solmates-draggable-query-style';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        #queryFloatBtn {
          touch-action: none !important;
          user-select: none !important;
          -webkit-user-select: none !important;
          -webkit-touch-callout: none !important;
          cursor: grab;
        }
        #queryFloatBtn svg,
        #queryFloatBtn * {
          pointer-events: none !important;
        }
        #queryFloatBtn.is-dragging {
          cursor: grabbing !important;
          opacity: 0.95 !important;
          box-shadow: 0 10px 25px rgba(15,43,70,0.55) !important;
          transform: scale(1.04) !important;
          transition: none !important;
          z-index: 10001 !important;
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

    const margin = 10;
    let isDragging = false;
    let hasMoved = false;
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

    // Adjust position if window is resized or rotated
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

      isDragging = true;
      hasMoved = false;
      startX = e.clientX;
      startY = e.clientY;

      const rect = btn.getBoundingClientRect();
      initialLeft = rect.left;
      initialTop = rect.top;

      try {
        btn.setPointerCapture(e.pointerId);
      } catch (err) {}
    }

    function onPointerMove(e) {
      if (!isDragging) return;

      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      if (!hasMoved) {
        if (Math.hypot(dx, dy) > 5) {
          hasMoved = true;
          btn.classList.add('is-dragging');
        } else {
          return;
        }
      }

      setPosition(initialLeft + dx, initialTop + dy);
      if (e.cancelable) e.preventDefault();
    }

    function onPointerUp(e) {
      if (!isDragging) return;
      isDragging = false;

      try {
        btn.releasePointerCapture(e.pointerId);
      } catch (err) {}

      btn.classList.remove('is-dragging');

      if (hasMoved) {
        suppressClickUntil = Date.now() + 350;
        const rect = btn.getBoundingClientRect();
        try {
          localStorage.setItem('solmates_query_btn_pos', JSON.stringify({
            left: rect.left,
            top: rect.top
          }));
        } catch (e) {}
      }
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
        if (!isDragging) return;
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

    // Capture-phase click listener: suppresses click if user was dragging
    btn.addEventListener('click', function(e) {
      if (hasMoved || Date.now() < suppressClickUntil) {
        e.stopImmediatePropagation();
        e.preventDefault();
        hasMoved = false;
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
