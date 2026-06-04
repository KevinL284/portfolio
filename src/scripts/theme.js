const THEME_KEY = "portfolio-theme";

export function initTheme() {
  const themeToggle = document.querySelector("#themeToggle");
  const root = document.documentElement;

  const savedTheme = localStorage.getItem(THEME_KEY);
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");

  applyTheme(initialTheme);

  if (!themeToggle) return;

  themeToggle.addEventListener("click", () => {
    const currentTheme = root.classList.contains("dark") ? "dark" : "light";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    applyTheme(nextTheme);
    localStorage.setItem(THEME_KEY, nextTheme);
  });
}

function applyTheme(theme) {
  const root = document.documentElement;
  const themeIcon = document.querySelector("#themeToggle i");

  root.classList.toggle("dark", theme === "dark");

  if (themeIcon) {
    themeIcon.className = theme === "dark" ? "fas fa-sun text-sm" : "fas fa-moon text-sm";
  }
}
