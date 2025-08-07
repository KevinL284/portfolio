// Components - UI Components & Interactive Elements

// === THEME MANAGER === //

class ThemeManager {
  constructor() {
    this.currentTheme = 'light';
    this.storageKey = CONFIG.theme.storageKey;
    this.toggle = null;

    this.init();
  }

  init() {
    this.toggle = DOM.id('themeToggle');
    this.loadSavedTheme();
    this.bindEvents();
    this.updateIcon();

    console.log("✅ Theme Manager initialized");
  }

  bindEvents() {
    if (this.toggle) {
      DOM.on(this.toggle, 'click', () => this.toggleTheme());
    }

    // Listen for system theme changes
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      DOM.on(mediaQuery, 'change', (e) => {
        if (CONFIG.theme.autoDetect && !Storage.get(this.storageKey)) {
          this.setTheme(e.matches ? 'dark' : 'light');
        }
      });
    }
  }

  loadSavedTheme() {
    const savedTheme = Storage.get(this.storageKey);

    if (savedTheme) {
      this.setTheme(savedTheme);
    } else if (CONFIG.theme.autoDetect && Device.prefersDarkMode()) {
      this.setTheme('dark');
    } else {
      this.setTheme(CONFIG.theme.default);
    }
  }

  setTheme(theme) {
    this.currentTheme = theme;

    // Use Tailwind's dark mode class
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    Storage.set(this.storageKey, theme);
    this.updateIcon();

    // Dispatch custom event
    document.dispatchEvent(new CustomEvent('themechange', {
      detail: { theme }
    }));
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);

    // Add animation class
    if (this.toggle) {
      DOM.addClass(this.toggle, 'rotating');
      setTimeout(() => DOM.removeClass(this.toggle, 'rotating'), 300);
    }
  }

  updateIcon() {
    if (!this.toggle) return;

    const icon = this.toggle.querySelector('i');
    if (icon) {
      icon.className = this.currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
  }

  getCurrentTheme() {
    return this.currentTheme;
  }
}

// === NAVIGATION MANAGER === //

class NavigationManager {
  constructor() {
    this.nav = null;
    this.navMenu = null;
    this.navToggle = null;
    this.navLinks = null;
    this.header = null;
    this.isMenuOpen = false;
    this.lastScrollY = 0;

    this.init();
  }

  init() {
    this.header = DOM.id('header');
    this.navToggle = DOM.id('navToggle');
    this.navLinks = DOM.getAll('.nav-link');
    this.mobileMenu = DOM.id('mobileMenu');

    this.bindEvents();
    this.updateActiveLink();

    console.log("✅ Navigation Manager initialized");
  }

  bindEvents() {
    // Mobile menu toggle
    if (this.navToggle) {
      DOM.on(this.navToggle, 'click', () => this.toggleMobileMenu());
    }

    // Navigation links
    this.navLinks.forEach(link => {
      DOM.on(link, 'click', (e) => this.handleLinkClick(e));
    });

    // Scroll events
    DOM.on(window, 'scroll', Performance.throttle(() => {
      this.handleScroll();
      this.updateActiveLink();
    }, 100));

    // Close mobile menu on outside click
    DOM.on(document, 'click', (e) => {
      if (this.isMenuOpen && this.mobileMenu && !this.header?.contains(e.target)) {
        this.closeMobileMenu();
      }
    });

    // Keyboard navigation
    DOM.on(document, 'keydown', (e) => {
      if (e.key === 'Escape' && this.isMenuOpen) {
        this.closeMobileMenu();
      }
    });

    // Resize handler
    DOM.on(window, 'resize', Performance.debounce(() => {
      if (!Device.isMobile() && this.isMenuOpen) {
        this.closeMobileMenu();
      }
    }, 250));
  }

  toggleMobileMenu() {
    this.isMenuOpen ? this.closeMobileMenu() : this.openMobileMenu();
  }

  openMobileMenu() {
    this.isMenuOpen = true;

    if (this.mobileMenu) {
      DOM.addClass(this.mobileMenu, 'show');
    }

    if (this.navToggle) {
      DOM.addClass(this.navToggle, 'active');
    }

    DOM.addClass(document.body, 'nav-open');

    // Focus first link for accessibility
    const firstLink = this.mobileMenu?.querySelector('.nav-link');
    if (firstLink) firstLink.focus();
  }

