"use strict";var btnMobileAtivo=function(){linkMobile.addEventListener("click",function(){linkMobile.classList.toggle("mobile-btn-ativo"),menuMobile.classList.toggle("menu-mobile-ativo")})},ativaSubmenuMobile=function(e){submenuMobile[e].classList.toggle("submenu-active"),iconeSubmenu[e].classList.toggle("icone-submenu-active")},linkMobile=document.querySelector(".link-mobile .mobile-btn"),menuMobile=document.querySelector("#menu-mobile");btnMobileAtivo();var linkMenuMobile=document.querySelectorAll("#menu-mobile .link-menu"),submenuMobile=document.querySelectorAll("#menu-mobile .submenu"),iconeSubmenu=document.querySelectorAll("#menu-mobile .link-menu i");if(linkMenuMobile.forEach(function(e,i){e.addEventListener("click",function(){ativaSubmenuMobile(i)})}),$("body.page-product").length){$(".shipping-value").trigger("click");var $btnFrete=document.querySelector(".product-delivery .freight-btn");$btnFrete.setAttribute("value","Verificar")}