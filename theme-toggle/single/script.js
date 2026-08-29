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
let animationCleanupTimer;
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
  if (docElement.classList.contains("is-animating")) {
    return;
  }

  docElement.classList.add("is-animating");
  const isDarkMode = docElement.classList.contains("dark");
  updateTheme(!isDarkMode);

  // Keep the animation state bounded even if transitionend is not emitted
  // (for example when the tab is backgrounded or motion is reduced).
  clearTimeout(animationCleanupTimer);
  animationCleanupTimer = setTimeout(() => {
    docElement.classList.remove("is-animating");
  }, 1600);
}

function handleTransitionEnd(event) {
  if (
    event.target !== themeContainer ||
    (event.propertyName !== "background" && event.propertyName !== "background-color")
  ) {
    return;
  }

  clearTimeout(animationCleanupTimer);
  docElement.classList.remove("is-animating");
}
function initializeTheme() {
  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem("app-theme");
  } catch (e) {
    console.warn("Could not access localStorage for theme setting.", e);
  }

  const isDarkMode = savedTheme
    ? savedTheme === "dark"
    : docElement.classList.contains("dark");
  updateTheme(isDarkMode);
}

themeToggleButton.addEventListener("click", handleThemeToggleClick);
themeContainer.addEventListener("transitionend", handleTransitionEnd);
initializeTheme();
