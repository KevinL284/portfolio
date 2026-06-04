import { projects } from "./data.js";

export function initProjectModal() {
  const modal = document.querySelector("#projectModal");
  const closeButton = document.querySelector("#modalClose");
  const overlay = document.querySelector(".modal__overlay");

  if (!modal) return;

  bindProjectCards(modal);

  if (closeButton) {
    closeButton.addEventListener("click", closeProjectModal);
  }

  if (overlay) {
    overlay.addEventListener("click", closeProjectModal);
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeProjectModal();
    }
  });
}

function bindProjectCards(modal) {
  const cards = document.querySelectorAll(".project-card-item");

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const projectId = Number(card.dataset.projectId);
      const project = projects.find((item) => item.id === projectId);

      if (!project) return;

      openProjectModal(project, modal);
    });
  });
}

function openProjectModal(project, modal) {
  const modalTitle = document.querySelector("#modalTitle");
  const modalTags = document.querySelector("#modalTags");
  const mainImage = document.querySelector("#mainImage");
  const galleryThumbs = document.querySelector("#galleryThumbs");
  const modalDescription = document.querySelector("#modalDescription");
  const modalFeatures = document.querySelector("#modalFeatures");
  const modalTechStack = document.querySelector("#modalTechStack");
  const modalLinks = document.querySelector("#modalLinks");

  if (modalTitle) modalTitle.textContent = project.title;

  if (mainImage) {
    mainImage.src = project.image;
    mainImage.alt = project.title;
  }

  if (galleryThumbs) {
    galleryThumbs.innerHTML = "";
  }

  if (modalDescription) {
    modalDescription.innerHTML = `
      <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
        ${project.longDescription || project.description}
      </p>
    `;
  }

  if (modalTags) {
    modalTags.innerHTML = project.tags
      .map((tag) => `<span class="project-tag">${tag}</span>`)
      .join("");
  }

  if (modalFeatures) {
    modalFeatures.innerHTML = (project.features || [])
      .map((feature) => `<li>${feature}</li>`)
      .join("");
  }

  if (modalTechStack) {
    modalTechStack.innerHTML = project.tags
      .map((tag) => `<span class="project-tag">${tag}</span>`)
      .join("");
  }

  if (modalLinks) {
    modalLinks.innerHTML = createProjectLinks(project);
  }

  modal.classList.remove("hidden");
  modal.classList.add("flex");

  modal.style.display = "flex";
  modal.style.position = "fixed";
  modal.style.inset = "0";
  modal.style.zIndex = "9999";

  document.body.classList.add("overflow-hidden");
}

function closeProjectModal() {
  const modal = document.querySelector("#projectModal");

  if (!modal) return;

  modal.classList.add("hidden");
  modal.classList.remove("flex");

  modal.style.display = "none";

  document.body.classList.remove("overflow-hidden");
}

function createProjectLinks(project) {
  const links = [];

  if (project.github) {
    links.push(`
      <a href="${project.github}" target="_blank" rel="noopener noreferrer"
         class="inline-flex items-center justify-center px-5 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-xl font-semibold hover:bg-primary-600 transition-colors">
        <i class="fa-brands fa-github mr-2"></i>
        Ver GitHub
      </a>
    `);
  }

  if (project.article) {
    links.push(`
      <a href="${project.article}" target="_blank" rel="noopener noreferrer"
         class="inline-flex items-center justify-center px-5 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors">
        <i class="fa-solid fa-file-lines mr-2"></i>
        Ler Artigo
      </a>
    `);
  }

  if (project.demo) {
    links.push(`
      <a href="${project.demo}" target="_blank" rel="noopener noreferrer"
         class="inline-flex items-center justify-center px-5 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors">
        <i class="fa-solid fa-arrow-up-right-from-square mr-2"></i>
        Ver Deploy
      </a>
    `);
  }

  return links.join("");
}
