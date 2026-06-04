import { renderProjects, renderSkills, renderContacts, renderProfileImage, } from "./render.js";
import { initTheme } from "./theme.js";

document.addEventListener("DOMContentLoaded", () => {
  initTheme();

  renderProjects();
  renderSkills();
  renderContacts();
  renderProfileImage();

  initMobileMenu();
  initSmoothScroll();
  initCurrentYear();
  hideLoadingScreen();
});

function initMobileMenu() {
  const navToggle = document.querySelector("#navToggle");
  const mobileMenu = document.querySelector("#mobileMenu");

  if (!navToggle || !mobileMenu) return;

  navToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
    navToggle.classList.toggle("active");
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
      navToggle.classList.remove("active");
    });
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });
}

function initCurrentYear() {
  const currentYear = document.querySelector("#currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }
}

function hideLoadingScreen() {
  const loadingScreen = document.querySelector("#loadingScreen");

  document.body.classList.remove("loading");

  if (loadingScreen) {
    loadingScreen.remove();
  }
}
