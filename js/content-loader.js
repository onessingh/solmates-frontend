/**
 * Dynamic Content Loader Utility
 * FIX: Replaced innerHTML with safe DOM API throughout to eliminate XSS vectors.
 * FIX: Use item.url (backend field name) not item.link (was broken).
 * FIX: URL sanitization before setting href attributes.
 */

/**
 * Sanitize a URL — only allow http/https to prevent javascript: injection
 */
function sanitizeUrl(url) {
    if (!url || typeof url !== 'string') return '#';
    try {
        const parsed = new URL(url);
        if (!['http:', 'https:'].includes(parsed.protocol)) return '#';
        return parsed.href;
    } catch {
        return '#';
    }
}

/**
 * Load and display YouTube videos dynamically
 * @param {string} semester - Semester number ('1', '2', '3', '4')
 * @param {string} containerId - ID of container element
 */
async function loadYouTubeVideos(semester, containerId) {
    const container = document.getElementById(containerId);

    if (!container) {
        console.error('Container ' + containerId + ' not found');
        return;
    }

    // Show loading state (safe — static text only)
    container.textContent = '';
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading';
    loadingDiv.textContent = 'Loading videos...';
    container.appendChild(loadingDiv);

    try {
        const response = await window.solmatesAPI.getYouTubeVideos(semester);

        container.textContent = '';

        if (response.success && response.data.length > 0) {
            response.data.forEach(function(video) {
                const card = document.createElement('div');
                card.className = 'video-card';

                // Thumbnail
                const thumbDiv = document.createElement('div');
                thumbDiv.className = 'video-thumbnail';
                const img = document.createElement('img');
                const thumbUrl = sanitizeUrl(video.thumbnail);
                img.src = thumbUrl !== '#' ? video.thumbnail : '/assets/default-video.jpg';
                img.alt = video.title; // safe: sets attribute via property
                img.addEventListener('error', function() { this.src = '/assets/default-video.jpg'; });
                thumbDiv.appendChild(img);

                // Info
                const infoDiv = document.createElement('div');
                infoDiv.className = 'video-info';

                const h3 = document.createElement('h3');
                h3.textContent = video.title; // textContent is XSS-safe

                infoDiv.appendChild(h3);

                if (video.subject) {
                    const subP = document.createElement('p');
                    subP.className = 'video-subject';
                    subP.textContent = video.subject;
                    infoDiv.appendChild(subP);
                }

                const link = document.createElement('a');
                link.href = sanitizeUrl(video.url); // FIX: use video.url (backend field name)
                link.textContent = 'Watch Video';
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                link.className = 'watch-btn';
                infoDiv.appendChild(link);

                card.appendChild(thumbDiv);
                card.appendChild(infoDiv);
                container.appendChild(card);
            });
        } else {
            // no content, show nothing
        }
    } catch (error) {
        console.error('Error loading videos:', error);
        container.textContent = '';
        const errDiv = document.createElement('div');
        errDiv.className = 'error';
        errDiv.textContent = 'Error loading videos. Please try again later.';
        container.appendChild(errDiv);
    }
}

/**
 * Load and display content (notes, pyq, etc.) dynamically
 * @param {string} type - Content type ('notes', 'pyq', 'oneshot', etc.)
 * @param {string} semester - Semester number (optional)
 * @param {string} containerId - ID of container element
 */
async function loadContent(type, semester, containerId) {
    const container = document.getElementById(containerId);

    if (!container) {
        console.error('Container ' + containerId + ' not found');
        return;
    }

    container.textContent = '';
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading';
    loadingDiv.textContent = 'Loading content...';
    container.appendChild(loadingDiv);

    try {
        const response = await window.solmatesAPI.getContent(type, semester);

        container.textContent = '';

        if (response.success && response.data.length > 0) {
            response.data.forEach(function(item) {
                const card = document.createElement('div');
                card.className = 'content-card';

                // Thumbnail
                const thumbDiv = document.createElement('div');
                thumbDiv.className = 'content-thumbnail';
                const img = document.createElement('img');
                const thumbUrl = sanitizeUrl(item.thumbnail);
                img.src = thumbUrl !== '#' ? item.thumbnail : '/assets/default-content.jpg';
                img.alt = item.title;
                img.addEventListener('error', function() { this.src = '/assets/default-content.jpg'; });
                thumbDiv.appendChild(img);

                // Info
                const infoDiv = document.createElement('div');
                infoDiv.className = 'content-info';

                const h3 = document.createElement('h3');
                h3.textContent = item.title;
                infoDiv.appendChild(h3);

                if (item.description) {
                    const desc = document.createElement('p');
                    desc.className = 'content-description';
                    desc.textContent = item.description;
                    infoDiv.appendChild(desc);
                }

                if (item.subject) {
                    const subP = document.createElement('p');
                    subP.className = 'content-subject';
                    subP.textContent = item.subject;
                    infoDiv.appendChild(subP);
                }

                const link = document.createElement('a');
                link.href = sanitizeUrl(item.url); // FIX: use item.url (backend field name)
                link.textContent = 'View ' + type.charAt(0).toUpperCase() + type.slice(1);
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                link.className = 'view-btn';
                infoDiv.appendChild(link);

                card.appendChild(thumbDiv);
                card.appendChild(infoDiv);
                container.appendChild(card);
            });
        } else {
            // no content, show nothing
        }
    } catch (error) {
        console.error('Error loading ' + type + ':', error);
        container.textContent = '';
        const errDiv = document.createElement('div');
        errDiv.className = 'error';
        errDiv.textContent = 'Error loading ' + type + '. Please try again later.';
        container.appendChild(errDiv);
    }
}

/**
 * Load semester links
 * @returns {Promise<Object>} Semester links object
 */
async function loadSemesterLinks() {
    try {
        const response = await window.solmatesAPI.getSemesterLinks();
        if (response.success) return response.data;
        return { '1': '', '2': '', '3': '', '4': '' };
    } catch (error) {
        console.error('Error loading semester links:', error);
        return { '1': '', '2': '', '3': '', '4': '' };
    }
}

/**
 * Escape HTML to prevent XSS — kept for use in admin pages that still use innerHTML
 * for static/trusted UI structure (not user data).
 */
function escapeHtml(text) {
    if (text === null || text === undefined) return '';
    const div = document.createElement('div');
    div.textContent = String(text);
    return div.innerHTML;
}

/**
 * Show loading overlay
 */
function showLoading() {
    const overlay = document.createElement('div');
    overlay.id = 'loading-overlay';
    overlay.style.cssText = [
        'position:fixed', 'top:0', 'left:0', 'width:100%', 'height:100%',
        'background:rgba(0,0,0,0.5)', 'display:flex', 'flex-direction:column',
        'align-items:center', 'justify-content:center', 'z-index:9999', 'color:white'
    ].join(';');
    const spinner = document.createElement('div');
    spinner.className = 'spinner';
    const msg = document.createElement('p');
    msg.textContent = 'Loading...';
    overlay.appendChild(spinner);
    overlay.appendChild(msg);
    document.body.appendChild(overlay);
}

/**
 * Hide loading overlay
 */
function hideLoading() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) overlay.remove();
}
