/**
 * SOL Database - Frontend Module
 * ─────────────────────────────
 * • Per-category field schemas (no uniform form)
 * • Inline admin editing (stays on same page)
 * • Real-time updates via Socket.io
 * • Role-based UI visibility (admin controls hidden for guests)
 *
 * Usage:
 *   <script src="/js/sol-client.js"></script>
 *   <div id="sol-container"></div>
 *   <script>
 *     SOL.init({ category: 'notes', semester: '1', containerId: 'sol-container' });
 *   </script>
 */

(function (window) {
  'use strict';

  // ── Per-category field definitions ─────────────────────────────────────────
  // Each category has its own schema; forms are built from this, never hardcoded.
  const CATEGORY_SCHEMAS = {
    'live-classes': {
      label: 'Live Classes',
      fields: [
        { key: 'title', label: 'Class Title', type: 'text', required: true },
        { key: 'date', label: 'Date & Time', type: 'text', required: true },
        { key: 'link', label: 'Join Link', type: 'url', required: true },
        { key: 'instructor', label: 'Instructor', type: 'text', required: false },
        { key: 'description', label: 'Description', type: 'textarea', required: false }
      ],
      renderCard: renderLiveClassCard
    },
    'notes': {
      label: 'Notes',
      fields: [
        { key: 'subject', label: 'Subject', type: 'text', required: true },
        { key: 'pdf', label: 'PDF Link', type: 'url', required: true },
        { key: 'title', label: 'Title', type: 'text', required: false },
        { key: 'author', label: 'Author', type: 'text', required: false },
        { key: 'description', label: 'Description', type: 'textarea', required: false }
      ],
      renderCard: renderNotesCard
    },
    'pyqs': {
      label: 'PYQs',
      fields: [
        { key: 'subject', label: 'Subject', type: 'text', required: true },
        { key: 'year', label: 'Year', type: 'text', required: true },
        { key: 'pdf', label: 'PDF Link', type: 'url', required: true },
        { key: 'description', label: 'Description', type: 'textarea', required: false }
      ],
      renderCard: renderPYQCard
    },
    'oneshot': {
      label: 'One Shot Notes',
      fields: [
        { key: 'title', label: 'Title', type: 'text', required: true },
        { key: 'pdf', label: 'PDF Link', type: 'url', required: true },
        { key: 'subject', label: 'Subject', type: 'text', required: false },
        { key: 'description', label: 'Description', type: 'textarea', required: false }
      ],
      renderCard: renderOneshotCard
    },
    'youtube': {
      label: 'YouTube Videos',
      fields: [
        { key: 'title', label: 'Title', type: 'text', required: true },
        { key: 'videoUrl', label: 'Video URL', type: 'url', required: true },
        { key: 'thumbnail', label: 'Thumbnail URL', type: 'url', required: false },
        { key: 'subject', label: 'Subject', type: 'text', required: false },
        { key: 'description', label: 'Description', type: 'textarea', required: false }
      ],
      renderCard: renderYouTubeCard
    },
    'elearning': {
      label: 'E-Learning',
      fields: [
        { key: 'title', label: 'Course Title', type: 'text', required: true },
        { key: 'link', label: 'Course Link', type: 'url', required: true },
        { key: 'platform', label: 'Platform', type: 'text', required: false },
        { key: 'thumbnail', label: 'Thumbnail URL', type: 'url', required: false },
        { key: 'description', label: 'Description', type: 'textarea', required: false }
      ],
      renderCard: renderElearningCard
    },
    'professor': {
      label: 'Professor Materials',
      fields: [
        { key: 'title', label: 'Title', type: 'text', required: true },
        { key: 'subject', label: 'Subject', type: 'text', required: false },
        { key: 'text', label: 'Content', type: 'textarea', required: false }
      ],
      renderCard: renderProfessorCard
    }
  };

  // ── Card renderers — unique per category ───────────────────────────────────

  function renderLiveClassCard(item) {
    const card = el('div', { class: 'sol-card sol-card--live' });
    card.appendChild(el('h3', {}, item.title));
    if (item.date) card.appendChild(el('p', { class: 'sol-meta' }, '📅 ' + item.date));
    if (item.instructor) card.appendChild(el('p', { class: 'sol-meta' }, '👨‍🏫 ' + item.instructor));
    if (item.description) card.appendChild(el('p', { class: 'sol-desc' }, item.description));
    const link = el('a', { href: sanitizeUrl(item.link), target: '_blank', rel: 'noopener noreferrer', class: 'sol-btn' }, 'Join Class');
    card.appendChild(link);
    return card;
  }

  function renderNotesCard(item) {
    const card = el('div', { class: 'sol-card sol-card--notes' });
    card.appendChild(el('h3', {}, item.subject));
    if (item.title) card.appendChild(el('p', { class: 'sol-subtitle' }, item.title));
    if (item.author) card.appendChild(el('p', { class: 'sol-meta' }, '✍️ ' + item.author));
    if (item.description) card.appendChild(el('p', { class: 'sol-desc' }, item.description));
    const link = el('a', { href: sanitizeUrl(item.pdf), target: '_blank', rel: 'noopener noreferrer', class: 'sol-btn' }, '📄 View PDF');
    card.appendChild(link);
    return card;
  }

  function renderPYQCard(item) {
    const card = el('div', { class: 'sol-card sol-card--pyq' });
    card.appendChild(el('h3', {}, item.subject));
    card.appendChild(el('p', { class: 'sol-meta' }, '📆 Year: ' + item.year));
    if (item.description) card.appendChild(el('p', { class: 'sol-desc' }, item.description));
    const link = el('a', { href: sanitizeUrl(item.pdf), target: '_blank', rel: 'noopener noreferrer', class: 'sol-btn' }, '📄 Download PYQ');
    card.appendChild(link);
    return card;
  }

  function renderOneshotCard(item) {
    const card = el('div', { class: 'sol-card sol-card--oneshot' });
    card.appendChild(el('h3', {}, item.title));
    if (item.subject) card.appendChild(el('p', { class: 'sol-meta' }, '📘 ' + item.subject));
    if (item.description) card.appendChild(el('p', { class: 'sol-desc' }, item.description));
    const link = el('a', { href: sanitizeUrl(item.pdf), target: '_blank', rel: 'noopener noreferrer', class: 'sol-btn' }, '⚡ One Shot PDF');
    card.appendChild(link);
    return card;
  }

  function renderYouTubeCard(item) {
    const card = el('div', { class: 'sol-card sol-card--youtube' });
    if (item.thumbnail) {
      const img = el('img', { src: sanitizeUrl(item.thumbnail), alt: item.title, class: 'sol-thumb' });
      img.onerror = function () { this.style.display = 'none'; };
      card.appendChild(img);
    }
    card.appendChild(el('h3', {}, item.title));
    if (item.subject) card.appendChild(el('p', { class: 'sol-meta' }, '📘 ' + item.subject));
    if (item.description) card.appendChild(el('p', { class: 'sol-desc' }, item.description));
    const link = el('a', { href: sanitizeUrl(item.videoUrl), target: '_blank', rel: 'noopener noreferrer', class: 'sol-btn' }, '▶ Watch Video');
    card.appendChild(link);
    return card;
  }

  function renderElearningCard(item) {
    const card = el('div', { class: 'sol-card sol-card--elearning' });
    if (item.thumbnail) {
      const img = el('img', { src: sanitizeUrl(item.thumbnail), alt: item.title, class: 'sol-thumb' });
      img.onerror = function () { this.style.display = 'none'; };
      card.appendChild(img);
    }
    card.appendChild(el('h3', {}, item.title));
    if (item.platform) card.appendChild(el('p', { class: 'sol-meta' }, '🎓 ' + item.platform));
    if (item.description) card.appendChild(el('p', { class: 'sol-desc' }, item.description));
    const link = el('a', { href: sanitizeUrl(item.link), target: '_blank', rel: 'noopener noreferrer', class: 'sol-btn' }, 'Start Course');
    card.appendChild(link);
    return card;
  }

  function renderProfessorCard(item) {
    const card = el('div', { class: 'sol-card sol-card--professor' });
    card.appendChild(el('h3', {}, item.title || item.subject || 'Professor Material'));
    if (item.subject && item.subject !== 'undefined') card.appendChild(el('p', { class: 'sol-meta' }, '📚 ' + item.subject));
    if (item.text && item.text !== 'undefined') card.appendChild(el('p', { class: 'sol-text' }, item.text));
    
    const url = item.url || item.pdf || item.link;
    const itemLink = (url || '').trim();
    const uniqueKey = (itemLink && itemLink !== "#pending" && itemLink !== "#") ? itemLink : `title-${(item.title || '').replace(/\s+/g, '-').toLowerCase()}`;
    if (url && url !== 'undefined') {
      const link = el('a', { href: sanitizeUrl(url), target: '_blank', rel: 'noopener noreferrer', class: 'sol-btn' }, '📄 View Material');
      card.appendChild(link);
    }

    if (Array.isArray(item.attachments) && item.attachments.length > 0) {
      const attachWrap = el('div', { class: 'sol-attachments' });
      attachWrap.appendChild(el('strong', {}, 'Attachments:'));
      item.attachments.forEach(function (att) {
        if (att.url && att.url !== 'undefined') {
          const a = el('a', { href: sanitizeUrl(att.url), target: '_blank', rel: 'noopener noreferrer', class: 'sol-attach-link' }, att.name || 'View');
          attachWrap.appendChild(a);
        }
      });
      card.appendChild(attachWrap);
    }
    return card;
  }

  // ── Utility helpers ────────────────────────────────────────────────────────

  function el(tag, attrs, text) {
    const node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === 'class') node.className = attrs[k];
        else node.setAttribute(k, attrs[k]);
      });
    }
    if (text) node.textContent = text;
    return node;
  }

  function sanitizeUrl(url) {
    if (!url || typeof url !== 'string') return '#';
    try {
      const p = new URL(url);
      if (!['http:', 'https:'].includes(p.protocol)) return '#';
      return p.href;
    } catch (e) { return '#'; }
  }

  function isAdmin() {
    return window.solmatesAPI && window.solmatesAPI.isAdminLoggedIn();
  }

  function getToken() {
    return localStorage.getItem('solmates_admin_token') || '';
  }

  function getApiBase() {
    if (window.API_CONFIG && window.API_CONFIG.baseURL) return window.API_CONFIG.baseURL;
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return 'http://localhost:3000/api';
    }
    if (window.PRODUCTION_API_URL && window.PRODUCTION_API_URL !== 'YOUR_BACKEND_URL_HERE/api') {
      return window.PRODUCTION_API_URL;
    }
    return 'https://solmates-backend-w27e.onrender.com/api';
  }

  // ── API calls ──────────────────────────────────────────────────────────────

  async function apiGet(category, semester) {
    // ⚡ CACHE: Check if we have this semester pre-loaded or cached
    if (window.SOL_CACHE) {
      const cached = window.SOL_CACHE.get('content', category, semester);
      if (cached) return cached;
    }

    const res = await fetch(`${getApiBase()}/sol/${category}/${semester}`, {
      cache: 'no-store', // Always ask server for latest if not in SOL_CACHE
      headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate', 'Pragma': 'no-cache' }
    });
    if (!res.ok) throw new Error('API error: ' + res.status);
    const data = await res.json();

    // ⚡ CACHE: Save for future use (instant next time)
    if (window.SOL_CACHE) {
      window.SOL_CACHE.set('content', category, semester, data);
    }
    return data;
  }

  async function apiPost(category, semester, body) {
    const res = await fetch(`${getApiBase()}/sol/${category}/${semester}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getToken() },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Add failed');

    // ⚡ CACHE: Invalidate cache for this category so change is seen immediately
    if (window.SOL_CACHE) window.SOL_CACHE.clear(category, semester);

    return data;
  }

  async function apiPut(category, semester, id, body) {
    const res = await fetch(`${getApiBase()}/sol/${category}/${semester}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getToken() },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Update failed');

    // ⚡ CACHE: Invalidate cache
    if (window.SOL_CACHE) window.SOL_CACHE.clear(category, semester);

    return data;
  }

  async function apiDelete(category, semester, id) {
    const res = await fetch(`${getApiBase()}/sol/${category}/${semester}/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': 'Bearer ' + getToken() }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Delete failed');

    // ⚡ CACHE: Invalidate cache
    if (window.SOL_CACHE) window.SOL_CACHE.clear(category, semester);

    return data;
  }

  // ── Dynamic form builder (per-category, never uniform) ────────────────────

  function buildForm(schema, existingData, onSave, onCancel) {
    const form = el('div', { class: 'sol-form' });

    schema.fields.forEach(function (field) {
      const group = el('div', { class: 'sol-form-group' });
      const lbl = el('label', { class: 'sol-form-label' }, field.label + (field.required ? ' *' : ''));
      group.appendChild(lbl);

      let input;
      if (field.type === 'textarea') {
        input = document.createElement('textarea');
        input.className = 'sol-form-input';
        input.rows = 3;
        input.value = (existingData && existingData[field.key]) || '';
      } else {
        input = document.createElement('input');
        input.type = field.type || 'text';
        input.className = 'sol-form-input';
        input.value = (existingData && existingData[field.key]) || '';
      }
      input.dataset.key = field.key;
      if (field.required) input.required = true;

      group.appendChild(input);
      form.appendChild(group);
    });

    const errEl = el('div', { class: 'sol-form-error' });
    form.appendChild(errEl);

    const btnRow = el('div', { class: 'sol-form-btns' });

    const saveBtn = el('button', { class: 'sol-btn sol-btn--save' }, existingData ? 'Save Changes' : 'Add Item');
    saveBtn.addEventListener('click', async function () {
      errEl.textContent = '';
      const body = {};
      let valid = true;

      schema.fields.forEach(function (field) {
        const inp = form.querySelector('[data-key="' + field.key + '"]');
        const val = inp ? inp.value.trim() : '';
        if (field.required && !val) {
          errEl.textContent = field.label + ' is required.';
          valid = false;
        }
        body[field.key] = val || null;
      });

      if (!valid) return;

      saveBtn.disabled = true;
      saveBtn.textContent = 'Saving...';
      try {
        await onSave(body);
      } catch (e) {
        errEl.textContent = e.message;
        saveBtn.disabled = false;
        saveBtn.textContent = existingData ? 'Save Changes' : 'Add Item';
      }
    });

    const cancelBtn = el('button', { class: 'sol-btn sol-btn--cancel' }, 'Cancel');
    cancelBtn.addEventListener('click', onCancel);

    btnRow.appendChild(saveBtn);
    btnRow.appendChild(cancelBtn);
    form.appendChild(btnRow);

    return form;
  }

  // ── Main renderer ──────────────────────────────────────────────────────────

  function renderContent(container, schema, items, category, semester, reloadFn) {
    container.textContent = '';

    // Admin "Add Item" button — only visible to admin
    if (isAdmin()) {
      const addBtn = el('button', { class: 'sol-btn sol-btn--add' }, '＋ Add ' + schema.label);
      addBtn.addEventListener('click', function () {
        // Replace container with add form (stays on same page)
        const formWrap = el('div', { class: 'sol-form-wrap' });
        formWrap.appendChild(el('h3', { class: 'sol-form-title' }, 'Add ' + schema.label));
        const form = buildForm(schema, null, async function (body) {
          await apiPost(category, semester, body);
          await reloadFn(); // Refresh same page
        }, function () {
          reloadFn();
        });
        formWrap.appendChild(form);
        container.textContent = '';
        container.appendChild(formWrap);
      });
      container.appendChild(addBtn);
    }

    if (!items || items.length === 0) {
      container.appendChild(el('div', { class: 'sol-empty' }, 'No content available for Semester ' + semester + ' yet.'));
      return;
    }

    const grid = el('div', { class: 'sol-grid' });

    items.forEach(function (item) {
      const cardWrap = el('div', { class: 'sol-card-wrap' });
      const card = schema.renderCard(item);
      cardWrap.appendChild(card);

      // Admin inline controls
      if (isAdmin()) {
        const controls = el('div', { class: 'sol-admin-controls' });

        const editBtn = el('button', { class: 'sol-btn sol-btn--edit' }, '✏️ Edit');
        editBtn.addEventListener('click', function () {
          cardWrap.textContent = '';
          const formWrap = el('div', { class: 'sol-form-wrap' });
          formWrap.appendChild(el('h3', { class: 'sol-form-title' }, 'Edit Item'));
          const form = buildForm(schema, item, async function (body) {
            await apiPut(category, semester, item.id, body);
            await reloadFn();
          }, function () {
            reloadFn();
          });
          formWrap.appendChild(form);
          cardWrap.appendChild(formWrap);
        });

        const delBtn = el('button', { class: 'sol-btn sol-btn--delete' }, '🗑️ Delete');
        delBtn.addEventListener('click', async function () {
          if (!confirm('Delete this item?')) return;
          try {
            await apiDelete(category, semester, item.id);
            await reloadFn();
          } catch (e) {
            alert('Delete failed: ' + e.message);
          }
        });

        controls.appendChild(editBtn);
        controls.appendChild(delBtn);
        cardWrap.appendChild(controls);
      }

      grid.appendChild(cardWrap);
    });

    container.appendChild(grid);
  }

  // ── WebSocket real-time subscription ──────────────────────────────────────

  function setupSocket(category, semester, reloadFn) {
    if (typeof io === 'undefined') return;
    // FIX: Use getSocketBaseURL() which safely parses URL - avoids .replace('/api','') bug
    // when 'api' appears in domain name (e.g. api.solmates.com)
    const socketUrl = window.getSocketBaseURL ? window.getSocketBaseURL() : getApiBase().replace(/\/api$/, '');
    try {
      // FIX: Removed explicit path:'/socket.io/' - backend uses default path, trailing slash caused mismatch
      const socket = io(socketUrl, { transports: ['polling', 'websocket'], reconnection: true, reconnectionAttempts: Infinity, reconnectionDelay: 1000, reconnectionDelayMax: 5000 });
      function subscribeToRoom() {
        socket.emit('sol:subscribe', { category: category, semester: semester });
      }

      socket.on('connect', subscribeToRoom);

      // FIX: Re-subscribe after reconnect (mobile network change, WiFi switch etc.)
      // Without this, room membership is lost and real-time updates stop on all other devices
      socket.on('reconnect', subscribeToRoom);
      socket.on('connect_error', function (err) {
        // Silently handle - socket will retry automatically
      });
      socket.on('sol:updated', function (payload) {
        if (payload.category === category && String(payload.semester) === String(semester)) {
          reloadFn(); // Auto-refresh — no page reload needed
        }
      });
    } catch (e) {
      // Socket unavailable — gracefully degrade
    }
  }

  // ── Public API ─────────────────────────────────────────────────────────────

  window.SOL = {
    /**
     * Initialize the SOL viewer/editor for a given category + semester.
     * @param {object} opts
     * @param {string} opts.category    — e.g. 'notes', 'pyqs', 'youtube'
     * @param {string} opts.semester    — '1'|'2'|'3'|'4'
     * @param {string} opts.containerId — ID of the DOM container
     */
    init: async function (opts) {
      const { category, semester, containerId } = opts;
      const schema = CATEGORY_SCHEMAS[category];
      const container = document.getElementById(containerId);

      if (!schema) {
        if (container) container.textContent = 'Unknown SOL category: ' + category;
        return;
      }
      if (!container) {
        console.error('SOL: container #' + containerId + ' not found');
        return;
      }

      // Loading state
      container.textContent = '';
      container.appendChild(el('div', { class: 'sol-loading' }, 'Loading ' + schema.label + '…'));

      const reload = async function () {
        try {
          container.textContent = '';
          container.appendChild(el('div', { class: 'sol-loading' }, 'Loading…'));
          const response = await apiGet(category, semester);
          renderContent(container, schema, response.data, category, semester, reload);
        } catch (e) {
          container.textContent = '';
          container.appendChild(el('div', { class: 'sol-error' }, 'Failed to load content. Please refresh.'));
        }
      };

      await reload();
      setupSocket(category, semester, reload);
    },

    SCHEMAS: CATEGORY_SCHEMAS
  };

})(window);
