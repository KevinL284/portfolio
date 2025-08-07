// Utilities - Helper Functions & Common Operations

// === DOM UTILITIES === //

const DOM = {
  // Element Selection
  get: (selector) => document.querySelector(selector),
  getAll: (selector) => document.querySelectorAll(selector),
  id: (id) => document.getElementById(id),

  // Element Creation
  create: (tag, options = {}) => {
    const element = document.createElement(tag);

    if (options.className) element.className = options.className;
    if (options.id) element.id = options.id;
    if (options.text) element.textContent = options.text;
    if (options.html) element.innerHTML = options.html;
    if (options.attributes) {
      Object.entries(options.attributes).forEach(([key, value]) => {
        element.setAttribute(key, value);
      });
    }

    return element;
  },

  // Element Manipulation
  addClass: (element, className) => element?.classList.add(className),
  removeClass: (element, className) => element?.classList.remove(className),
  toggleClass: (element, className) => element?.classList.toggle(className),
  hasClass: (element, className) => element?.classList.contains(className),

  // Event Handling
  on: (element, event, handler, options) => {
    if (element) {
      element.addEventListener(event, handler, options);
    }
  },

  off: (element, event, handler) => {
    if (element) {
      element.removeEventListener(event, handler);
    }
  },

  // Attribute Management
  attr: (element, name, value) => {
    if (value === undefined) {
      return element?.getAttribute(name);
    } else {
      element?.setAttribute(name, value);
    }
  },

  removeAttr: (element, name) => element?.removeAttribute(name),

  // Style Management
  css: (element, property, value) => {
    if (typeof property === 'object') {
      Object.entries(property).forEach(([key, val]) => {
        element.style[key] = val;
      });
    } else if (value === undefined) {
      return getComputedStyle(element).getPropertyValue(property);
    } else {
      element.style[property] = value;
    }
  },

  // Visibility
  show: (element) => element.style.display = 'block',
  hide: (element) => element.style.display = 'none',
  toggle: (element) => {
    element.style.display = element.style.display === 'none' ? 'block' : 'none';
  }
};

// === ANIMATION UTILITIES === //

const Animation = {
  // Fade animations
  fadeIn: (element, duration = 300) => {
    element.style.opacity = '0';
    element.style.display = 'block';

    return new Promise(resolve => {
      const animation = element.animate([
        { opacity: 0 },
        { opacity: 1 }
      ], {
        duration,
        easing: 'ease-out',
        fill: 'forwards'
      });

      animation.onfinish = () => {
        element.style.opacity = '1';
        resolve();
      };
    });
  },

  fadeOut: (element, duration = 300) => {
    return new Promise(resolve => {
      const animation = element.animate([
        { opacity: 1 },
        { opacity: 0 }
      ], {
        duration,
        easing: 'ease-out',
        fill: 'forwards'
      });

      animation.onfinish = () => {
        element.style.display = 'none';
        element.style.opacity = '0';
        resolve();
      };
    });
  },

  // Slide animations
  slideDown: (element, duration = 300) => {
    element.style.height = '0';
    element.style.overflow = 'hidden';
    element.style.display = 'block';

    const height = element.scrollHeight;

    return new Promise(resolve => {
      const animation = element.animate([
        { height: '0px' },
        { height: `${height}px` }
      ], {
        duration,
        easing: 'ease-out',
        fill: 'forwards'
      });

      animation.onfinish = () => {
        element.style.height = 'auto';
        resolve();
      };
    });
  },

  slideUp: (element, duration = 300) => {
    const height = element.scrollHeight;
    element.style.height = `${height}px`;
    element.style.overflow = 'hidden';

    return new Promise(resolve => {
      const animation = element.animate([
        { height: `${height}px` },
        { height: '0px' }
      ], {
        duration,
        easing: 'ease-out',
        fill: 'forwards'
      });

      animation.onfinish = () => {
        element.style.display = 'none';
        resolve();
      };
    });
  },

  // Scale animations
  scaleIn: (element, duration = 300) => {
    element.style.transform = 'scale(0)';
    element.style.display = 'block';

    return new Promise(resolve => {
      const animation = element.animate([
        { transform: 'scale(0)', opacity: 0 },
        { transform: 'scale(1)', opacity: 1 }
      ], {
        duration,
        easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        fill: 'forwards'
      });

      animation.onfinish = () => {
        element.style.transform = 'scale(1)';
        element.style.opacity = '1';
        resolve();
      };
    });
  }
};

// === STORAGE UTILITIES === //

const Storage = {
  // Local Storage
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return false;
    }
  },

  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue;
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing from localStorage:', error);
      return false;
    }
  },

  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  },

  // Session Storage
  sessionSet: (key, value) => {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error saving to sessionStorage:', error);
      return false;
    }
  },

  sessionGet: (key, defaultValue = null) => {
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error reading from sessionStorage:', error);
      return defaultValue;
    }
  }
};

// === DATE UTILITIES === //

