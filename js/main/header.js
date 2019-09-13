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

  // /*minicart fix*/
  // var mini_Cart = function() {
  //   $("th.cartSkuQuantity").html("Qtd");
  //   $(".cartFooter a.cartCheckout").html("Finalizar pedido");
  //   var strQtd = $(".cart-info:eq(0) .amount-items-em").text();
  //   var numQtd = parseInt(strQtd);
  //   var pluQtd = "itens";
  //   if (numQtd == 1) {
  //     pluQtd = "item";
  //   }

  //   if (numQtd == 0) {
  //     $(".vtexsc-cart").html(
  //       '<p class="mini-cart-vazio"><b>Ops!</b><span>Seu carrinho de compras está vazio.</span><a href="/">Ir às compras</a></p>'
  //     );
  //     $(".top-link.compras").addClass("top-cart-ativo");
  //   }
  // };
}
