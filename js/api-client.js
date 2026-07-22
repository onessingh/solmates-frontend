/**
 * SOLMATES API Client - Complete Fixed Version
 * REMOVED: Custom cache-control headers causing CORS issues
 */

/* ========== CONSOLE BLACKOUT DISABLED (Allows Debugging) ========== */
/*
if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
  const dummy = () => {};
  console.log = dummy;
  console.debug = dummy;
  console.info = dummy;
  console.warn = dummy;
  console.error = dummy;
  console.table = dummy;
  console.time = dummy;
  console.timeEnd = dummy;
}
*/

/* ========== INSPECTOR BLOCKER DISABLED (Allows F12 / Right-Click) ========== */
/*
if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
  document.addEventListener('keydown', function(e) {
    if (e.keyCode == 123) { // F12
      e.preventDefault();
      return false;
    }
    if (e.ctrlKey && e.shiftKey && (e.keyCode == 73 || e.keyCode == 74)) { // Ctrl+Shift+I or J
      e.preventDefault();
      return false;
    }
    if (e.ctrlKey && e.keyCode == 85) { // Ctrl+U (View Source)
      e.preventDefault();
      return false;
    }
  });
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
  });
}
*/

const _API_CONFIG_ERROR_MSG = '❌ PRODUCTION_API_URL not configured! Edit config.js and set window.PRODUCTION_API_URL to your backend URL.';

const getAPIBaseURL = () => {
  if (window.API_CONFIG && window.API_CONFIG.baseURL) {
    return window.API_CONFIG.baseURL;
  }

  const hostname = window.location.hostname;

  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:3000/api';
  }

  if (!window.PRODUCTION_API_URL || window.PRODUCTION_API_URL === 'YOUR_BACKEND_URL_HERE/api') {
    console.error(_API_CONFIG_ERROR_MSG);

    const showConfigError = () => {
      if (!document.body) return;
      document.body.innerHTML = `
        <div style="
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          font-family: Arial, sans-serif;
          padding: 40px;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.15);
          max-width: 500px;
        ">
          <div style="font-size: 64px; margin-bottom: 20px;">⚠️</div>
          <h2 style="color: #dc3545; margin-bottom: 16px;">Configuration Error</h2>
          <p style="color: #666; margin-bottom: 24px;">
            The application is not properly configured for production.
          </p>
          <div style="
            background: #f8f9fa;
            border-left: 4px solid #dc3545;
            padding: 16px;
            text-align: left;
            border-radius: 4px;
            margin-bottom: 24px;
          ">
            <strong>Administrator:</strong> Edit <code>config.js</code> and set
            <code>PRODUCTION_API_URL</code> to your backend URL.
          </div>
          <p style="color: #999; font-size: 14px;">
            For assistance, contact the system administrator.
          </p>
        </div>
      `;
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', showConfigError);
    } else {
      showConfigError();
    }

    return '__UNCONFIGURED__';
  }

  return window.PRODUCTION_API_URL;
};

const API_BASE_URL = getAPIBaseURL();
// [v116.4] Reduced from 60s to 10s — 60s caused 3-4 min mobile freeze on Render cold starts
const REQUEST_TIMEOUT = 10000;