  closeMobileMenu() {
    this.isMenuOpen = false;

    if (this.mobileMenu) {
      DOM.removeClass(this.mobileMenu, 'show');
    }

    if (this.navToggle) {
      DOM.removeClass(this.navToggle, 'active');
    }

    DOM.removeClass(document.body, 'nav-open');
  }

  handleLinkClick(e) {
    const link = e.target;
    const href = link.getAttribute('href');

    // Handle internal links (anchors)
    if (href?.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = DOM.id(targetId);

      if (targetElement) {
        Scroll.to(targetElement, CONFIG.scroll.offset);
        this.closeMobileMenu();

        // Update browser URL without triggering scroll
        if (history.pushState) {
          history.pushState(null, null, href);
        }
      }
    }
  }

  handleScroll() {
    const currentScrollY = window.scrollY;

    // Header scroll effect
    if (this.header) {
      if (currentScrollY > 100) {
        DOM.addClass(this.header, 'scrolled');
      } else {
        DOM.removeClass(this.header, 'scrolled');
      }
    }

    // Auto-hide header on scroll down (mobile)
    if (Device.isMobile()) {
      if (currentScrollY > this.lastScrollY && currentScrollY > 200) {
        DOM.addClass(this.header, 'header-hidden');
      } else {
        DOM.removeClass(this.header, 'header-hidden');
      }
    }

    this.lastScrollY = currentScrollY;
  }

  updateActiveLink() {
    const sections = DOM.getAll('.section');
    let currentSection = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - CONFIG.scroll.offset - 50;
      const sectionHeight = section.offsetHeight;

      if (window.scrollY >= sectionTop &&
          window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.id;
      }
    });

    // Update active link
    this.navLinks.forEach(link => {
      DOM.removeClass(link, 'active');
      const href = link.getAttribute('href');
      if (href === `#${currentSection}`) {
        DOM.addClass(link, 'active');
      }
    });
  }
}

// === LOADING MANAGER === //

class LoadingManager {
  constructor() {
    this.loadingScreen = DOM.id('loadingScreen');
    this.startTime = Date.now();

    this.init();
  }

  init() {
    if (!this.loadingScreen) return;

    // Ensure minimum loading time for better UX
    const minLoadingTime = CONFIG.loading.minDuration;
    const elapsed = Date.now() - this.startTime;
    const remainingTime = Math.max(0, minLoadingTime - elapsed);

    setTimeout(() => {
      this.hide();
    }, remainingTime);

    console.log("✅ Loading Manager initialized");
  }

  hide() {
    if (!this.loadingScreen) return;

    DOM.addClass(this.loadingScreen, 'fade-out');

    setTimeout(() => {
      DOM.css(this.loadingScreen, 'display', 'none');
      DOM.removeClass(document.body, 'loading');

      // Trigger loaded event
      document.dispatchEvent(new CustomEvent('siteloaded'));
    }, CONFIG.loading.fadeOutDuration);
  }

  show() {
    if (!this.loadingScreen) return;

    DOM.css(this.loadingScreen, 'display', 'flex');
    DOM.removeClass(this.loadingScreen, 'fade-out');
    DOM.addClass(document.body, 'loading');
  }
}

// === DYNAMIC CONTENT MANAGER === //

class DynamicContentManager {
  constructor() {
    this.init();
  }

  init() {
    this.updateAge();
    this.updateCurrentYear();
    this.updateGraduationStatus();
    this.loadGitHubProfile();

    console.log("✅ Dynamic Content Manager initialized");
  }

  updateAge() {
    const ageElement = DOM.id('currentAge');
    if (ageElement && CONFIG.personal.birthDate) {
      const age = DateUtils.calculateAge(CONFIG.personal.birthDate);
      ageElement.textContent = `${age} anos`;
    }
  }

  updateCurrentYear() {
    const yearElements = DOM.getAll('#currentYear');
    const currentYear = DateUtils.getCurrentYear();

    yearElements.forEach(element => {
      element.textContent = currentYear;
    });
  }

