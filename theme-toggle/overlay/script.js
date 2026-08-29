// Put this before body renders so the saved theme class is available early.
// (function () {
//   try {
//     const theme = localStorage.getItem("app-theme");
//     if (theme === "dark") {
//       document.documentElement.classList.add("dark");
//     }
//   } catch (e) {
//     console.warn("Could not access localStorage for theme setting.", e);
//   }
// })();
const themeToggleButton = document.getElementById("theme-toggle-btn");
const docElement = document.documentElement;
const themeContainer = document.querySelector(".theme-toggle__container");
function updateTheme(isDarkMode) {
  docElement.classList.toggle("dark", isDarkMode);
  themeToggleButton.setAttribute("aria-checked", String(isDarkMode));
  const newLabel = isDarkMode
    ? "Switch to light theme"
    : "Switch to dark theme";
  themeToggleButton.setAttribute("aria-label", newLabel);
  try {
    localStorage.setItem("app-theme", isDarkMode ? "dark" : "light");
  } catch (e) {
    console.warn("Could not save theme to localStorage.", e);
  }
}
function handleThemeToggleClick() {
  docElement.classList.add("is-animating");
  const isDarkMode = docElement.classList.contains("dark");
  updateTheme(!isDarkMode);
}

function handleTransitionEnd(event) {
  if (
    event.target !== themeContainer ||
    event.propertyName !== "background-color"
  ) {
    return;
  }

  docElement.classList.remove("is-animating");
}
function initializeTheme() {
  const isDarkMode = docElement.classList.contains("dark");
  updateTheme(isDarkMode);
}

themeToggleButton.addEventListener("click", handleThemeToggleClick);
themeContainer.addEventListener("transitionend", handleTransitionEnd);
initializeTheme();
