// Projects - Project Management & Modal Functionality

class ProjectManager {
  constructor() {
    this.projects = PROJECTS_DATA || [];
    this.filteredProjects = [...this.projects];
    this.currentFilter = 'all';
    this.modal = null;
    this.currentProject = null;

    this.init();
  }

  init() {
    this.bindEvents();
    this.renderProjects();
    this.initModal();

    console.log("✅ Project Manager initialized");
  }

  bindEvents() {
    // Filter buttons
    const filterButtons = DOM.getAll('.filter-btn');
    filterButtons.forEach(btn => {
      DOM.on(btn, 'click', (e) => {
        e.preventDefault();
        const filter = e.target.dataset.filter;
        this.filterProjects(filter);
        this.updateFilterButtons(e.target);
      });
    });

    // Project cards click - use event delegation
    DOM.on(document, 'click', (e) => {
      const projectCard = e.target.closest('.project-card');
      if (projectCard && !e.target.closest('a')) { // Don't trigger if clicking on links
        e.preventDefault();
        const projectId = projectCard.dataset.projectId;
        this.openProjectModal(projectId);
      }
    });

    // Modal close events
    DOM.on(document, 'click', (e) => {
      if (e.target.matches('.modal__overlay') ||
          e.target.matches('.modal__close') ||
          e.target.closest('.modal__close')) {
        e.preventDefault();
        this.closeModal();
      }
    });

    // Keyboard events
    DOM.on(document, 'keydown', (e) => {
      if (e.key === 'Escape' && this.modal && DOM.hasClass(this.modal, 'active')) {
        this.closeModal();
      }
    });

    // Gallery thumbnail clicks
    DOM.on(document, 'click', (e) => {
      if (e.target.matches('.gallery__thumb')) {
        e.preventDefault();
        this.changeMainImage(e.target.src);
        this.updateActiveThumb(e.target);
      }
    });
  }  filterProjects(filter) {
    this.currentFilter = filter;

    if (filter === 'all') {
      this.filteredProjects = [...this.projects];
    } else {
      this.filteredProjects = this.projects.filter(project =>
        project.category === filter || project.tags.some(tag =>
          tag.toLowerCase().includes(filter.toLowerCase())
        )
      );
    }

    this.renderProjects();
  }

  updateFilterButtons(activeBtn) {
    const filterButtons = DOM.getAll('.filter-btn');
    filterButtons.forEach(btn => DOM.removeClass(btn, 'active'));
    DOM.addClass(activeBtn, 'active');
  }

  renderProjects() {
    const grid = DOM.id('projectsGrid');
    if (!grid) return;

    // Clear existing projects
    grid.innerHTML = '';

    if (this.filteredProjects.length === 0) {
      grid.innerHTML = this.renderEmptyState();
      return;
    }

    // Sort projects - featured first, then by year
    const sortedProjects = ArrayUtils.sortBy(this.filteredProjects, 'year', 'desc')
      .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

    // Render projects with animation delay
    sortedProjects.forEach((project, index) => {
      const projectElement = this.createProjectCard(project);
      projectElement.style.animationDelay = `${index * 100}ms`;
      grid.appendChild(projectElement);
    });

    // Trigger animations
    this.animateProjects();
  }