  updateGraduationStatus() {
    const graduationElement = DOM.id('graduationStatus');
    if (graduationElement && CONFIG.personal.graduationYear) {
      const status = DateUtils.yearsToGraduation(
        CONFIG.personal.graduationYear,
        CONFIG.personal.graduationMonth
      );
      graduationElement.textContent = status;
    }
  }

  async loadGitHubProfile() {
    const profileImage = DOM.id('profileImage');
    if (!profileImage || !CONFIG.personal.githubUsername) return;

    try {
      // Use GitHub avatar URL directly for better performance
      const avatarUrl = `https://avatars.githubusercontent.com/${CONFIG.personal.githubUsername}?v=4&size=400`;
      profileImage.src = avatarUrl;
      profileImage.alt = CONFIG.personal.name;

      // Optional: Load additional GitHub data
      if (API_ENDPOINTS.github.profile) {
        const profileData = await Http.get(API_ENDPOINTS.github.profile);

        // Update bio or other info if needed
        console.log('GitHub profile loaded:', profileData.name);
      }
    } catch (error) {
      console.warn('Failed to load GitHub profile:', error);
      // Fallback to default image
      profileImage.src = 'src/assets/images/profile-default.jpg';
    }
  }
}

// === SCROLL ANIMATIONS === //

class ScrollAnimations {
  constructor() {
    this.observer = null;
    this.elements = [];

    this.init();
  }

  init() {
    if (!('IntersectionObserver' in window) || Device.prefersReducedMotion()) {
      return; // Skip animations if not supported or user prefers reduced motion
    }

    this.setupObserver();
    this.observeElements();

    console.log("✅ Scroll Animations initialized");
  }

  setupObserver() {
    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      {
        threshold: 0.1,
        rootMargin: '50px 0px -50px 0px'
      }
    );
  }

  observeElements() {
    // Elements to animate
    const selectors = [
      '.hero__text > *',
      '.hero__visual',
      '.about__text > *',
      '.about__skills-preview',
      '.timeline__item',
      '.project-card',
      '.skill-category',
      '.contact__content > *'
    ];

    selectors.forEach(selector => {
      const elements = DOM.getAll(selector);
      elements.forEach(el => {
        DOM.addClass(el, 'animate-on-scroll');
        this.observer.observe(el);
      });
    });
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        DOM.addClass(entry.target, 'animate-fade-in-up');
        this.observer.unobserve(entry.target);
      }
    });
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

// === CONTACT MANAGER === //

class ContactManager {
  constructor() {
    this.init();
  }

  init() {
    this.bindEvents();
    console.log("✅ Contact Manager initialized");
  }

  bindEvents() {
    // Copy email to clipboard
    const emailElements = DOM.getAll('[href^="mailto:"]');
    emailElements.forEach(element => {
      DOM.on(element, 'click', (e) => {
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          this.copyToClipboard(element.href.replace('mailto:', ''));
        }
      });
    });

    // Social media tracking
    const socialLinks = DOM.getAll('.contact__method[href^="http"]');
    socialLinks.forEach(link => {
      DOM.on(link, 'click', () => {
        const platform = this.extractPlatform(link.href);
        this.trackSocialClick(platform);
      });
    });
  }

  async copyToClipboard(text) {
    try {
      await Clipboard.copy(text);
      this.showToast('Email copiado para a área de transferência!', 'success');
    } catch (error) {
      console.error('Failed to copy email:', error);
      this.showToast('Erro ao copiar email', 'error');
    }
  }

  extractPlatform(url) {
    if (url.includes('linkedin')) return 'linkedin';
    if (url.includes('github')) return 'github';
    if (url.includes('whatsapp') || url.includes('wa.me')) return 'whatsapp';
    return 'other';
  }

  trackSocialClick(platform) {
    // Analytics tracking
    if (typeof gtag !== 'undefined') {
      gtag('event', 'social_click', {
        'platform': platform
      });
    }

    console.log(`📊 Social click: ${platform}`);
  }

  showToast(message, type = 'info') {
    // Simple toast notification
    const toast = DOM.create('div', {
      className: `toast toast--${type}`,
      text: message
    });

    document.body.appendChild(toast);

    // Animate in
    setTimeout(() => DOM.addClass(toast, 'toast--show'), 100);

    // Remove after 3 seconds
    setTimeout(() => {
      DOM.removeClass(toast, 'toast--show');
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 3000);
  }
}

