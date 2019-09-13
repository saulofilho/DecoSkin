{
  //Menu Filter Mobile
  if ($("body.categoria").length) {
    const btnMobile = document.querySelector(".categoria .btn-filters-mobile");
    const menuMobile = document.querySelector(".categoria .sidebar");

    const elementDivClose = document.createElement("div");
    elementDivClose.setAttribute("class", "btn-filter-close d-lg-none");
    elementDivClose.innerHTML = `
      <span>Fechar filtros</span>
    `;

    elementDivClose.addEventListener("click", () => {
      menuMobile.classList.remove("active");
    });

    menuMobile.prepend(elementDivClose);

    btnMobile.addEventListener("click", () => {
      menuMobile.classList.add("active");
    });
  }
}