  createProjectCard(project) {
    const card = DOM.create('div', {
      className: `project-card animate-fade-in-up`,
      attributes: {
        'data-project-id': project.id,
        'data-category': project.category
      }
    });

    const mainImage = project.images && project.images.length > 0
      ? project.images[0]
      : 'src/assets/images/404.svg';

    card.innerHTML = `
      <img src="${mainImage}" alt="${project.title}" class="project-card__image" loading="lazy" onerror="this.src='src/assets/images/404.svg'">
      <div class="project-card__content">
        <h3 class="project-card__title">${project.title}</h3>
        <p class="project-card__description">${StringUtils.truncate(project.description, 120)}</p>

        <div class="project-card__tags">
          ${project.tags.slice(0, 3).map(tag =>
            `<span class="tag">${tag}</span>`
          ).join('')}
          ${project.tags.length > 3 ? '<span class="tag">+' + (project.tags.length - 3) + '</span>' : ''}
        </div>

        <div class="project-card__footer">
          <span class="project-card__year">${project.year}</span>
          <div class="project-card__links">
            ${project.links.github ? `
              <a href="${project.links.github}" class="project-card__link" target="_blank" title="Ver código" onclick="event.stopPropagation()">
                <i class="fab fa-github"></i>
              </a>
            ` : ''}
            ${project.links.demo ? `
              <a href="${project.links.demo}" class="project-card__link" target="_blank" title="Ver demo" onclick="event.stopPropagation()">
                <i class="fas fa-external-link-alt"></i>
              </a>
            ` : ''}
            <button class="project-card__link" title="Ver detalhes">
              <i class="fas fa-info-circle"></i>
            </button>
          </div>
        </div>
      </div>
    `;

    return card;
  }  renderEmptyState() {
    return `
      <div class="empty-state">
        <div class="empty-state__icon">
          <i class="fas fa-search"></i>
        </div>
        <h3 class="empty-state__title">Nenhum projeto encontrado</h3>
        <p class="empty-state__description">
          Não há projetos para o filtro selecionado. Tente outro filtro.
        </p>
      </div>
    `;
  }

