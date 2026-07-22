/* SOLMATES Floating E-Notepad Logic (v116.4) */

(function () {
  let notes = [];
  let activeNoteId = null;
  let autoSaveTimeout = null;
  const isViewerPage = window.location.pathname.includes('pdf-viewer') || window.location.pathname.includes('video-viewer');

  // DOM Elements references
  let notepadEl = null;
  let minimizedIconEl = null;
  let closeZoneEl = null;
  let noteSelectEl = null;
  let noteTitleEl = null;
  let noteContentEl = null;
  let autoSaveStatusEl = null;

  // Dragging State variables
  let isDraggingNotepad = false;
  let notepadDragOffset = { x: 0, y: 0 };
  let notepadHasMoved = false;

  let isDraggingBubble = false;
  let bubbleHasMoved = false;
  let bubbleDragStart = { x: 0, y: 0 };
  let bubblePosition = { x: 20, y: 80 }; // bottom and right offset in px

  // Triple Tap Tracking
  let clickCount = 0;
  let clickTimeout = null;

  // Init entry
  function initNotepad() {
    if (!document.body) {
      document.addEventListener('DOMContentLoaded', initNotepad);
      return;
    }
    if (document.getElementById('sol-floating-notepad')) return;

    // Inject HTML Structure with inline style guard to prevent CSS load flashing
    const notepadHTML = `
      <style>
        #sol-floating-notepad.hidden, 
        #sol-notepad-minimized-icon.hidden { 
          display: none !important; 
        }
      </style>
      <div id="sol-floating-notepad" class="hidden">
        <div class="sol-notepad-warning">
          <i class="fas fa-exclamation-triangle"></i>
          <span><strong>Notice:</strong> clearing browser history/data will delete notes. Please export important notes as PDF regularly.</span>
        </div>
        <div class="sol-notepad-header" id="sol-notepad-header">
          <div class="sol-notepad-header-left">
            <i class="fas fa-edit"></i>
            <span>E-NOTEPAD</span>
          </div>
          <div class="sol-notepad-controls">
            <button class="sol-notepad-btn" id="sol-notepad-minimize-btn" title="Minimize">
              <i class="fas fa-minus"></i>
            </button>
            <button class="sol-notepad-btn close" id="sol-notepad-close-btn" title="Close">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        <div class="sol-notepad-select-bar">
          <select class="sol-notepad-select" id="sol-notepad-select"></select>
          <button class="sol-notepad-new-btn" id="sol-notepad-new-btn">
            <i class="fas fa-plus"></i> New
          </button>
        </div>
        <div class="sol-notepad-body">
          <input type="text" class="sol-notepad-title-input" id="sol-notepad-title" placeholder="Note Title..." autocomplete="off">
          <textarea class="sol-notepad-textarea" id="sol-notepad-content" placeholder="Type your note content here..."></textarea>
        </div>
        <div class="sol-notepad-footer">
          <div class="sol-notepad-status" id="sol-notepad-status">
            <i class="fas fa-check-circle"></i> Saved
          </div>
          <div class="sol-notepad-actions">
            <button class="sol-notepad-action-btn delete" id="sol-notepad-delete-btn" title="Delete Note">
              <i class="fas fa-trash-alt"></i> Delete
            </button>
            <button class="sol-notepad-action-btn pdf" id="sol-notepad-pdf-btn" title="Download PDF">
              <i class="fas fa-file-pdf"></i> Download PDF
            </button>
          </div>
        </div>
      </div>

      <!-- Minimized Floating Bubble -->
      <div id="sol-notepad-minimized-icon" class="hidden">
        <i class="fas fa-sticky-note"></i>
      </div>

      <!-- Drag to close target area -->
      <div id="sol-notepad-close-zone">
        <i class="fas fa-trash-alt"></i>
        <span>Drag bubble here to close</span>
      </div>
    `;

    const container = document.createElement('div');
    container.innerHTML = notepadHTML;
    document.body.appendChild(container);

    // Bind DOM References
    notepadEl = document.getElementById('sol-floating-notepad');
    minimizedIconEl = document.getElementById('sol-notepad-minimized-icon');
    closeZoneEl = document.getElementById('sol-notepad-close-zone');
    noteSelectEl = document.getElementById('sol-notepad-select');
    noteTitleEl = document.getElementById('sol-notepad-title');
    noteContentEl = document.getElementById('sol-notepad-content');
    autoSaveStatusEl = document.getElementById('sol-notepad-status');

    // Prevent interactions from bubbling to document
    const stopProp = (e) => e.stopPropagation();
    if (notepadEl) {
      notepadEl.addEventListener('mousedown', stopProp);
      notepadEl.addEventListener('touchstart', stopProp, { passive: true });
    }
    if (minimizedIconEl) {
      minimizedIconEl.addEventListener('mousedown', stopProp);
      minimizedIconEl.addEventListener('touchstart', stopProp, { passive: true });
    }

    // Load Notes
    loadNotesFromStorage();

    // Attach Event Listeners
    setupDragHandlers();
    setupButtonListeners();
    setupInputListeners();
    setupTripleTapDetection();

    // Restore state and coordinates
    restoreStateAndPositions();
  }

  // Database / Note Management
  function loadNotesFromStorage() {
    const raw = localStorage.getItem('solmates_notepad_notes');
    if (raw) {
      try {
        notes = JSON.parse(raw);
      } catch (e) {
        notes = [];
      }
    }

    if (!notes || notes.length === 0) {
      // Create first default note
      notes = [{
        id: 'note_' + Date.now(),
        title: 'My First Note',
        content: 'Welcome to SOLMATES E-Notepad!\n\nTriple-click/tap anywhere on the site to toggle this notepad. Auto-saves as you type.',
        date: new Date().toLocaleDateString()
      }];
      saveNotesToStorage();
    }

    // Default to last active note
    const lastActive = localStorage.getItem('solmates_notepad_active_id');
    const exists = notes.some(n => n.id === lastActive);
    activeNoteId = exists ? lastActive : notes[0].id;

    renderNotesDropdown();
    loadActiveNote();
  }

  function saveNotesToStorage() {
    localStorage.setItem('solmates_notepad_notes', JSON.stringify(notes));
  }

  function renderNotesDropdown() {
    if (!noteSelectEl) return;
    noteSelectEl.innerHTML = '';
    notes.forEach(note => {
      const opt = document.createElement('option');
      opt.value = note.id;
      opt.innerText = note.title || 'Untitled Note';
      if (note.id === activeNoteId) {
        opt.selected = true;
      }
      noteSelectEl.appendChild(opt);
    });
  }

  function loadActiveNote() {
    const note = notes.find(n => n.id === activeNoteId);
    if (note && noteTitleEl && noteContentEl) {
      noteTitleEl.value = note.title || '';
      noteContentEl.value = note.content || '';
      updateStatusText(true);
    }
  }

  function triggerAutoSave() {
    updateStatusText(false);
    if (autoSaveTimeout) clearTimeout(autoSaveTimeout);
    autoSaveTimeout = setTimeout(() => {
      const note = notes.find(n => n.id === activeNoteId);
      if (note) {
        note.title = noteTitleEl.value.trim() || 'Untitled Note';
        note.content = noteContentEl.value;
        note.date = new Date().toLocaleDateString();
        saveNotesToStorage();
        renderNotesDropdown();
        updateStatusText(true);
      }
    }, 400);
  }

  function updateStatusText(saved) {
    if (!autoSaveStatusEl) return;
    if (saved) {
      autoSaveStatusEl.innerHTML = '<i class="fas fa-check-circle" style="color:#10b981;"></i> Saved';
    } else {
      autoSaveStatusEl.innerHTML = '<i class="fas fa-spinner fa-spin" style="color:var(--np-accent);"></i> Auto-saving...';
    }
  }

  // Button Action Handlers
  function setupButtonListeners() {
    // New Note
    document.getElementById('sol-notepad-new-btn').addEventListener('click', () => {
      const title = prompt("Enter Note Title:", "New Note");
      if (title === null) return; // cancelled
      
      const newNote = {
        id: 'note_' + Date.now(),
        title: title.trim() || 'Untitled Note',
        content: '',
        date: new Date().toLocaleDateString()
      };
      notes.push(newNote);
      activeNoteId = newNote.id;
      localStorage.setItem('solmates_notepad_active_id', activeNoteId);
      saveNotesToStorage();
      renderNotesDropdown();
      loadActiveNote();
    });

    // Switch Note
    noteSelectEl.addEventListener('change', (e) => {
      activeNoteId = e.target.value;
      localStorage.setItem('solmates_notepad_active_id', activeNoteId);
      loadActiveNote();
    });

    // Delete Note
    document.getElementById('sol-notepad-delete-btn').addEventListener('click', () => {
      if (notes.length <= 1) {
        alert("You must keep at least one note.");
        return;
      }
      if (!confirm("Are you sure you want to delete this note?")) return;

      notes = notes.filter(n => n.id !== activeNoteId);
      activeNoteId = notes[0].id;
      localStorage.setItem('solmates_notepad_active_id', activeNoteId);
      saveNotesToStorage();
      renderNotesDropdown();
      loadActiveNote();
    });

    // Minimize
    document.getElementById('sol-notepad-minimize-btn').addEventListener('click', () => {
      minimizeNotepad();
    });

    // Close
    document.getElementById('sol-notepad-close-btn').addEventListener('click', () => {
      closeNotepad();
    });

    // PDF Download
    document.getElementById('sol-notepad-pdf-btn').addEventListener('click', downloadPDF);
  }

  function setupInputListeners() {
    noteTitleEl.addEventListener('input', triggerAutoSave);
    noteContentEl.addEventListener('input', triggerAutoSave);
  }

  // PDF Generation
  function downloadPDF() {
    const activeNote = notes.find(n => n.id === activeNoteId);
    if (!activeNote) return;

    const title = activeNote.title || 'Untitled Note';
    const content = activeNote.content || '';

    const pdfBtn = document.getElementById('sol-notepad-pdf-btn');
    const originalHTML = pdfBtn.innerHTML;
    pdfBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Exporting...';
    pdfBtn.disabled = true;

    const generate = () => {
      try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.setFont("helvetica", "bold");
        doc.setFontSize(22);
        doc.setTextColor(15, 43, 70);
        doc.text(title, 20, 25);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(100, 116, 139);
        doc.text(`Saved: ${activeNote.date || new Date().toLocaleDateString()}`, 20, 32);

        doc.setDrawColor(200, 200, 200);
        doc.line(20, 36, 190, 36);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.setTextColor(30, 41, 59);
        
        const splitContent = doc.splitTextToSize(content, 170);
        doc.text(splitContent, 20, 46);

        doc.save(`${title.replace(/[^a-z0-9]/gi, '_')}.pdf`);
      } catch (e) {
        console.error("PDF generation failed:", e);
        alert("Failed to export PDF: " + e.message);
      } finally {
        pdfBtn.innerHTML = originalHTML;
        pdfBtn.disabled = false;
      }
    };

    if (typeof window.jspdf === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
      script.onload = generate;
      script.onerror = () => {
        alert("Could not load PDF library. Please check your internet connection.");
        pdfBtn.innerHTML = originalHTML;
        pdfBtn.disabled = false;
      };
      document.head.appendChild(script);
    } else {
      generate();
    }
  }

  // ============================================================
  // State Management
  // ============================================================

  function minimizeNotepad() {
    if (notepadEl) notepadEl.classList.add('hidden');
    if (minimizedIconEl) {
      minimizedIconEl.classList.remove('hidden');
      applyBubblePosition();
    }
    localStorage.setItem('solmates_notepad_state', 'minimized');
  }

  function restoreNotepad() {
    if (minimizedIconEl) minimizedIconEl.classList.add('hidden');
    if (notepadEl) {
      notepadEl.classList.remove('hidden');
      // Temporary pointer-events lock to prevent tap-through
      notepadEl.style.pointerEvents = 'none';
      setTimeout(() => {
        notepadEl.style.pointerEvents = 'auto';
      }, 300);
    }
    localStorage.setItem('solmates_notepad_state', 'open');
  }

  function closeNotepad() {
    if (isViewerPage) {
      minimizeNotepad();
      return;
    }
    if (notepadEl) notepadEl.classList.add('hidden');
    if (minimizedIconEl) minimizedIconEl.classList.add('hidden');
    localStorage.setItem('solmates_notepad_state', 'closed');
  }

  function restoreStateAndPositions() {
    if (!notepadEl) return;
    
    // 1. Restore Notepad Panel Position
    const rawNotepadPos = localStorage.getItem('solmates_notepad_pos');
    if (rawNotepadPos) {
      try {
        const pos = JSON.parse(rawNotepadPos);
        notepadEl.style.left = `${pos.x}px`;
        notepadEl.style.top = `${pos.y}px`;
        notepadEl.style.right = 'auto';
        notepadEl.style.bottom = 'auto';
      } catch (e) {}
    }

    // 2. Restore Bubble Position
    const rawBubblePos = localStorage.getItem('solmates_notepad_bubble_pos');
    if (rawBubblePos) {
      try {
        const pos = JSON.parse(rawBubblePos);
        bubblePosition.x = pos.x;
        bubblePosition.y = pos.y;
      } catch (e) {}
    }
    applyBubblePosition();

    // 3. Restore State
    // KEY FIX: On new page load, never auto-open the full notepad.
    // Only restore to minimized bubble if it was open/minimized — 
    // user must triple-tap or click bubble to fully open.
    let state = localStorage.getItem('solmates_notepad_state') || 'closed';

    if (isViewerPage && state === 'closed') {
      // Always show bubble on viewer pages so it's accessible
      state = 'minimized';
    }

    if (state === 'open') {
      // Instead of restoring full open panel on page load,
      // show minimized bubble so user intentionally opens it
      minimizeNotepad();
    } else if (state === 'minimized') {
      minimizeNotepad();
    } else {
      closeNotepad();
    }
  }

  function applyBubblePosition() {
    if (!minimizedIconEl) return;
    minimizedIconEl.style.bottom = `${bubblePosition.y}px`;
    minimizedIconEl.style.right = `${bubblePosition.x}px`;
    minimizedIconEl.style.top = 'auto';
    minimizedIconEl.style.left = 'auto';
  }

  // ============================================================
  // Drag Handlers — Notepad Panel & Bubble
  // ============================================================
  function setupDragHandlers() {
    // ── 1. Draggable Notepad Panel (by Header) ──────────────────
    const header = document.getElementById('sol-notepad-header');
    
    const onNotepadDragStart = (e) => {
      if (e.target.closest('.sol-notepad-btn')) return;
      isDraggingNotepad = true;
      notepadHasMoved = false;
      const rect = notepadEl.getBoundingClientRect();
      const clientX = e.clientX ?? e.touches?.[0]?.clientX;
      const clientY = e.clientY ?? e.touches?.[0]?.clientY;
      notepadDragOffset.x = clientX - rect.left;
      notepadDragOffset.y = clientY - rect.top;
    };

    const onNotepadDragMove = (e) => {
      if (!isDraggingNotepad) return;
      if (e.cancelable) e.preventDefault();
      notepadHasMoved = true;
      const clientX = e.clientX ?? e.touches?.[0]?.clientX;
      const clientY = e.clientY ?? e.touches?.[0]?.clientY;

      let x = clientX - notepadDragOffset.x;
      let y = clientY - notepadDragOffset.y;

      x = Math.max(0, Math.min(x, window.innerWidth - notepadEl.offsetWidth));
      y = Math.max(0, Math.min(y, window.innerHeight - notepadEl.offsetHeight));

      notepadEl.style.left = `${x}px`;
      notepadEl.style.top = `${y}px`;
      notepadEl.style.right = 'auto';
      notepadEl.style.bottom = 'auto';
    };

    const onNotepadDragEnd = () => {
      if (!isDraggingNotepad) return;
      isDraggingNotepad = false;
      document.removeEventListener('mousemove', onNotepadDragMove);
      document.removeEventListener('mouseup', onNotepadDragEnd);
      document.removeEventListener('touchmove', onNotepadDragMove);
      document.removeEventListener('touchend', onNotepadDragEnd);

      if (notepadEl && notepadHasMoved) {
        const rect = notepadEl.getBoundingClientRect();
        localStorage.setItem('solmates_notepad_pos', JSON.stringify({ x: rect.left, y: rect.top }));
      }
    };

    header.addEventListener('mousedown', (e) => {
      onNotepadDragStart(e);
      document.addEventListener('mousemove', onNotepadDragMove);
      document.addEventListener('mouseup', onNotepadDragEnd);
    });

    // FIX: passive:false so preventDefault works for touch drag
    header.addEventListener('touchstart', (e) => {
      onNotepadDragStart(e);
      document.addEventListener('touchmove', onNotepadDragMove, { passive: false });
      document.addEventListener('touchend', onNotepadDragEnd);
    }, { passive: true });

    // ── 2. Draggable Minimized Bubble ───────────────────────────
    const onBubbleDragStart = (e) => {
      isDraggingBubble = true;
      bubbleHasMoved = false;
      const rect = minimizedIconEl.getBoundingClientRect();
      const clientX = e.clientX ?? e.touches?.[0]?.clientX;
      const clientY = e.clientY ?? e.touches?.[0]?.clientY;

      bubbleDragStart.x = clientX - rect.left;
      bubbleDragStart.y = clientY - rect.top;

      if (!isViewerPage) {
        closeZoneEl.classList.add('active');
      }
    };

    const onBubbleDragMove = (e) => {
      if (!isDraggingBubble) return;
      if (e.cancelable) e.preventDefault();

      const clientX = e.clientX ?? e.touches?.[0]?.clientX;
      const clientY = e.clientY ?? e.touches?.[0]?.clientY;

      // Calculate how far finger has moved from start
      const moveX = Math.abs(clientX - (window.innerWidth - bubblePosition.x - minimizedIconEl.offsetWidth / 2));
      const moveY = Math.abs(clientY - (window.innerHeight - bubblePosition.y - minimizedIconEl.offsetHeight / 2));
      if (moveX > 6 || moveY > 6) bubbleHasMoved = true;

      let x = window.innerWidth - (clientX - bubbleDragStart.x + minimizedIconEl.offsetWidth);
      let y = window.innerHeight - (clientY - bubbleDragStart.y + minimizedIconEl.offsetHeight);

      x = Math.max(0, Math.min(x, window.innerWidth - minimizedIconEl.offsetWidth));
      y = Math.max(0, Math.min(y, window.innerHeight - minimizedIconEl.offsetHeight));

      bubblePosition.x = x;
      bubblePosition.y = y;

      minimizedIconEl.style.right = `${x}px`;
      minimizedIconEl.style.bottom = `${y}px`;
      minimizedIconEl.style.top = 'auto';
      minimizedIconEl.style.left = 'auto';

      // Drag-to-close: check if near bottom of screen
      if (!isViewerPage) {
        const bubbleBottomY = clientY - bubbleDragStart.y + minimizedIconEl.offsetHeight;
        if (bubbleBottomY > window.innerHeight - 90) {
          closeZoneEl.classList.add('hovered');
        } else {
          closeZoneEl.classList.remove('hovered');
        }
      }
    };

    const onBubbleDragEnd = () => {
      if (!isDraggingBubble) return;
      isDraggingBubble = false;

      document.removeEventListener('mousemove', onBubbleDragMove);
      document.removeEventListener('mouseup', onBubbleDragEnd);
      document.removeEventListener('touchmove', onBubbleDragMove);
      document.removeEventListener('touchend', onBubbleDragEnd);

      if (!isViewerPage && closeZoneEl.classList.contains('hovered')) {
        // Dropped on close zone → close notepad
        closeNotepad();
      } else {
        // Save new bubble position
        localStorage.setItem('solmates_notepad_bubble_pos', JSON.stringify({ x: bubblePosition.x, y: bubblePosition.y }));

        // Only open notepad if it was a simple TAP (no significant drag movement)
        if (!bubbleHasMoved) {
          restoreNotepad();
        }
      }

      closeZoneEl.classList.remove('active');
      closeZoneEl.classList.remove('hovered');
    };

    minimizedIconEl.addEventListener('mousedown', (e) => {
      onBubbleDragStart(e);
      document.addEventListener('mousemove', onBubbleDragMove);
      document.addEventListener('mouseup', onBubbleDragEnd);
    });

    minimizedIconEl.addEventListener('touchstart', (e) => {
      onBubbleDragStart(e);
      document.addEventListener('touchmove', onBubbleDragMove, { passive: false });
      document.addEventListener('touchend', onBubbleDragEnd);
    }, { passive: true });
  }

  // ============================================================
  // Triple Tap Detector
  // ============================================================
  function setupTripleTapDetection() {
    let lastTouchTime = 0;
    let touchStartX = 0;
    let touchStartY = 0;
    
    // [v116.10] Fix rapid clicks after alert dialogs
    if (!window._alertPatchedForNotepad) {
      window._alertPatchedForNotepad = true;
      const originalAlert = window.alert;
      window.alert = function(msg) {
        const res = originalAlert.call(window, msg);
        window._lastModalCloseTime = Date.now();
        return res;
      };
    }

    let lastClickTime = 0;
    const handleTap = (e) => {
      // Exclude notepad elements and form controls
      if (
        e.target.closest('#sol-floating-notepad') ||
        e.target.closest('#sol-notepad-minimized-icon') ||
        e.target.closest('#sol-notepad-close-zone')
      ) return;
      if (['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON', 'A'].includes(e.target.tagName)) return;
      
      // Ignore taps immediately following an alert dismissal
      if (window._lastModalCloseTime && (Date.now() - window._lastModalCloseTime < 500)) {
        clickCount = 0;
        return;
      }

      const now = Date.now();
      if (now - lastClickTime > 600) {
        clickCount = 0; // Reset if too much wall-clock time has passed (fixes alert pause bug)
      }
      lastClickTime = now;
      
      clickCount++;
      if (clickTimeout) clearTimeout(clickTimeout);

      clickTimeout = setTimeout(() => {
        clickCount = 0;
      }, 600);

      if (clickCount >= 3) {
        clickCount = 0;
        window.showSolmatesNotepad();
      }
    };

    // Reset count on scroll (user scrolling, not tapping)
    window.addEventListener('scroll', () => {
      clickCount = 0;
      if (clickTimeout) {
        clearTimeout(clickTimeout);
        clickTimeout = null;
      }
    }, { passive: true });

    document.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches[0]) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
      lastTouchTime = Date.now();
      if (e.changedTouches && e.changedTouches[0]) {
        const dx = Math.abs(e.changedTouches[0].clientX - touchStartX);
        const dy = Math.abs(e.changedTouches[0].clientY - touchStartY);
        // If finger moved more than 10px, it was a scroll/swipe, not a tap
        if (dx > 10 || dy > 10) return;
      }
      handleTap(e);
    }, { passive: true });

    document.addEventListener('click', (e) => {
      // Ignore simulated click events fired right after a touchend
      if (Date.now() - lastTouchTime < 400) return;
      handleTap(e);
    }, { passive: true });
  }

  // ============================================================
  // Global Launcher
  // ============================================================
  window.showSolmatesNotepad = function () {
    initNotepad();
    if (!notepadEl) return;

    const notepadHidden = notepadEl.classList.contains('hidden');
    const bubbleHidden = minimizedIconEl.classList.contains('hidden');

    if (notepadHidden && bubbleHidden) {
      // Completely closed → open at default position
      notepadEl.style.left = 'auto';
      notepadEl.style.top = 'auto';
      notepadEl.style.bottom = '80px';
      notepadEl.style.right = '20px';
      restoreNotepad();
    } else if (!notepadHidden) {
      // Notepad panel is visible → close it
      closeNotepad();
    } else {
      // Bubble is visible → expand to full notepad
      restoreNotepad();
    }
  };

  // Auto-init on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNotepad);
  } else {
    initNotepad();
  }

  // Cleanup: Reset notepad state when leaving viewer pages so it doesn't persist to normal pages
  window.addEventListener('beforeunload', () => {
    if (isViewerPage) {
      localStorage.setItem('solmates_notepad_state', 'closed');
    }
  });
})();