// === CONTACT FORM MANAGER === //

class ContactFormManager {
  constructor() {
    this.form = null;
    this.submitBtn = null;
    this.init();
  }

  init() {
    this.form = DOM.id('contactForm');

    if (this.form) {
      this.submitBtn = this.form.querySelector('button[type="submit"]');
      this.bindEvents();
      console.log("✅ Contact Form Manager initialized");
    }
  }

  bindEvents() {
    DOM.on(this.form, 'submit', (e) => this.handleSubmit(e));

    // Add real-time validation
    const inputs = this.form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      DOM.on(input, 'blur', () => this.validateField(input));
    });
  }

  async handleSubmit(e) {
    e.preventDefault();

    if (!this.validateForm()) {
      return;
    }

    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData);

    // Show loading state
    this.setLoading(true);

    try {
      // Create mailto link with form data
      const subject = encodeURIComponent(data.subject);
      const body = encodeURIComponent(
        `Nome: ${data.name}\n` +
        `E-mail: ${data.email}\n\n` +
        `Mensagem:\n${data.message}`
      );

      const mailtoLink = `mailto:kevin.lucas284sz@gmail.com?subject=${subject}&body=${body}`;

      // Open mailto link
      window.location.href = mailtoLink;

      // Show success message
      this.showToast('E-mail preparado! Verifique seu cliente de e-mail.', 'success');

      // Reset form after delay
      setTimeout(() => this.form.reset(), 1000);

    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      this.showToast('Erro ao preparar e-mail. Tente novamente.', 'error');
    } finally {
      this.setLoading(false);
    }
  }

  validateForm() {
    const inputs = this.form.querySelectorAll('input, textarea');
    let isValid = true;

    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });

    return isValid;
  }

  validateField(field) {
    const value = field.value.trim();
    let isValid = true;

    // Remove previous error states
    DOM.removeClass(field, 'form-error');
    this.removeErrorMessage(field);

    // Required field validation
    if (field.required && !value) {
      this.showFieldError(field, 'Este campo é obrigatório');
      isValid = false;
    }

    // Email validation
    if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        this.showFieldError(field, 'Digite um e-mail válido');
        isValid = false;
      }
    }

    return isValid;
  }

  showFieldError(field, message) {
    DOM.addClass(field, 'form-error');

    const errorEl = DOM.create('span', {
      className: 'form-error-message',
      text: message
    });

    field.parentNode.appendChild(errorEl);
  }

  removeErrorMessage(field) {
    const errorEl = field.parentNode.querySelector('.form-error-message');
    if (errorEl) {
      errorEl.remove();
    }
  }

  setLoading(loading) {
    if (this.submitBtn) {
      this.submitBtn.disabled = loading;
      this.submitBtn.innerHTML = loading
        ? '<i class="fas fa-spinner fa-spin"></i> Preparando...'
        : '<i class="fas fa-paper-plane"></i> Enviar Mensagem';
    }
  }

  showToast(message, type = 'info') {
    // Simple toast notification
    const toast = DOM.create('div', {
      className: `toast toast--${type}`,
      text: message
    });

    document.body.appendChild(toast);

    // Animate in
    setTimeout(() => DOM.addClass(toast, 'toast--show'), 100);

    // Remove after 4 seconds
    setTimeout(() => {
      DOM.removeClass(toast, 'toast--show');
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 4000);
  }
}

// === INITIALIZE COMPONENTS === //

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  window.themeManager = new ThemeManager();
  window.navigationManager = new NavigationManager();
  window.loadingManager = new LoadingManager();
  window.dynamicContentManager = new DynamicContentManager();
  window.scrollAnimations = new ScrollAnimations();
  window.contactManager = new ContactManager();
  window.contactFormManager = new ContactFormManager();

  console.log("✅ All components initialized");
});

console.log("✅ Components module loaded");
