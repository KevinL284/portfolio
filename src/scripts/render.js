import { projects, skills, contacts, personal } from "./data.js";
import { initProjectModal } from "./modal.js";

const skillIcons = {
  Python: "fa-brands fa-python",
  "C#": "fa-brands fa-microsoft",
  FastAPI: "fa-solid fa-rocket",
  SQL: "fa-solid fa-database",
  PostgreSQL: "fa-solid fa-database",
  MongoDB: "fa-solid fa-leaf",
  "REST APIs": "fa-solid fa-network-wired",
  Docker: "fa-brands fa-docker",

  Pandas: "fa-solid fa-table",
  NumPy: "fa-solid fa-calculator",
  "ETL/ELT": "fa-solid fa-arrows-spin",
  "Data Visualization": "fa-solid fa-chart-line",
  Lakehouse: "fa-solid fa-warehouse",
  "Data Warehousing": "fa-solid fa-database",
  Airflow: "fa-solid fa-wind",
  Prefect: "fa-solid fa-diagram-project",

  Git: "fa-brands fa-git-alt",
  GitHub: "fa-brands fa-github",
  "GitHub Actions": "fa-brands fa-github",
  Linux: "fa-brands fa-linux",
  "VS Code": "fa-solid fa-code",
};

export function renderProjects(filter = "all") {
  const container = document.querySelector("#projectsGrid");

  if (!container) return;

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category.includes(filter));

  container.innerHTML = filteredProjects.map(createProjectCard).join("");

  bindProjectFilters();
  initProjectModal();
}

function createProjectCard(project) {
  const tags = project.tags
    .slice(0, 4)
    .map(
      (tag) => `
        <span class="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg text-sm font-medium">
          ${tag}
        </span>
      `
    )
    .join("");

  const githubLink = project.github
    ? `<a href="${project.github}" target="_blank" rel="noopener noreferrer" aria-label="GitHub do projeto"
        class="w-10 h-10 bg-gray-100 dark:bg-slate-700 hover:bg-primary-600 hover:text-white rounded-full flex items-center justify-center transition-all duration-200">
        <i class="fa-brands fa-github"></i>
      </a>`
    : "";

  const demoLink = project.demo
    ? `<a href="${project.demo}" target="_blank" rel="noopener noreferrer" aria-label="Deploy do projeto"
        class="w-10 h-10 bg-gray-100 dark:bg-slate-700 hover:bg-primary-600 hover:text-white rounded-full flex items-center justify-center transition-all duration-200">
        <i class="fa-solid fa-arrow-up-right-from-square"></i>
      </a>`
    : "";

  return `
    <article
      class="project-card-item bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
      data-project-id="${project.id}"
      data-category="${project.category.join(" ")}"
    >
      <div class="w-full h-48 bg-gray-100 dark:bg-slate-700 overflow-hidden">
        <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover">
      </div>

      <div class="p-6 flex flex-col h-full">
        <div class="flex items-center justify-between mb-3">
          <span class="text-sm text-primary-600 dark:text-primary-400 font-semibold">${project.year}</span>
        </div>

        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
          ${project.title}
        </h3>

        <p class="text-gray-600 dark:text-gray-300 leading-relaxed mb-5">
          ${project.description}
        </p>

        <div class="flex flex-wrap gap-2 mb-6">
          ${tags}
        </div>

        <div class="flex items-center justify-end gap-3 mt-auto project-links">
          ${githubLink}
          ${demoLink}
        </div>
      </div>
    </article>
  `;
}

function bindProjectFilters() {
  const buttons = document.querySelectorAll(".filter-btn");

  buttons.forEach((button) => {
    button.onclick = () => {
      const filter = button.dataset.filter;

      buttons.forEach((btn) => {
        btn.classList.remove("active", "bg-primary-600", "text-white");
        btn.classList.add(
          "bg-gray-200",
          "dark:bg-gray-700",
          "text-gray-700",
          "dark:text-gray-300"
        );
      });

      button.classList.add("active", "bg-primary-600", "text-white");
      button.classList.remove(
        "bg-gray-200",
        "dark:bg-gray-700",
        "text-gray-700",
        "dark:text-gray-300"
      );
      button.classList.add("active");

      renderProjects(filter);
    };
  });
}

export function renderSkills() {
  const container = document.querySelector("#skills .grid");

  if (!container) return;

  container.innerHTML = skills
    .map(
      (group) => `
        <section class="bg-slate-950/40 dark:bg-slate-950/40 rounded-2xl p-6 md:p-8 shadow-lg">
          <h3 class="text-xl font-bold text-white text-center mb-8">
            ${group.title}
          </h3>

          <div class="grid gap-4">
            ${group.items
              .map(
                (item) => `
                  <div class="flex items-center gap-4 bg-slate-800 rounded-xl px-4 py-3 hover:bg-slate-700 hover:translate-x-1 transition-all duration-200">
                    <div class="w-10 h-10 rounded-lg bg-primary-900/50 text-primary-400 flex items-center justify-center shrink-0">
                      <i class="${skillIcons[item] || "fa-solid fa-code"}"></i>
                    </div>

                    <span class="font-semibold text-white">
                      ${item}
                    </span>
                  </div>
                `
              )
              .join("")}
          </div>
        </section>
      `
    )
    .join("");
}

export function renderContacts() {
  const container = document.querySelector("#contactMethods");

  if (!container) return;

  container.innerHTML = contacts
    .map(
      (contact) => `
        <a href="${contact.href}" target="_blank" rel="noopener noreferrer"
           class="contact-card contact-card--${contact.color}">
          <div class="contact-card__icon">
            <i class="${contact.icon}"></i>
          </div>

          <div>
            <strong>${contact.label}</strong>
            <span>${contact.value}</span>
          </div>
        </a>
      `
    )
    .join("");
}

export function renderProfileImage() {
  const profileImage = document.querySelector("#profileImage");

  if (!profileImage) return;

  profileImage.src = personal.profileImage;
}