  animateProjects() {
    const cards = DOM.getAll('.project-card');

    // Use Intersection Observer for better performance
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            DOM.addClass(entry.target, 'animate-fade-in-up');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '50px'
      });

      cards.forEach(card => observer.observe(card));
    } else {
      // Fallback for older browsers
      cards.forEach(card => {
        DOM.addClass(card, 'animate-fade-in-up');
      });
    }
  }

  initModal() {
    this.modal = DOM.id('projectModal');
    if (!this.modal) {
      console.warn('Project modal not found');
      return;
    }
  }

  openProjectModal(projectId) {
    const project = this.projects.find(p => p.id === projectId);
    if (!project || !this.modal) return;

    this.currentProject = project;
    this.populateModal(project);

    // Show modal with animation
    DOM.addClass(this.modal, 'active');
    DOM.addClass(document.body, 'modal-open');

    // Focus management for accessibility
    const closeBtn = this.modal.querySelector('.modal__close');
    if (closeBtn) closeBtn.focus();

    // Analytics tracking
    this.trackProjectView(project);
  }

  populateModal(project) {
    // Modal title
    const modalTitle = DOM.id('modalTitle');
    if (modalTitle) modalTitle.textContent = project.title;

    // Modal tags
    const modalTags = DOM.id('modalTags');
    if (modalTags) {
      modalTags.innerHTML = project.tags.map(tag =>
        `<span class="tag">${tag}</span>`
      ).join('');
    }

    // Modal description
    const modalDescription = DOM.id('modalDescription');
    if (modalDescription) {
      modalDescription.innerHTML = `
        <p>${project.description}</p>
        <div class="project-meta">
          <span class="project-category">${this.getCategoryLabel(project.category)}</span>
          <span class="project-year">${project.year}</span>
        </div>
      `;
    }

    // Modal features
    const modalFeatures = DOM.id('modalFeatures');
    if (modalFeatures && project.features) {
      modalFeatures.innerHTML = project.features.map(feature =>
        `<li>${feature}</li>`
      ).join('');
    }

    // Modal tech stack
    const modalTechStack = DOM.id('modalTechStack');
    if (modalTechStack && project.techStack) {
      modalTechStack.innerHTML = project.techStack.map(tech =>
        `<div class="tech-item">
          <i class="${tech.icon}"></i>
          <span>${tech.name}</span>
        </div>`
      ).join('');
    }

    // Modal links
    const modalLinks = DOM.id('modalLinks');
    if (modalLinks) {
      modalLinks.innerHTML = this.renderModalLinks(project.links);
    }

    // Modal gallery
    this.setupGallery(project.images || []);
  }

  setupGallery(images) {
    const galleryMain = this.modal.querySelector('.gallery__main img');
    const galleryThumbs = DOM.id('galleryThumbs');
    const gallery = this.modal.querySelector('.modal__gallery');

    if (!images || images.length === 0) {
      // Hide gallery if no images, show placeholder
      if (gallery) gallery.style.display = 'none';
      return;
    }

    // Show gallery
    if (gallery) gallery.style.display = 'block';

    // Set main image with fallback
    if (galleryMain) {
      galleryMain.src = images[0];
      galleryMain.alt = this.currentProject.title;
      galleryMain.onerror = function() {
        this.src = 'src/assets/images/404.svg';
      };
    }

    // Set thumbnails
    if (galleryThumbs && images.length > 1) {
      galleryThumbs.innerHTML = images.map((image, index) =>
        `<img src="${image}"
              alt="${this.currentProject.title} - Imagem ${index + 1}"
              class="gallery__thumb${index === 0 ? ' active' : ''}"
              loading="lazy"
              onerror="this.src='src/assets/images/404.svg'">`
      ).join('');
    } else if (galleryThumbs) {
      galleryThumbs.innerHTML = '';
    }
  }  changeMainImage(src) {
    const mainImage = this.modal.querySelector('.gallery__main img');
    if (mainImage) {
      // Fade effect
      mainImage.style.opacity = '0.5';
      setTimeout(() => {
        mainImage.src = src;
        mainImage.style.opacity = '1';
      }, 150);
    }
  }

  updateActiveThumb(activeThumb) {
    const thumbs = this.modal.querySelectorAll('.gallery__thumb');
    thumbs.forEach(thumb => DOM.removeClass(thumb, 'active'));
    DOM.addClass(activeThumb, 'active');
  }

  renderModalLinks(links) {
    let linksHtml = '';

    if (links.demo) {
      linksHtml += `
        <a href="${links.demo}" class="btn btn--primary" target="_blank">
          <i class="fas fa-external-link-alt"></i>
          Ver Demo
        </a>
      `;
    }

    if (links.github) {
      linksHtml += `
        <a href="${links.github}" class="btn btn--outline" target="_blank">
          <i class="fab fa-github"></i>
          Ver Código
        </a>
      `;
    }

    if (links.case) {
      linksHtml += `
        <a href="${links.case}" class="btn btn--ghost" target="_blank">
          <i class="fas fa-file-alt"></i>
          Case Study
        </a>
      `;
    }

    return linksHtml || '<p class="text-muted">Links não disponíveis</p>';
  }

  closeModal() {
    if (!this.modal) return;

    DOM.removeClass(this.modal, 'active');
    DOM.removeClass(document.body, 'modal-open');

    // Reset focus
    const triggerCard = document.querySelector(`[data-project-id="${this.currentProject?.id}"]`);
    if (triggerCard) triggerCard.focus();

    this.currentProject = null;
  }

  getCategoryLabel(category) {
    const labels = {
      'backend': 'Backend Development',
      'data': 'Data Engineering',
      'fullstack': 'Full Stack',
      'design': 'Design & Prototyping',
      
    };
    return labels[category] || StringUtils.titleCase(category);
  }

  trackProjectView(project) {
    // Analytics tracking - can be integrated with Google Analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'project_view', {
        'project_id': project.id,
        'project_title': project.title,
        'project_category': project.category
      });
    }

    console.log(`📊 Project viewed: ${project.title}`);
  }

  // Public methods for external access
  getProjects() {
    return this.projects;
  }

  getProjectById(id) {
    return this.projects.find(p => p.id === id);
  }

  getProjectsByCategory(category) {
    return this.projects.filter(p => p.category === category);
  }

  getFeaturedProjects() {
    return this.projects.filter(p => p.featured);
  }
}

// Initialize Project Manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.projectManager = new ProjectManager();
});

console.log("✅ Projects module loaded");