class SolmatesAPI {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.adminToken = localStorage.getItem('solmates_admin_token');

    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.log('✅ API Client initialized:', this.baseURL);
    }
  }

  isReady() {
    return true; // Constructor is synchronous, it's ready once instantiated
  }

  /**
   * v83.32: Persistent Device Fingerprint
   */
  getDeviceId() {
    let deviceId = localStorage.getItem('solmates_device_id');
    if (!deviceId) {
      deviceId = 'sol_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
      localStorage.setItem('solmates_device_id', deviceId);
    }
    return deviceId;
  }

  // ========== CORE REQUEST METHOD ==========
  async request(endpoint, options = {}, timeoutMs = REQUEST_TIMEOUT) {
    if (this.baseURL === '__UNCONFIGURED__') {
      throw new Error('API not configured. Please check configuration.');
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (!this.adminToken) {
      this.adminToken = localStorage.getItem('solmates_admin_token') || null;
    }

    if (this.adminToken && !options.skipAuth) {
      headers['Authorization'] = `Bearer ${this.adminToken}`;
    }

    // Add cache busting query param only - no custom headers
    let url = `${this.baseURL}${endpoint}`;
    const separator = url.includes('?') ? '&' : '?';
    url = `${url}${separator}_cb=${Date.now()}`;

    const config = {
      ...options,
      headers,
      signal: controller.signal,
      // Don't set cache-control headers - let browser handle it
    };

    try {
      const response = await fetch(url, config);
      clearTimeout(timeoutId);

      const data = await response.json();

      if (!response.ok) {
        let errorMsg = data.error || 'API request failed';
        if (data.details) {
          if (Array.isArray(data.details)) {
            errorMsg += ' — ' + data.details.map(d => d.message || d).join('; ');
          } else if (typeof data.details === 'string') {
            errorMsg += ' — ' + data.details;
          }
        }

        const error = new Error(errorMsg);
        error.status = response.status;
        error.details = data.details;

        if (response.status === 401) {
          this.adminToken = null;
          localStorage.removeItem('solmates_admin_token');
          localStorage.removeItem('solmates_admin_logged_in');

          if (window.location.pathname.includes('/admin/')) {
            alert('Session expired. Please login again.');
            window.location.href = '/';
          }
        }

        throw error;
      }

      return data;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        throw new Error('Request timeout - please try again');
      }
      throw error;
    }
  }

  // ========== FILE UPLOAD METHOD ==========
  async uploadFile(endpoint, formData, options = {}) {
    if (this.baseURL === '__UNCONFIGURED__') {
      throw new Error('API not configured. Please check configuration.');
    }

    const baseURL = this.baseURL.replace('/api', '') ||
      (window.PRODUCTION_API_URL || '').replace(/\/api\/?$/, '') ||
      'http://localhost:3000';

    const url = `${baseURL}/api${endpoint}`;
    const token = localStorage.getItem('solmates_admin_token');
    const headers = {};

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, {
        method: options.method || 'POST',
        headers,
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      return data;
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  }

  // ========== ADMIN METHODS ==========
  async adminLogin(adminId, password) {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ adminId, password }),
      skipAuth: true,
    });

    if (data.success) {
      this.adminToken = data.token;
      localStorage.setItem('solmates_admin_token', data.token);
      localStorage.setItem('solmates_admin_logged_in', 'true');
    }

    return data;
  }

  async verifyAdminToken() {
    if (!this.adminToken) return { valid: false };

    try {
      const data = await this.request('/auth/verify', {
        method: 'POST',
        body: JSON.stringify({ token: this.adminToken }),
        skipAuth: true,
      });

      if (!data.valid) {
        this.adminToken = null;
        localStorage.removeItem('solmates_admin_token');
      }

      return data;
    } catch (error) {
      if (error.status === 401 || error.status === 403) {
        this.adminToken = null;
        localStorage.removeItem('solmates_admin_token');
        return { valid: false };
      }
      console.warn('Backend unreachable during token verify - keeping token');
      return { valid: true, networkError: true };
    }
  }

  async adminLogout() {
    try {
      await this.request('/auth/logout', { method: 'POST' });
    } finally {
      this.adminToken = null;
      localStorage.removeItem('solmates_admin_token');
      localStorage.removeItem('solmates_admin_logged_in');
      localStorage.removeItem('homepage_admin_login');
      sessionStorage.removeItem('admin_session');
    }
  }

  isAdminLoggedIn() {
    const freshToken = localStorage.getItem('solmates_admin_token');
    if (freshToken && freshToken !== 'null' && freshToken !== 'undefined' && !this.adminToken) {
      this.adminToken = freshToken;
    }
    return !!(this.adminToken && this.adminToken !== 'null' && this.adminToken !== 'undefined');
  }

  clearAdminSession() {
    this.adminToken = null;
    localStorage.removeItem('solmates_admin_token');
    localStorage.removeItem('solmates_admin_logged_in');
  }

  getAdminAuthHeader() {
    const token = this.adminToken || localStorage.getItem('solmates_admin_token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }

  // ========== NOTIFICATION BROADCAST ==========
  async broadcastGreeting(title, message, semester) {
    return await this.request('/notifications/broadcast', {
      method: 'POST',
      body: JSON.stringify({ title, message, semester })
    }, 45000); // [Fix] 45 seconds timeout for backend cold starts
  }

  // ========== CONTENT METHODS ==========
  async getContent(type, semester = null, subject = null, folderId = null) {
    const params = new URLSearchParams();
    if (semester) params.append('semester', semester);
    if (subject) params.append('subject', subject);
    if (folderId) params.append('folderId', folderId);

    const queryString = params.toString();
    const url = `/content/${type}${queryString ? '?' + queryString : ''}`;
    return await this.request(url);
  }

  async addContent(type, data, semester = null, subject = null) {
    return await this.request(`/admin/content/${type}`, {
      method: 'POST',
      body: JSON.stringify({ data, semester, subject }),
    });
  }

  async updateContent(type, id, data, semester = null, subject = null) {
    return await this.request(`/admin/content/${type}/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ data, semester, subject }),
    });
  }

  async deleteContent(type, id) {
    return await this.request(`/admin/content/${type}/${id}`, {
      method: 'DELETE',
    });
  }

  // ========== YOUTUBE METHODS ==========
  async getYouTubeVideos(semester = null, subject = null) {
    const params = new URLSearchParams();
    if (semester) params.append('semester', semester);
    if (subject) params.append('subject', subject);

    const queryString = params.toString();
    return await this.request(`/youtube${queryString ? '?' + queryString : ''}`);
  }

  async addYouTubeVideo(videoData) {
    return await this.request('/admin/youtube', {
      method: 'POST',
      body: JSON.stringify(videoData),
    });
  }

  async updateYouTubeVideo(id, videoData) {
    return await this.request(`/admin/youtube/${id}`, {
      method: 'PUT',
      body: JSON.stringify(videoData),
    });
  }

  async deleteYouTubeVideo(id) {
    return await this.request(`/admin/youtube/${id}`, {
      method: 'DELETE',
    });
  }

  async importYouTubePlaylist(url, category, semester, folderId = null, createFolder = false, customFolderName = null, deleteOriginalId = null) {
    return await this.request('/sol/youtube/import-playlist', {
      method: 'POST',
      body: JSON.stringify({ url, category, semester, folderId, createFolder, customFolderName, deleteOriginalId }),
    });
  }

  async resortYouTubePlaylist(playlistUrl, category, semester, folderId = null) {
    return await this.request('/sol/youtube/resort-playlist', {
      method: 'POST',
      body: JSON.stringify({ playlistUrl, category, semester, folderId }),
    });
  }

  // ========== SEMESTER LINKS ==========
  async getSemesterLinks() {
    return await this.request('/semester-links');
  }

  async updateSemesterLink(semester, link, title = '') {
    const semStr = String(semester);
    const linkStr = (typeof link === 'object' && link !== null) ? (link.link || '') : String(link || '');
    return await this.request('/admin/semester-links', {
      method: 'POST',
      body: JSON.stringify({ semester: semStr, link: linkStr, title: title || '' }),
    });
  }

  async updateDriveLink(semester, linkData) {
    const semStr = String(semester);
    const linkStr = linkData === null ? 'null' : JSON.stringify(linkData);
    return await this.request('/admin/semester-links', {
      method: 'POST',
      body: JSON.stringify({ semester: `drive_${semStr}`, link: linkStr }),
    });
  }

  // ── Cache helpers (30s TTL) ───────────────────────────────────────────────
  getCache(key) {
    try {
      const raw = sessionStorage.getItem('solcache_v2_' + key);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed || !parsed.data) return null;
      // SWR: Return data even if old, UI will revalidate in background
      return parsed.data;
    } catch { return null; }
  }
  setCache(key, data) {
    if (!data) return;
    try { 
      sessionStorage.setItem('solcache_v2_' + key, JSON.stringify({ ts: Date.now(), data })); 
    } catch { }
  }
  _cacheClear(prefix) {
    try {
      // If no prefix, clear ALL solcache items
      // Otherwise clear items starting with the prefix (e.g. content_ or folders_)
      const searchPrefix = prefix ? 'solcache_v2_' + prefix : 'solcache_v2_';
      Object.keys(sessionStorage).forEach(k => {
        if (k.startsWith(searchPrefix)) sessionStorage.removeItem(k);
      });
    } catch (e) { console.warn('Cache clear error:', e); }
  }

  // ========== SOL METHODS ==========
  async getSOLContent(category, semester, folderId = null, skipCache = false) {
    const ckey = `content_${category}_${semester}_${folderId || 'root'}`;
    // SWR Logic: Only use blocking cache if NOT forced to skip
    if (!skipCache && category !== 'live-classes' && category !== 'recorded-class') {
        const cached = this.getCache(ckey);
        if (cached) return cached;
    }
    const params = new URLSearchParams();
    if (folderId) params.append('folderId', folderId);
    const queryString = params.toString();
    const result = await this.request(`/sol/${category}/${semester}${queryString ? '?' + queryString : ''}`);
    if (result && result.success && category !== 'live-classes') this.setCache(ckey, result);
    return result;
  }

  async searchYouTubeContent(query) {
    return await this.request(`/sol/search/youtube?q=${encodeURIComponent(query)}`);
  }

  async addSOLItem(category, semester, data) {
    this._cacheClear(`content_${category}`);
    this._cacheClear(`folders_${category}`); // Clear folders too as a safeguard
    return await this.request(`/sol/${category}/${semester}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // ========== FOLDER METHODS ==========
  async getSOLFolders(category, semester, parentId = null, skipCache = false, all = false) {
    const ckey = `folders_${category}_${semester}_${parentId || 'root'}_${all}`;
    if (!skipCache) {
      const cached = this.getCache(ckey);
      if (cached) return cached;
    }
    const params = new URLSearchParams();
    if (parentId) params.append('parentId', parentId);
    if (all) params.append('all', 'true');
    const queryString = params.toString();
    const result = await this.request(`/sol/folders/${category}/${semester}${queryString ? '?' + queryString : ''}`);
    if (result && result.success) this.setCache(ckey, result);
    return result;
  }

  async addSOLFolder(folderData) {
    this._cacheClear('folders_' + folderData.category);
    this._cacheClear('content_' + folderData.category);
    return await this.request('/sol/folders', {
      method: 'POST',
      body: JSON.stringify(folderData),
    });
  }

  async updateSOLFolder(id, folderData) {
    this._cacheClear('folders_');
    this._cacheClear('content_');
    return await this.request(`/sol/folders/${id}`, {
      method: 'PUT',
      body: JSON.stringify(folderData),
    });
  }

  async toggleSOLFolderLock(id) {
    this._cacheClear('folders_');
    this._cacheClear('content_');
    return await this.request(`/sol/folders/${id}/lock`, {
      method: 'PUT'
    });
  }

  async deleteSOLFolder(id) {
    this._cacheClear('folders_');
    this._cacheClear('content_');
    return await this.request(`/sol/folders/${id}`, {
      method: 'DELETE',
    });
  }



  async updateSOLItem(category, semester, id, data) {
    this._cacheClear(`content_${category}`);
    this._cacheClear(`folders_${category}`);
    return await this.request(`/sol/${category}/${semester}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteSOLItem(category, semester, id) {
    this._cacheClear(`content_${category}`);
    this._cacheClear(`folders_${category}`);
    return await this.request(`/sol/${category}/${semester}/${id}`, {
      method: 'DELETE',
    });
  }

  async reorderBulkSOL(type, ids, semester = 'all') {
    // [v88.9.x] Aggressive Cache Invalidation: Clear ALL SOL-related data!
    this._cacheClear(''); // Pass empty string to clear all 'solcache_*' keys
    return await this.request('/sol/reorder-bulk', {
      method: 'POST',
      body: JSON.stringify({ type, items: ids, semester }),
    });
  }

  // ========== CHATBOT ==========
  async sendChatMessage(message, history = []) {
    return await this.request('/chatbot', {
      method: 'POST',
      body: JSON.stringify({ message, history }),
      skipAuth: true,
    });
  }

  // ========== RESUME BUILDER ==========
  async createResumeDraft(data, template) {
    return await this.request('/resume', {
      method: 'POST',
      body: JSON.stringify({ data, template }),
    });
  }

  async getResumeDraft(id) {
    return await this.request(`/resume/${id}`);
  }

  async updateResumeDraft(id, data, template) {
    return await this.request(`/resume/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ data, template }),
    });
  }

  async downloadResumePdf(id) {
    const base = this.baseURL || (window.PRODUCTION_API_URL || 'http://localhost:3000/api');
    const url = `${base}/resume/${id}/pdf`;
    const token = localStorage.getItem('solmates_admin_token');
    const headers = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(url, { headers });
    if (!res.ok) throw new Error('Failed to generate PDF');

    const blob = await res.blob();
    return URL.createObjectURL(blob);
  }

  // ========== CAREER TEST METHODS ==========
  /**
   * Start a new career test
   */
  async startCareerTest(currentField, desiredField, experienceLevel) {
    // Only use query param for cache busting - no custom headers
    return await this.request(`/career-test/start`, {
      method: 'POST',
      body: JSON.stringify({
        currentField: currentField || '',
        desiredField,
        experienceLevel: experienceLevel || 'intermediate'
      })
    });
  }

  /**
   * Submit answers for a career test
   */
  async submitCareerTest(sessionId, answers) {
    return await this.request(`/career-test/submit/${sessionId}`, {
      method: 'POST',
      body: JSON.stringify({ answers }),
    });
  }

  /**
   * Get career test result
   */
  async getCareerTestResult(sessionId) {
    return await this.request(`/career-test/result/${sessionId}`);
  }

  /**
   * Analyze resume for career field detection
   */
  async analyzeResumeCareer(file) {
    const formData = new FormData();
    formData.append('resume', file);

    return await this.uploadFile('/career-test/analyze-resume', formData);
  }

  // ========== UNIFIED AI TOOLS METHODS ==========
  async generateAIToolData(toolType, userData = {}) {
    return await this.request('/ai-tools/generate', {
      method: 'POST',
      body: JSON.stringify({ toolType, ...userData }),
    });
  }

  async submitAIToolResult(sessionId, answers) {
    return await this.request('/ai-tools/submit', {
      method: 'POST',
      body: JSON.stringify({ sessionId, answers }),
    });
  }

  async explainAnswer(question, answer, context = 'General') {
    return await this.request('/ai-tools/explain', {
      method: 'POST',
      body: JSON.stringify({ question, answer, context }),
    });
  }

  // ========== INTERVIEW METHODS ==========
  async startInterview(field, difficulty) {
    return await this.request('/interview/start', {
      method: 'POST',
      body: JSON.stringify({ field, difficulty }),
    });
  }

  async analyzeResumeInterview(file) {
    const formData = new FormData();
    formData.append('resume', file);

    return await this.uploadFile('/interview/analyze-resume', formData);
  }

  async getInterviewQuestions(sessionId) {
    return await this.request(`/interview/questions?id=${sessionId}`);
  }

  async submitInterviewFeedback(sessionId, questionId, answer, rating) {
    return await this.request('/interview/feedback', {
      method: 'POST',
      body: JSON.stringify({ sessionId, questionId, answer, rating }),
    });
  }

  // ========== STUDY PLAN METHODS ==========
  async createStudyPlan(goals, availableHoursPerDay, examDate) {
    return await this.request('/study-plan', {
      method: 'POST',
      body: JSON.stringify({ goals, availableHoursPerDay, examDate }),
    });
  }

  async getStudyPlan(id) {
    return await this.request(`/study-plan/${id}`);
  }

  async updateStudyPlan(id, updates) {
    return await this.request(`/study-plan/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  // ========== TOOLS METHODS ==========
  async removeBackground(file) {
    const formData = new FormData();
    formData.append('image', file);

    return await this.uploadFile('/tools/remove-background', formData);
  }

  async convertFile(file, operation) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('operation', operation);

    return await this.uploadFile('/tools/convert', formData);
  }

  async compressFile(file, level, options = {}) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('level', level || 'medium');

    if (options.targetWidth) formData.append('targetWidth', String(options.targetWidth));
    if (options.targetHeight) formData.append('targetHeight', String(options.targetHeight));
    if (options.scalePercent) formData.append('scalePercent', String(options.scalePercent));

    return await this.uploadFile('/tools/compress', formData);
  }

  // ========== PUSH NOTIFICATION METHODS (v83.0) ==========
  
  /**
   * Helper to convert VAPID public key
   */
  urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  async subscribeToPush(semesters = null) {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      throw new Error('Push notifications are not supported in this browser.');
    }

    // v88.9.1: If no semesters provided, try to find persistent choice
    if (!semesters) {
        const savedSem = localStorage.getItem('solmates_active_semester');
        semesters = savedSem ? [savedSem] : ['all'];
    }

    const registration = await navigator.serviceWorker.ready;
    
    // v89.0: Use persistent Device ID for fingerprinting
    const deviceId = this.getDeviceId();
    
    // Public VAPID Key
    const publicVapidKey = 'BOviwaoubgZngyc_I9usdbR37cldjChsfiwNR0e0Q9-ouTOSszKa8aeWbO_ezYM2ppwgGsHyxoRBWVRS4g0jmcw';
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: this.urlBase64ToUint8Array(publicVapidKey)
    });

    const isApp = (typeof window.isWebView === 'function' && window.isWebView()) || 
                  window.matchMedia('(display-mode: standalone)').matches;
    const appSource = (window.location.search.includes('source=pwa') || window.location.search.includes('source=twa')) ? 'twa' : 
                      (typeof window.isMedianApp === 'function' && window.isMedianApp()) ? 'apk' : 'web';

    return await this.request('/notifications/subscribe', {
      method: 'POST',
      body: JSON.stringify({
        subscription,
        deviceId,
        semesters: Array.isArray(semesters) ? semesters : [semesters],
        metadata: {
          isApp,
          appSource,
          platform: navigator.platform,
          userAgent: navigator.userAgent
        }
      })
    });
  }

  async unsubscribeFromPush() {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    if (subscription) {
      await subscription.unsubscribe();
      return await this.request('/notifications/unsubscribe', {
        method: 'POST',
        body: JSON.stringify({ endpoint: subscription.endpoint })
      });
    }
    return { success: true };
  }

  async getPushSubscription() {
    if (!('serviceWorker' in navigator)) return null;
    const registration = await navigator.serviceWorker.ready;
    return await registration.pushManager.getSubscription();
  }

  // ========== RECYCLE BIN METHODS (v85.0) ==========
  async getRecycleBin() {
    return await this.request('/admin/recycle-bin');
  }

  async restoreFromBin(id) {
    // Clear caches to ensure restored items appear
    this._cacheClear('');
    return await this.request(`/admin/recycle-bin/restore/${id}`, {
      method: 'POST'
    });
  }

  async permanentDeleteFromBin(id) {
    return await this.request(`/admin/recycle-bin/${id}`, {
      method: 'DELETE'
    });
  }
}

// =====================================================
// Socket base URL builder
// =====================================================
window.getSocketBaseURL = function () {
  const apiURL = window.PRODUCTION_API_URL || 'http://localhost:3000/api';
  try {
    const url = new URL(apiURL);
    return url.origin;
  } catch (e) {
    if (window.RENDER_BACKEND_URL) return window.RENDER_BACKEND_URL;
    return window.location.origin;
  }
};

// Initialize global API client
window.solmatesAPI = new SolmatesAPI();

window.addConnectionStatusDot = function (socket) {
  if (!socket) return;

  const dot = document.createElement('div');
  dot.id = '_conn_status_dot';
  dot.title = 'Real-time connection status';
  dot.style.cssText = 'position:fixed;bottom:12px;right:12px;width:10px;height:10px;border-radius:50%;background:#ef4444;z-index:9999;transition:background 0.5s;box-shadow:0 0 0 2px rgba(255,255,255,0.8);';

  document.body.appendChild(dot);

  socket.on('connect', () => {
    dot.style.background = '#10b981';
    dot.title = 'Connected';
  });

  socket.on('disconnect', () => {
    dot.style.background = '#ef4444';
    dot.title = 'Disconnected';
  });

  socket.on('connect_error', () => {
    dot.style.background = '#f59e0b';
    dot.title = 'Connecting...';
  });

  if (socket.connected) dot.style.background = '#10b981';
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SolmatesAPI };
}
// --- Push Notification Auto-Migration & Silent Resync (v3) ---
(async function() {
  setTimeout(async () => {
    try {
      const manual = localStorage.getItem('sol_subscribed_sems');
      const isEnabled = localStorage.getItem('sol_notif_enabled') === 'true';
      
      if (manual && isEnabled) {
        let uiSelected = JSON.parse(manual);
        let pushSelected = [...uiSelected];
        if (uiSelected.includes('all')) {
          pushSelected = ['all', '0', '1', '2', '3', '4'];
        } else {
          if (!pushSelected.includes('0')) pushSelected.push('0');
          if (!pushSelected.includes('all')) pushSelected.push('all');
        }

        // Silent Resync every session to guarantee 100% notification delivery
        if (window.solmatesAPI && window.solmatesAPI.subscribeToPush) {
           await window.solmatesAPI.subscribeToPush(pushSelected).catch(() => null);
           console.log('[PUSH] Silent token resync completed.');
        }

        if (typeof window.syncNativePushTags === 'function') {
          window.syncNativePushTags(pushSelected);
        }
        localStorage.setItem('sol_push_migrated_v3', 'true');
      }
    } catch (e) {
      console.warn('[PUSH] Migration/Resync skip:', e);
    }
  }, 2500);
})();
