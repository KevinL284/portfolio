// Main Application - Entry Point & Orchestration

class PortfolioApp {
  constructor() {
    this.isInitialized = false;
    this.components = {};
    this.startTime = performance.now();

    this.init();
  }

  init() {
    console.log("🚀 Initializing Portfolio Application...");

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      DOM.on(document, 'DOMContentLoaded', () => this.start());
    } else {
      this.start();
    }
  }

  async start() {
    try {
      // Initialize core systems
      await this.initializeCore();

      // Initialize UI components
      await this.initializeComponents();

      // Setup global event listeners
      this.bindGlobalEvents();

      // Setup error handling
      this.setupErrorHandling();

      // Performance monitoring
      this.monitorPerformance();

      // Mark as initialized
      this.isInitialized = true;

      // Dispatch ready event
      document.dispatchEvent(new CustomEvent('appready'));

      console.log("✅ Portfolio Application initialized successfully");
      this.logInitTime();

    } catch (error) {
      console.error("❌ Failed to initialize application:", error);
      this.handleInitializationError(error);
    }
  }

  async initializeCore() {
    // Validate required config
    this.validateConfig();

    // Initialize theme from user preference
    this.initializeTheme();

    // Setup accessibility features
    this.setupAccessibility();

    // Initialize analytics
    this.initializeAnalytics();

    console.log("✅ Core systems initialized");
  }

  async initializeComponents() {
    // Components will auto-initialize via their respective modules
    // This method serves as a coordination point

    // Wait for critical components
    await this.waitForComponents([
      'themeManager',
      'navigationManager',
      'dynamicContentManager'
    ]);

    console.log("✅ UI components initialized");
  }

  validateConfig() {
    if (!window.CONFIG) {
      throw new Error("Configuration not loaded");
    }

    if (!CONFIG.personal?.name) {
      console.warn("Personal information not configured properly");
    }

    if (!PROJECTS_DATA?.length) {
      console.warn("No projects data found");
    }
  }

  initializeTheme() {
    // Theme manager will handle this, but we ensure it's ready
    if (!Storage.get(CONFIG.theme.storageKey) && CONFIG.theme.autoDetect) {
      const prefersDark = Device.prefersDarkMode();
      document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    }
  }

  setupAccessibility() {
    // Skip links for keyboard users
    this.createSkipLinks();

    // Focus management
    this.setupFocusManagement();

    // Screen reader announcements
    this.setupScreenReaderSupport();

    // High contrast mode detection
    this.handleHighContrastMode();

    console.log("✅ Accessibility features setup");
  }

  createSkipLinks() {
    const skipLinks = DOM.create('div', {
      className: 'skip-links',
      html: `
        <a href="#main" class="skip-link">Pular para conteúdo principal</a>
        <a href="#nav" class="skip-link">Pular para navegação</a>
      `
    });

    document.body.insertBefore(skipLinks, document.body.firstChild);
  }

  setupFocusManagement() {
    // Focus visible for keyboard users
    DOM.on(document, 'keydown', (e) => {
      if (e.key === 'Tab') {
        DOM.addClass(document.body, 'using-keyboard');
      }
    });

    DOM.on(document, 'mousedown', () => {
      DOM.removeClass(document.body, 'using-keyboard');
    });
  }

  setupScreenReaderSupport() {
    // Live region for dynamic content announcements
    const liveRegion = DOM.create('div', {
      id: 'sr-live-region',
      attributes: {
        'aria-live': 'polite',
        'aria-atomic': 'true'
      },
      className: 'sr-only'
    });

    document.body.appendChild(liveRegion);

    // Make it globally accessible
    window.announceToScreenReader = (message) => {
      liveRegion.textContent = message;
      setTimeout(() => liveRegion.textContent = '', 1000);
    };
  }

  handleHighContrastMode() {
    if (window.matchMedia) {
      const highContrastQuery = window.matchMedia('(prefers-contrast: high)');

      const handleHighContrast = (e) => {
        if (e.matches) {
          DOM.addClass(document.body, 'high-contrast');
        } else {
          DOM.removeClass(document.body, 'high-contrast');
        }
      };

      handleHighContrast(highContrastQuery);
      DOM.on(highContrastQuery, 'change', handleHighContrast);
    }
  }

  bindGlobalEvents() {
    // Window events
    DOM.on(window, 'resize', Performance.debounce(() => {
      this.handleResize();
    }, 250));

    DOM.on(window, 'orientationchange', () => {
      setTimeout(() => this.handleResize(), 100);
    });

    DOM.on(window, 'online', () => {
      this.handleNetworkChange(true);
    });

    DOM.on(window, 'offline', () => {
      this.handleNetworkChange(false);
    });

    // Keyboard shortcuts
    DOM.on(document, 'keydown', (e) => {
      this.handleKeyboardShortcuts(e);
    });

    // Custom events
    DOM.on(document, 'themechange', (e) => {
      this.handleThemeChange(e.detail.theme);
    });

    DOM.on(document, 'siteloaded', () => {
      this.handleSiteLoaded();
    });

    console.log("✅ Global events bound");
  }

  handleResize() {
    // Update viewport units for mobile browsers
    this.updateViewportUnits();

    // Notify components of resize
    document.dispatchEvent(new CustomEvent('viewportchange', {
      detail: Device.getViewport()
    }));
  }

  updateViewportUnits() {
    // Fix for mobile viewport height issues
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  handleNetworkChange(isOnline) {
    if (isOnline) {
      console.log("🌐 Network connection restored");
      DOM.removeClass(document.body, 'offline');
    } else {
      console.log("⚠️ Network connection lost");
      DOM.addClass(document.body, 'offline');
    }

    // Notify user
    if (window.announceToScreenReader) {
      window.announceToScreenReader(
        isOnline ? 'Conexão restabelecida' : 'Conexão perdida'
      );
    }
  }

  handleKeyboardShortcuts(e) {
    // Alt + T: Toggle theme
    if (e.altKey && e.key.toLowerCase() === 't') {
      e.preventDefault();
      if (window.themeManager) {
        window.themeManager.toggleTheme();
      }
    }

    // Alt + M: Toggle mobile menu
    if (e.altKey && e.key.toLowerCase() === 'm') {
      e.preventDefault();
      if (window.navigationManager && Device.isMobile()) {
        window.navigationManager.toggleMobileMenu();
      }
    }

    // Escape: Close modals/menus
    if (e.key === 'Escape') {
      this.closeAllOverlays();
    }
  }

  closeAllOverlays() {
    // Close modal
    if (window.projectManager) {
      window.projectManager.closeModal();
    }

    // Close mobile menu
    if (window.navigationManager) {
      window.navigationManager.closeMobileMenu();
    }
  }

  handleThemeChange(theme) {
    console.log(`🎨 Theme changed to: ${theme}`);

    // Update meta theme-color
    const metaTheme = DOM.get('meta[name="theme-color"]');
    if (metaTheme) {
      const color = theme === 'dark' ? '#0f172a' : '#2563eb';
      metaTheme.setAttribute('content', color);
    }

    // Announce to screen readers
    if (window.announceToScreenReader) {
      window.announceToScreenReader(`Tema alterado para ${theme === 'dark' ? 'escuro' : 'claro'}`);
    }
  }

  handleSiteLoaded() {
    console.log("🎉 Site fully loaded");

    // Remove loading class
    DOM.removeClass(document.body, 'loading');

    // Initialize non-critical features
    this.initializeNonCriticalFeatures();

    // Analytics page view
    this.trackPageView();
  }

  initializeNonCriticalFeatures() {
    // Lazy load non-critical images
    this.setupLazyLoading();

    // Initialize service worker
    this.initializeServiceWorker();

    // Setup PWA features
    this.setupPWAFeatures();
  }

  setupLazyLoading() {
    if ('IntersectionObserver' in window) {
      const lazyImages = DOM.getAll('img[loading="lazy"]');

      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      lazyImages.forEach(img => {
        img.classList.add('lazy');
        imageObserver.observe(img);
      });
    }
  }

  setupErrorHandling() {
    // Global error handler
    window.addEventListener('error', (e) => {
      this.handleGlobalError(e.error, e.filename, e.lineno);
    });

    // Promise rejection handler
    window.addEventListener('unhandledrejection', (e) => {
      this.handlePromiseRejection(e.reason);
    });

    console.log("✅ Error handling setup");
  }

  handleGlobalError(error, filename, lineno) {
    console.error("Global error:", error, `at ${filename}:${lineno}`);

    // Track error in analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'exception', {
        description: error.toString(),
        fatal: false
      });
    }

    // Show user-friendly message for critical errors
    if (filename && filename.includes('main.js')) {
      this.showErrorMessage("Ocorreu um erro inesperado. Recarregue a página para continuar.");
    }
  }

  handlePromiseRejection(reason) {
    console.error("Unhandled promise rejection:", reason);

    // Don't show user message for promise rejections
    // as they might be handled elsewhere
  }

  handleInitializationError(error) {
    console.error("Initialization failed:", error);

    // Show fallback content
    document.body.innerHTML = `
      <div class="error-fallback">
        <h1>Oops! Algo deu errado</h1>
        <p>Houve um problema ao carregar o site. Tente recarregar a página.</p>
        <button onclick="location.reload()">Recarregar Página</button>
      </div>
    `;
  }

  showErrorMessage(message) {
    // Simple error notification
    const errorDiv = DOM.create('div', {
      className: 'error-notification',
      html: `
        <div class="error-content">
          <i class="fas fa-exclamation-triangle"></i>
          <span>${message}</span>
          <button onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
      `
    });

    document.body.appendChild(errorDiv);

    // Auto remove after 10 seconds
    setTimeout(() => {
      if (document.body.contains(errorDiv)) {
        document.body.removeChild(errorDiv);
      }
    }, 10000);
  }

  monitorPerformance() {
    if ('performance' in window) {
      // Log performance metrics
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = performance.getEntriesByType('navigation')[0];
          if (perfData) {
            console.log("📊 Performance Metrics:", {
              'DNS Lookup': perfData.domainLookupEnd - perfData.domainLookupStart,
              'TCP Connect': perfData.connectEnd - perfData.connectStart,
              'DOM Content Loaded': perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
              'Load Complete': perfData.loadEventEnd - perfData.loadEventStart,
              'Total Load Time': perfData.loadEventEnd - perfData.navigationStart
            });
          }
        }, 0);
      });
    }
  }

  async waitForComponents(componentNames, timeout = 5000) {
    const startTime = Date.now();

    return new Promise((resolve, reject) => {
      const checkComponents = () => {
        const allReady = componentNames.every(name => window[name]);

        if (allReady) {
          resolve();
        } else if (Date.now() - startTime > timeout) {
          reject(new Error(`Components ${componentNames.join(', ')} not ready within ${timeout}ms`));
        } else {
          setTimeout(checkComponents, 50);
        }
      };

      checkComponents();
    });
  }

  logInitTime() {
    const initTime = performance.now() - this.startTime;
    console.log(`⚡ Application initialized in ${initTime.toFixed(2)}ms`);
  }

  initializeAnalytics() {
    // Google Analytics initialization would go here
    // gtag('config', 'GA_MEASUREMENT_ID');
    console.log("📊 Analytics initialized");
  }

  trackPageView() {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href
      });
    }
  }

  initializeServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('✅ Service Worker registered:', registration);
        })
        .catch(error => {
          console.log('Service Worker registration failed:', error);
        });
    }
  }

  setupPWAFeatures() {
    // Add to home screen prompt
    let deferredPrompt;

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;

      // Show install button if needed
      console.log('💾 PWA install prompt available');
    });
  }

  // Public API
  getVersion() {
    return "1.0.0";
  }

  getComponents() {
    return Object.keys(window).filter(key =>
      key.endsWith('Manager') && typeof window[key] === 'object'
    );
  }

  isReady() {
    return this.isInitialized;
  }
}

// Initialize the application
window.app = new PortfolioApp();

// Export for debugging
window.PortfolioApp = PortfolioApp;

console.log("✅ Main application loaded");