const DateUtils = {
  // Calculate age from birth date
  calculateAge: (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age;
  },

  // Format date
  format: (date, locale = 'pt-BR', options = {}) => {
    return new Date(date).toLocaleDateString(locale, options);
  },

  // Get current year
  getCurrentYear: () => new Date().getFullYear(),

  // Calculate years until graduation
  yearsToGraduation: (graduationYear, graduationMonth = 12) => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1; // getMonth() returns 0-11, so add 1

    const graduationDate = new Date(graduationYear, graduationMonth - 1); // Month is 0-indexed
    const isGraduationPassed = today > graduationDate;

    const monthNames = [
      'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
      'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
    ];

    if (isGraduationPassed) {
      return `Concluído em ${monthNames[graduationMonth - 1]} de ${graduationYear}`;
    } else if (graduationYear === currentYear) {
      return `com formatura prevista para ${monthNames[graduationMonth - 1]} de ${graduationYear}`;
    } else {
      return `com formatura prevista para ${monthNames[graduationMonth - 1]} de ${graduationYear}`;
    }
  }
};

// === VALIDATION UTILITIES === //

const Validate = {
  email: (email) => VALIDATION.email.test(email),
  phone: (phone) => VALIDATION.phone.test(phone),
  url: (url) => VALIDATION.url.test(url),
  required: (value) => value && value.trim().length > 0,
  minLength: (value, min) => value && value.length >= min,
  maxLength: (value, max) => value && value.length <= max
};

// === STRING UTILITIES === //

const StringUtils = {
  // Capitalize first letter
  capitalize: (str) => str.charAt(0).toUpperCase() + str.slice(1),

  // Title case
  titleCase: (str) => {
    return str.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  },

  // Slug generation
  slug: (str) => {
    return str
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-')     // Replace spaces with hyphens
      .replace(/-+/g, '-')      // Replace multiple hyphens with single
      .trim();
  },

  // Truncate text
  truncate: (str, length, suffix = '...') => {
    if (str.length <= length) return str;
    return str.slice(0, length) + suffix;
  },

  // Remove HTML tags
  stripHtml: (html) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }
};

// === ARRAY UTILITIES === //

const ArrayUtils = {
  // Shuffle array
  shuffle: (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  },

  // Get unique values
  unique: (array) => [...new Set(array)],

  // Group by property
  groupBy: (array, key) => {
    return array.reduce((groups, item) => {
      const group = item[key];
      groups[group] = groups[group] || [];
      groups[group].push(item);
      return groups;
    }, {});
  },

  // Sort by property
  sortBy: (array, key, order = 'asc') => {
    return [...array].sort((a, b) => {
      if (order === 'desc') {
        return b[key] > a[key] ? 1 : -1;
      }
      return a[key] > b[key] ? 1 : -1;
    });
  }
};

// === HTTP UTILITIES === //

const Http = {
  // GET request
  get: async (url, options = {}) => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('GET request failed:', error);
      throw error;
    }
  },

  // POST request
  post: async (url, data, options = {}) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        body: JSON.stringify(data),
        ...options
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('POST request failed:', error);
      throw error;
    }
  }
};

// === DEVICE UTILITIES === //

const Device = {
  // Check if mobile
  isMobile: () => window.innerWidth <= 768,

  // Check if tablet
  isTablet: () => window.innerWidth > 768 && window.innerWidth <= 1024,

  // Check if desktop
  isDesktop: () => window.innerWidth > 1024,

  // Check if touch device
  isTouch: () => 'ontouchstart' in window,

  // Get viewport size
  getViewport: () => ({
    width: window.innerWidth,
    height: window.innerHeight
  }),

  // Check if user prefers reduced motion
  prefersReducedMotion: () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  // Check if user prefers dark mode
  prefersDarkMode: () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
};

// === DEBOUNCE & THROTTLE === //

const Performance = {
  // Debounce function
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle function
  throttle: (func, limit) => {
    let inThrottle;
    return function executedFunction(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // Request Animation Frame wrapper
  raf: (callback) => {
    return requestAnimationFrame(callback);
  }
};

// === CLIPBOARD UTILITIES === //

const Clipboard = {
  // Copy text to clipboard
  copy: async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        document.execCommand('copy');
        document.body.removeChild(textArea);
        return true;
      } catch (fallbackError) {
        document.body.removeChild(textArea);
        console.error('Failed to copy text:', fallbackError);
        return false;
      }
    }
  }
};

// === SCROLL UTILITIES === //

const Scroll = {
  // Smooth scroll to element
  to: (element, offset = 0) => {
    const targetElement = typeof element === 'string' ? DOM.get(element) : element;
    if (!targetElement) return;

    const targetPosition = targetElement.offsetTop - offset;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  },

  // Get scroll position
  getPosition: () => ({
    x: window.pageXOffset || document.documentElement.scrollLeft,
    y: window.pageYOffset || document.documentElement.scrollTop
  }),

  // Check if element is in viewport
  isInViewport: (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
};

// === EXPORT UTILITIES === //

// Make utilities available globally
window.DOM = DOM;
window.Animation = Animation;
window.Storage = Storage;
window.DateUtils = DateUtils;
window.Validate = Validate;
window.StringUtils = StringUtils;
window.ArrayUtils = ArrayUtils;
window.Http = Http;
window.Device = Device;
window.Performance = Performance;
window.Clipboard = Clipboard;
window.Scroll = Scroll;

console.log("✅ Utilities loaded successfully");
