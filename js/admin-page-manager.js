// Centralized admin page functionality
// AUDIT FIX #5: Centralize auth guard usage across all admin pages
// AUDIT FIX #6: Add loading screen for protected pages

class AdminPageManager {
  constructor(contentType) {
    this.contentType = contentType;
    this.isAuthenticated = false;
  }

  async initialize() {
    // Show loading screen
    this.showLoading();
    
    // AUDIT FIX #5: Use centralized auth guard
    this.isAuthenticated = await requireAdminAuth();
    
    if (!this.isAuthenticated) {
      // Auth guard will handle redirect
      return;
    }
    
    // Hide loading, show content
    this.hideLoading();
    this.showContent();
    
    // Initialize page-specific functionality
    await this.loadContent();
    this.attachEventListeners();
  }

  showLoading() {
    const loadingEl = document.getElementById('auth-loading');
    if (loadingEl) {
      loadingEl.style.display = 'flex';
    }
    
    const contentEl = document.getElementById('page-content');
    if (contentEl) {
      contentEl.style.display = 'none';
    }
  }

  hideLoading() {
    const loadingEl = document.getElementById('auth-loading');
    if (loadingEl) {
      loadingEl.style.display = 'none';
    }
  }

  showContent() {
    document.body.style.display = 'block';
    
    const contentEl = document.getElementById('page-content');
    if (contentEl) {
      contentEl.style.display = 'block';
    }
  }

  async loadContent() {
    // Override this method in specific pages
    console.log('Loading content for:', this.contentType);
  }

  attachEventListeners() {
    // Override this method in specific pages
    console.log('Attaching event listeners for:', this.contentType);
  }

  sanitizeInput(input) {
    // AUDIT FIX #4: Sanitize user input
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
  }

  createSafeElement(tag, textContent, attributes = {}) {
    // AUDIT FIX #4: Safe element creation
    const element = document.createElement(tag);
    if (textContent) {
      element.textContent = textContent;
    }
    Object.keys(attributes).forEach(key => {
      if (key === 'href' || key === 'src') {
        // Validate URLs
        try {
          const url = new URL(attributes[key], window.location.origin);
          element.setAttribute(key, url.href);
        } catch (e) {
          console.warn('Invalid URL:', attributes[key]);
        }
      } else {
        element.setAttribute(key, attributes[key]);
      }
    });
    return element;
  }

  async addContentItem(data) {
    try {
      const response = await solmatesAPI.addContent(
        this.contentType,
        data,
        data.semester,
        data.subject
      );
      
      if (response.success) {
        alert('Content added successfully!');
        await this.loadContent();
        return true;
      }
    } catch (error) {
      console.error('Error adding content:', error);
      alert('Failed to add content: ' + error.message);
      return false;
    }
  }

  async updateContentItem(id, data) {
    try {
      const response = await solmatesAPI.updateContent(
        this.contentType,
        id,
        data
      );
      
      if (response.success) {
        alert('Content updated successfully!');
        await this.loadContent();
        return true;
      }
    } catch (error) {
      console.error('Error updating content:', error);
      alert('Failed to update content: ' + error.message);
      return false;
    }
  }

  async deleteContentItem(id) {
    if (!confirm('Are you sure you want to delete this item?')) {
      return false;
    }
    
    try {
      const response = await solmatesAPI.deleteContent(this.contentType, id);
      
      if (response.success) {
        alert('Content deleted successfully!');
        await this.loadContent();
        return true;
      }
    } catch (error) {
      console.error('Error deleting content:', error);
      alert('Failed to delete content: ' + error.message);
      return false;
    }
  }
}

// Export for use in individual pages
window.AdminPageManager = AdminPageManager;
