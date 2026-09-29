/* Progressive enhancement only: content and navigation remain usable without JS. */
(() => {
  "use strict";
  document.documentElement.classList.remove("no-js");
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#main-nav");
  const closeMenu = () => {
    nav?.classList.remove("is-open");
    toggle?.setAttribute("aria-expanded", "false");
    toggle?.setAttribute("aria-label", "Abrir menú");
  };
  toggle?.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    nav.classList.toggle("is-open", open);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav?.classList.contains("is-open")) {
      closeMenu();
      toggle.focus();
    }
  });
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".header")) closeMenu();
  });
  matchMedia("(min-width: 901px)").addEventListener("change", (e) => {
    if (e.matches) closeMenu();
  });

  const normalize = (value) =>
    value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  document.querySelectorAll("[data-filter-group]").forEach((group) => {
    const buttons = group.querySelectorAll("[data-filter]");
    const cards = document.querySelectorAll(
      `[data-collection="${group.dataset.filterGroup}"]`,
    );
    const status = group.querySelector('[role="status"]');
    buttons.forEach((button) =>
      button.addEventListener("click", () => {
        buttons.forEach((b) =>
          b.setAttribute("aria-pressed", String(b === button)),
        );
        let visible = 0;
        cards.forEach((card) => {
          card.hidden =
            button.dataset.filter !== "all" &&
            !card.dataset.category.split(" ").includes(button.dataset.filter);
          if (!card.hidden) visible++;
        });
        if (status)
          status.textContent = `${visible} ${group.dataset.filterGroup === "products" ? "productos" : "artículos"}`;
      }),
    );
  });

  const faqSearch = document.querySelector("#faq-search");
  faqSearch?.addEventListener("input", () => {
    const query = normalize(faqSearch.value.trim());
    let count = 0;
    document.querySelectorAll(".faq-group").forEach((group) => {
      let groupCount = 0;
      group.querySelectorAll("details").forEach((item) => {
        item.hidden = !normalize(item.textContent).includes(query);
        if (!item.hidden) {
          groupCount++;
          count++;
        }
      });
      group.hidden = groupCount === 0;
    });
    document.querySelector("#faq-empty").hidden = count > 0;
    document.querySelector("#faq-status").textContent = query
      ? `${count} respuestas encontradas`
      : "";
  });

  const storeSearch = document.querySelector("#store-search");
  const citySelect = document.querySelector("#store-city");
  const filterStores = () => {
    const query = normalize(storeSearch.value.trim());
    let count = 0;
    document.querySelectorAll(".store-card").forEach((card) => {
      card.hidden = !(
        normalize(card.textContent).includes(query) &&
        (citySelect.value === "all" || citySelect.value === card.dataset.city)
      );
      if (!card.hidden) count++;
    });
    document.querySelector("#store-count").textContent =
      `${count} ${count === 1 ? "punto" : "puntos"} de venta`;
    document.querySelector("#store-empty").hidden = count > 0;
  };
  storeSearch?.addEventListener("input", filterStores);
  citySelect?.addEventListener("change", filterStores);

  const form = document.querySelector("#contact-form");
  const blogSearch = document.querySelector("#blog-search");
  blogSearch?.addEventListener("input", () => {
    const query = normalize(blogSearch.value.trim());
    let visible = 0;
    document.querySelectorAll("[data-post]").forEach((card) => {
      card.hidden = !normalize(card.textContent).includes(query);
      if (!card.hidden) visible++;
    });
    document.querySelector("#blog-count").textContent =
      `${visible} ${visible === 1 ? "artículo" : "artículos"}`;
    document.querySelector("#blog-empty").hidden = visible > 0;
  });
  if (form) form.querySelector('[type="submit"]').disabled = false;
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const result = document.querySelector("#form-result");
    result.hidden = false;
    result.textContent =
      "Formulario validado. Esta es una demostración: no se ha enviado ni guardado ningún dato. Para contactar con Keriba, utiliza el teléfono o el correo que aparecen en esta página.";
    result.focus();
  });
  const back = document.querySelector(".back-top");
  const syncBack = () => {
    if (back) back.hidden = window.scrollY < 600;
  };
  window.addEventListener("scroll", syncBack, { passive: true });
  syncBack();
})();
