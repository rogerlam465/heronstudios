const languageButtons = document.querySelectorAll("[data-language]");
const translations = window.HERON_TRANSLATIONS;

function initializeLanguage() {
  if (!translations) return;
  let savedLanguage;
  try {
    savedLanguage = localStorage.getItem("heron-language");
  } catch (error) {
    console.warn("Language preference could not be read:", error);
  }
  setLanguage(savedLanguage === "fr" ? "fr" : "en");
}

function setLanguage(language) {
  const strings = translations[language];
  if (!strings) return;

  document.documentElement.lang = language;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const translation = strings[element.dataset.i18n];
    if (translation !== undefined) element.textContent = translation;
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    const translation = strings[element.dataset.i18nAriaLabel];
    if (translation !== undefined) element.setAttribute("aria-label", translation);
  });

  const description = document.querySelector('meta[name="description"]');
  if (description) description.content = strings.metaDescription;

  languageButtons.forEach((button) => {
    const isActive = button.dataset.language === language;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  try {
    localStorage.setItem("heron-language", language);
  } catch (error) {
    console.warn("Language preference could not be saved:", error);
  }
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.language));
});

initializeLanguage();
