(() => {
  const page = document.querySelector(".resource-page");
  if (!page) return;
  const buttons = page.querySelectorAll("[data-reading-size]");
  buttons.forEach((button) =>
    button.addEventListener("click", () => {
      page.dataset.reading = button.dataset.readingSize;
      buttons.forEach((item) =>
        item.setAttribute("aria-pressed", String(item === button)),
      );
      page.querySelector("[data-reading-status]").textContent =
        button.dataset.readingSize === "large"
          ? "Letra ampliada."
          : "Tamaño grande habitual.";
    }),
  );
  page
    .querySelector("[data-print]")
    .addEventListener("click", () => window.print());
})();
