{
  // Menu Mobile
  const linkMobile = document.querySelector(".link-mobile .mobile-btn");
  const menuMobile = document.querySelector("#menu-mobile");

  function btnMobileAtivo() {
    linkMobile.addEventListener("click", function() {
      linkMobile.classList.toggle("mobile-btn-ativo");
      menuMobile.classList.toggle("menu-mobile-ativo");
    });
  }
  btnMobileAtivo();

  const linkMenuMobile = document.querySelectorAll("#menu-mobile .link-menu");
  const submenuMobile = document.querySelectorAll("#menu-mobile .submenu");
  const iconeSubmenu = document.querySelectorAll("#menu-mobile .link-menu i");

  function ativaSubmenuMobile(index) {
    submenuMobile[index].classList.toggle("submenu-active");
    iconeSubmenu[index].classList.toggle("icone-submenu-active");
  }

  linkMenuMobile.forEach((link, index) => {
    link.addEventListener("click", () => {
      ativaSubmenuMobile(index);
    });
  });
}
