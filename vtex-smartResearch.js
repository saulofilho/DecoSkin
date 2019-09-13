{
  const pageCategory = document.querySelector(".page-category");
  const pageDepartment = document.querySelector(".page-department");

  if (pageCategory || pageDepartment) {
    if (typeof jQuery.fn.vtexPopUp2 != "function")
      jQuery.fn.vtexPopUp2 = function(k) {
        var c = jQuery(this);
        if (1 > c.length) return c;
        var i = jQuery("body"),
          d = i.find(".boxPopUp2"),
          j = "object" == typeof console;
        1 > d.length &&
          ((d = jQuery(
            '<div class="boxPopUp2"><div class="boxPopUp2-wrap"><span class="boxPopUp2-close"></span><div class="boxPopUp2-content"></div></div></div>'
          )),
          i.prepend(d),
          d.after('<div class="boxPopUp2-overlay"></div>'));
        var b = jQuery.extend(
            {
              popupType: null,
              closeContent: null,
              popupClass: "",
              quickViewClass: "",
              initCallback: function() {},
              closeCallback: function() {}
            },
            k
          ),
          k = d.find(".boxPopUp2-close"),
          e = d.find(".boxPopUp2-content"),
          m = i.find(".boxPopUp2-close, .boxPopUp2-overlay"),
          n = i.find(".boxPopUp2-overlay"),
          h = jQuery(document);
        null != b.closeContent && k.html(b.closeContent);
        var a = {
          positioning: function() {
            var a = h.scrollTop(),
              b = jQuery(window).height(),
              c = d.outerHeight(true);
            d.css("top", a + (c >= b ? 20 : (b - c) / 2) + "px");
          },
          show: function(b) {
            b = b || {};
            n.fadeTo("fast", 0.5, function() {
              d.show().addClass("popupOpened");
              "boolean" === typeof b.loading && b.loading === true
                ? a.showLoading()
                : a.hideLoading();
              "function" === typeof b.callback && b.callback();
            });
          },
          hideLoading: function() {
            e.filter(":visible").css("background-image", "none");
          },
          showLoading: function() {
            e.filter(":visible").css(
              "background-image",
              'url("/arquivos/ajax-loader.gif")'
            );
          },
          close: function(a) {
            var a = a || {},
              b = function() {
                n.fadeOut("fast");
                d.fadeOut("fast", function() {
                  e.empty();
                });
                e.attr("class", "boxPopUp2-content");
                d.attr("class", "boxPopUp2");
              };
            typeof a.closeNow == "boolean" && a.closeNow == true && b();
            if (m.filter(".boxPopUp2-clickActive").length < 1) {
              m.addClass("boxPopUp2-clickActive").bind("click", function() {
                "function" === typeof a.clickCallback && a.clickCallback();
                b();
              });
              h.bind("keyup", function(a) {
                (a.keyCode ? a.keyCode : a.which) == 27 && b();
              });
            }
            if (c.hasClass("autoClose")) {
              var l = (c.attr("class") || "")
                .split("ac_")
                .pop()
                .split(" ")
                .shift();
              if (isNaN(parseFloat(l))) {
                j &&
                  console.log(
                    "[Erro] O tempo informado (em segundos) n\u00e3o \u00e9 um valor num\u00e9rico: \u201c" +
                      l +
                      "\u201d"
                  );
                return false;
              }
              setTimeout(function() {
                b();
              }, l * 1e3);
            }
          },
          setType: function() {
            if (c.hasClass("quickViewLink")) a.quickView();
            else if (c.hasClass("giftListWrap")) a.giftList();
            else if (c.hasClass("installmentInfoTpl")) a.paymentForms();
            else if (c.hasClass("shipping-value")) a.calculateShipping();
            else if (c.hasClass("freeContent")) a.freeContent();
            else if (c.hasClass("boxPopUp2")) a.closeNow();
            else if (c.hasClass("referAFriendTpl")) a.productReferAFriend();
            else if (c.filter("#btnReferAFriend").length > 0)
              a.giftListReferFriend();
            else if (c.filter("#lnkPubliqueResenha").length > 0)
              a.postRatingComment();
            else if (c.filter("#palerta").length > 0) a.cartCheckoutAlert();
            else if (c.hasClass("lnkAddPhoto")) {
              b.popupType = "minhaContaFoto";
              a.userAccount();
            } else return false;
          },
          checkType: function() {
            if (
              "cadastroCliente" === b.popupType ||
              "minhaContaFoto" === b.popupType
            )
              a.userAccount();
            else if ("newsletter" === b.popupType) a.newsletter();
            else if ("quickview" === b.popupType) a.quickView();
            else if ("giftlist" === b.popupType) a.giftList();
            else if ("paymentforms" === b.popupType) a.paymentForms();
            else if ("shipping" === b.popupType) a.calculateShipping();
            else if ("freecontent" === b.popupType) a.freeContent();
            else if ("closenow" === b.popupType) a.closeNow();
            else if ("GiftListReferAFriend" === b.popupType)
              a.giftListReferFriend();
            else if ("postRatingComment" === b.popupType) a.postRatingComment();
            else return false;
          },
          exec: function() {
            null === b.popupType
              ? a.setType()
              : false === a.checkType() && a.setType();
            b.initCallback();
          },
          userAccount: function() {
            var f = "";
            "cadastroCliente" === b.popupType
              ? (f = "signInPopups")
              : "minhaContaFoto" === b.popupType && (f = "profilePhoto");
            c.unbind().removeAttr("onclick");
            var g = c.attr("href") || "";
            c.bind("click", function() {
              d.addClass(b.popupClass + " " + f + "Main");
              "" === g &&
                j &&
                console.log("N\u00e3o existe URL no atributo href");
              jQuery(
                '<iframe src="' +
                  g +
                  '" frameborder="0" allowtransparency="true"></iframe>'
              ).appendTo(e.addClass(b.popupClass + " " + f));
              a.show({
                loading: true
              });
              a.positioning();
              a.close();
              return false;
            });
          },
          newsletter: function() {
            c.clone().appendTo(e.addClass(b.popupClass + " newsletterPopup"));
            d.addClass(b.popupClass + " newsletterMain");
            a.show();
            a.positioning();
            a.close();
          },
          quickView: function() {
            var c = i.find(
                "" !== b.quickViewClass ? b.quickViewClass : ".quickViewLink"
              ),
              g = function() {
                c.filter(":not(.quickViewLinkActivated)")
                  .addClass("quickViewLinkActivated")
                  .bind("click", function() {
                    jQuery(
                      '<iframe src="' +
                        jQuery(this).attr("href") +
                        '" frameborder="0" allowtransparency="true"></iframe>'
                    ).appendTo(e.addClass(b.popupClass + " productQuickView"));
                    d.addClass(b.popupClass + " quickViewMain");
                    a.show({
                      loading: true
                    });
                    a.positioning();
                    a.close();
                    return false;
                  });
              };
            g();
            h.ajaxStop(g);
          },
          paymentForms: function() {
            var f = "",
              g = function() {
                var a = i.find(".see-other-payment-method-link");
                if (a.length < 1) {
                  j &&
                    console.log(
                      "Url das formas de pagamento n\u00e3o encontrado. \n Verifique se o controle esta na p\u00e1gina.\n(" +
                        a.selector +
                        ")"
                    );
                  return false;
                }
                f =
                  /http:[a-z.\/\?=0-9&]+/i.exec(a[0].onclick.toString())[0] ||
                  "#onclickError";
              };
            g();
            c.bind("click", function() {
              jQuery(
                "<iframe src='" +
                  f +
                  "' frameborder='0' allowtransparency='true'></iframe>"
              ).appendTo(e.addClass(b.popupClass + " paymentFormsPopup"));
              d.addClass(b.popupClass + " paymentFormsMain");
              a.show({
                loading: true
              });
              a.positioning();
              a.close();
              return false;
            });
            h.ajaxStop(g);
          },
          calculateShipping: function() {
            h.ajaxStop(function() {
              var c = i.find("#calculoFrete").children();
              if (c.length < 1) return false;
              c.find("span.cep-busca a").attr("target", "_blank");
              c.appendTo(
                e.addClass(b.popupClass + " shippingCalculationPopup")
              );
              d.addClass(b.popupClass + " shippingCalculationMain");
              a.show();
              a.positioning();
              a.close();
            });
          },
          giftList: function() {
            c.appendTo(e.addClass(b.popupClass + " giftListPopup"));
            d.addClass(b.popupClass + " giftListMain");
            a.show();
            a.positioning();
            a.close({
              clickCallback: b.closeCallback
            });
          },
          cartCheckoutAlert: function() {
            c.appendTo(e.addClass(b.popupClass + " cartCheckoutAlertPopup"));
            d.addClass(b.popupClass + " cartCheckoutAlertMain");
            a.show();
            a.positioning();
            a.close();
          },
          freeContent: function() {
            c.appendTo(e.addClass(b.popupClass + " freeContentPopup"));
            d.addClass(b.popupClass + " freeContentMain");
            a.show();
            a.positioning();
            a.close();
          },
          closeNow: function() {
            a.close({
              closeNow: true
            });
          },
          giftListReferFriend: function() {
            var f = function() {
                var c = $(this).attr("href");
                if ("undefined" === typeof c || "" === c) {
                  j && console.log("[Erro] Url do popup n\u00e3o encontrada.");
                  return false;
                }
                e.addClass(b.popupClass + " freeContentPopup").load(c);
                d.addClass(b.popupClass + " giftListReferFriendMain");
                a.show({
                  loading: true
                });
                a.positioning();
                a.close();
                return false;
              },
              g = function() {
                c.unbind().bind("mouseenter", function() {
                  c.unbind().bind("click", f);
                });
              };
            g();
            h.ajaxStop(g);
          },
          productReferAFriend: function() {
            var f = jQuery('<div class="referAFriendPopUpWrap"></div>');
            c.bind("click", function() {
              var c = /\/referAFriend\/Form\/[0-9]+\?/i.exec(
                (
                  jQuery(this)
                    .parent()
                    .find("#div-referAFriend input")
                    .attr("onclick") || ""
                ).toString()
              );
              if (null === c) {
                alert(
                  "Desculpe, n\u00e3o foi poss\u00edvel abrir o formul\u00e1rio."
                );
                return false;
              }
              f.empty().load(c[0], function() {
                a.positioning();
              });
              f.appendTo(e.addClass(b.popupClass + " freeContentPopup"));
              d.addClass(b.popupClass + " freeContentMain");
              a.show();
              a.positioning();
              a.close();
              return false;
            });
            h.ajaxStop(function() {
              e.find(".referAFriendPopUpWrap #btnFechar").length > 0 &&
                setTimeout(a.closeNow, 1500);
            });
          },
          postRatingComment: function() {
            var f = false;
            if (c.filter(":not(.popUpPublishReviewActivated)").length < 1)
              return false;
            c.bind("click", function() {
              var c = jQuery(this).attr("href") || "";
              if ("" === c) {
                j &&
                  console.log(
                    "[Erro] N\u00e3o foi poss\u00edvel obter os dados para abrir o popup de resenha."
                  );
                return false;
              }
              c = c
                .split(")")
                .shift()
                .split("(")
                .pop()
                .split(",");
              if (3 != c.length) {
                j &&
                  console.log(
                    "[Erro] O array com os dados do cliente retornou um valor inesperado."
                  );
                return false;
              }
              if (f) return false;
              f = true;
              jQuery.ajax({
                url: "/publishuserreviewcomment",
                type: "POST",
                data: {
                  productId: c[1],
                  clientId: c[0],
                  categoryId: c[2]
                },
                success: function(c) {
                  var g = jQuery(c);
                  e.addClass(b.popupClass + " userReviewPopup").html(g);
                  d.addClass(b.popupClass + " userReviewPopupMain");
                  a.show({
                    callback: function() {
                      g.find("#txtTituloResenha:hidden").val("titulo_auto");
                      var a = e.find("a#rtAvaliacao_A0"),
                        b = function() {
                          a.attr(
                            "title",
                            a.find(".filledRatingStar:last").index() + 1 || 0
                          );
                        };
                      a.find("span").bind("mouseenter", b);
                      a.bind("mouseleave", b);
                    }
                  });
                  a.positioning();
                  a.close();
                  f = false;
                },
                error: function() {
                  f = false;
                }
              });
              return false;
            }).addClass("popUpPublishReviewActivated");
            jQuery.fn.vtexPopUp2.data.userReviewCount == 0 &&
              h.ajaxStop(function() {
                e.hasClass("userReviewPopup") &&
                  e.find(".formUserComment").children().length == 0 &&
                  a.closeNow();
              });
            jQuery.fn.vtexPopUp2.data.userReviewCount++;
          }
        };
        a.exec();
        return c;
      };
    jQuery.fn.vtexPopUp2.data = {
      userReviewCount: 0
    };
    /**

/* Get Attributes */
    (function(b) {
      b.fn.getAttributes = function() {
        var c = {},
          a = b(this).first();
        if (!a.length) return this;
        b.each(a[0].attributes, function(b, a) {
          c[a.name] = a.value;
        });
        return c;
      };
    })(jQuery);

    "function" !== typeof String.prototype.replaceSpecialChars &&
      (String.prototype.replaceSpecialChars = function() {
        var b = {
          ç: "c",
          æ: "ae",
          œ: "oe",
          á: "a",
          é: "e",
          í: "i",
          ó: "o",
          ú: "u",
          à: "a",
          è: "e",
          ì: "i",
          ò: "o",
          ù: "u",
          ä: "a",
          ë: "e",
          ï: "i",
          ö: "o",
          ü: "u",
          ÿ: "y",
          â: "a",
          ê: "e",
          î: "i",
          ô: "o",
          û: "u",
          å: "a",
          ã: "a",
          ø: "o",
          õ: "o",
          u: "u",
          Á: "A",
          É: "E",
          Í: "I",
          Ó: "O",
          Ú: "U",
          Ê: "E",
          Ô: "O",
          Ü: "U",
          Ã: "A",
          Õ: "O",
          À: "A",
          Ç: "C"
        };
        return this.replace(/[\u00e0-\u00fa]/g, function(a) {
          return "undefined" != typeof b[a] ? b[a] : a;
        });
      });
    "function" !== typeof String.prototype.trim &&
      (String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, "");
      });
    (function($) {
      jQuery.fn.vtexSmartResearch = function(opts) {
        $this = jQuery(this);

        var log = function(msg, type) {
          if (typeof console == "object")
            console.log("[Smart Research - " + (type || "Erro") + "] " + msg);
        };

        var defaults = {
          pageLimit: null,
          // Número máximo de páginas (limite da paginação)
          loadContent: ".ds-new-vitrine[id^=ResultItems]",
          // Elemento que esta em volta da(s) prateleira(s) de produtos.
          shelfClass: ".ds-new-vitrine",
          // Pratelira de produtos (filha de "loadContent")
          filtersMenu: ".search-multiple-navigator",
          // Menu com os filtros
          linksMenu: ".search-single-navigator",
          // Menu de links
          menuDepartament: ".navigation-tabs .menu-departamento",
          // seletor do menu da página de departamentos
          insertMenuAfter: ".search-multiple-navigator h3:first",
          // O menu de departamento será inserido após este elemento
          emptySearchElem: jQuery('<div class="vtexsr-emptySearch"></div>'),
          // Elemento Html (em Objeto jQuery) da busca vazia
          elemLoading: '<div id="scrollLoading">Carregando produtos</div>',
          // Elemento com mensagem de carregando ao iniciar a requisição da página seguinte
          returnTopText:
            '<span class="text">Voltar ao</span><span class="text2">topo</span>',
          // Texto a ser inserido
          emptySearchMsg:
            "<h3>Esta combinação de filtros não retornou nenhum resultado!</h3>",
          // Html para quando a busca retornar vazia
          filterErrorMsg: "Houve um erro ao tentar filtrar a os produtos!",
          // Mensagem de erro
          filterPage: "pagina-teste",
          // caminho para a página de filtros
          searchUrl: null,
          // Url da página de busca (opicional)
          removeCounter: false,
          // Define se será exibido o contador de resultados
          mergeMenu: false,
          // Definição se o menu será mesclado na página de departamento
          usePopup: false,
          // Opção p/ definir se deseja que a mensagem de não localizado seja exibida em um popup
          showLinks: true,
          // Exibe o menu de links caso o de filtro não seja encontrado
          popupAutoCloseSeconds: 3,
          // Caso esteja utilizando popup, defina aqui o tempo para que ele feche automaticamente
          // Função que retorna o valor p/ onde a página deve rolar quando o usuário marca ou desmarca um filtro
          filterScrollTop: function(shelfOffset) {
            return shelfOffset.top - 20;
          },
          callback: function() {},
          // Cálculo do tamanho do conteúdo/vitrine para que uma nova página seja chamada antes do usuário chegar ao "final" do site
          getShelfHeight: function(container) {
            return container.scrollTop() + container.height();
          },
          // Callback após inserir a prateleira na página
          shelfCallback: function() {},
          // Callback em cada requisição Ajax (Para requisições feitas com sucesso)
          // Recebe como parâmetro um objeto contendo a quantidade total de requisições feitas e a quantidade de filtros selecionados
          ajaxCallback: function() {},
          // Função que é executada quando a seleção de filtros não retorna nenhum resultado
          // Recebe como parâmetro um objeto contendo a quantidade total de requisições feitas e a quantidade de filtros selecionados
          emptySearchCallback: function() {},
          // Função para permitir ou não que a rolagem infinita execute na página esta deve retornar "true" ou "false"
          // Recebe como parâmetro um objeto contendo a quantidade total de requisições feitas e a quantidade de filtros selecionados
          authorizeScroll: function() {
            return true;
          },
          // Função para permitir ou não que o conteúdo de "loadContent" seja atualizado. Esta deve retornar "true" ou "false"
          // Recebe como parâmetro um objeto contendo a quantidade total de requisições feitas e a quantidade de filtros selecionados
          authorizeUpdate: function() {
            return true;
          },
          // Callback de cada laço percorrendo os fildsets e os labels. Retorna um objeto com algumas informações
          labelCallback: function(data) {}
        };

        var options = jQuery.extend(defaults, opts),
          _console = "object" === typeof console,
          $empty = jQuery(""),
          elemLoading = jQuery(options.elemLoading),
          currentPage = 2,
          moreResults = true,
          _window = jQuery(window),
          _document = jQuery(document),
          _html = jQuery("html,body"),
          body = jQuery("body"),
          currentSearchUrl = "",
          urlFilters = "",
          searchUrl = "",
          animatingFilter = false,
          loadContentE = jQuery(options.loadContent),
          filtersMenuE = jQuery(options.filtersMenu),
          ajaxCallbackObj = {
            requests: 0,
            filters: 0,
            isEmpty: false
          },
          labelCallbackData = {};

        var fn = {
          getUrl: function(option) {
            var s = option || false;
            // false => filtros | true => rolagem da página | 2 => pág. com os filtros
            if (s === true)
              return currentSearchUrl.replace(
                /PageNumber=[0-9]*/,
                "PageNumber=" + currentPage
              );
            else if (s == 2)
              return currentSearchUrl
                .replace(/PageNumber=[0-9]*/, "PageNumber=1")
                .replace("buscapagina", options.filterPage);
            else
              return (searchUrl + urlFilters).replace(
                /PageNumber=[0-9]*/,
                "PageNumber=" + pageNumber
              );
          },
          getSearchUrl: function() {
            var url, content, preg;
            jQuery("script:not([src])").each(function() {
              content = jQuery(this)[0].innerHTML;
              preg = /\/buscapagina\?.+&PageNumber=/i;
              if (content.search(/\/buscapagina\?/i) > -1) {
                url = preg.exec(content);
                return false;
              }
            });

            if (typeof url !== "undefined" && typeof url[0] !== "undefined")
              return url[0];
            else {
              log(
                "Não foi possível localizar a url de busca da página.\n Tente adicionar o .js ao final da página. \n[Método: getSearchUrl]"
              );
              return "";
            }
          },
          scrollToTop: function() {
            var elem = body.find("#returnToTop");

            if (elem.length < 1) {
              elem = jQuery(
                '<div id="returnToTop"><a href="#">' +
                  options.returnTopText +
                  '<span class="arrowToTop"></span></a></div>'
              );
              body.append(elem);
            }

            var windowH = _window.height();
            _window.bind("resize", function() {
              windowH = _window.height();
            });
            _window.bind("scroll", function() {
              if (_window.scrollTop() > windowH)
                elem.stop(true).fadeTo(300, 1, function() {
                  elem.show();
                });
              else
                elem.stop(true).fadeTo(300, 0, function() {
                  elem.hide();
                });
            });
            elem.bind("click", function() {
              _html.animate(
                {
                  scrollTop: 0
                },
                "slow"
              );
              return false;
            });
          },
          infinitScroll: function() {
            var elementPages, pages, currentStatus, tmp;

            elementPages = body.find(".pager:first").attr("id");
            tmp = (elementPages || "").split("_").pop();
            pages =
              null !== options.pageLimit
                ? options.pageLimit
                : window["pagecount_" + tmp];
            currentStatus = true;

            if ("undefined" === typeof pages) pages = 99999999;

            _window.bind("scroll", function() {
              var _this = jQuery(this);
              if (
                !animatingFilter &&
                currentPage <= pages &&
                moreResults &&
                options.authorizeScroll(ajaxCallbackObj)
              ) {
                if (
                  _this.scrollTop() + _this.height() >=
                    options.getShelfHeight(loadContentE) &&
                  currentStatus
                ) {
                  var currentItems = loadContentE
                    .find(options.shelfClass)
                    .filter(":last");
                  currentItems.after(elemLoading);
                  currentStatus = false;
                  pageJqxhr = jQuery.ajax({
                    url: fn.getUrl(true),
                    success: function(data) {
                      if (data.trim().length < 1) {
                        moreResults = false;
                        log(
                          "Não existem mais resultados a partir da página: " +
                            (currentPage - 1),
                          "Aviso"
                        );
                      } else currentItems.after(data);
                      currentStatus = true;
                      elemLoading.remove();
                      ajaxCallbackObj.requests++;
                      options.ajaxCallback(ajaxCallbackObj);
                    }
                  });
                  currentPage++;
                }
              } else return false;
            });
          }
        };

        if (null !== options.searchUrl)
          currentSearchUrl = searchUrl = options.searchUrl;
        else currentSearchUrl = searchUrl = fn.getSearchUrl();

        // Reporting Errors
        if ($this.length < 1) {
          log("Nenhuma opção de filtro encontrada", "Aviso");
          if (options.showLinks)
            jQuery(options.linksMenu)
              .css("visibility", "visible")
              .show();
          fn.infinitScroll();
          fn.scrollToTop();
          return $this;
        }

        // Reporting Errors
        if (loadContentE.length < 1) {
          log(
            "Elemento para destino da requisição não foi encontrado \n (" +
              loadContentE.selector +
              ")"
          );
          return false;
        }
        if (filtersMenuE.length < 1)
          log(
            "O menu de filtros não foi encontrado \n (" +
              filtersMenuE.selector +
              ")"
          );

        var currentUrl = document.location.href,
          linksMenuE = jQuery(options.linksMenu),
          prodOverlay = jQuery('<div class="vtexSr-overlay"></div>'),
          departamentE = jQuery(options.menuDepartament),
          loadContentOffset = loadContentE.offset(),
          pageNumber = 1,
          shelfJqxhr = null,
          pageJqxhr = null;

        options.emptySearchElem.append(options.emptySearchMsg);
        loadContentE.before(prodOverlay);

        var fns = {
          exec: function() {
            fns.fieldsetFormat();
            $this.each(function() {
              var _this = jQuery(this),
                label = _this.parent();

              if (_this.is(":checked")) {
                urlFilters += "&" + (_this.attr("rel") || "");
                // Adicionando classe ao label
                label.addClass("sr_selected");
              }

              fns.adjustText(_this);
              // Add span vazio (depois de executar de "adjustText")
              label.append(
                '<span class="sr_box"></span><span class="sr_box2"></span>'
              );

              _this.bind("change", function() {
                fns.inputAction();
                if (_this.is(":checked")) fns.addFilter(_this);
                else fns.removeFilter(_this);
                ajaxCallbackObj.filters = $this.filter(":checked").length;
              });
            });

            if ("" !== urlFilters) fns.addFilter($empty);
          },
          mergeMenu: function() {
            if (!options.mergeMenu) return false;

            var elem = departamentE;
            elem.insertAfter(options.insertMenuAfter);
            fns.departamentMenuFormat(elem);
          },
          mergeMenuList: function() {
            var i = 0;
            filtersMenuE.find("h3,h4").each(function() {
              var ul = linksMenuE
                .find("h3,h4")
                .eq(i)
                .next("ul");
              ul.insertAfter(jQuery(this));
              fns.departamentMenuFormat(ul);
              i++;
            });
          },
          departamentMenuFormat: function(elem) {
            elem.find("a").each(function() {
              var a = jQuery(this);
              a.text(fns.removeCounter(a.text()));
            });
          },
          fieldsetFormat: function() {
            labelCallbackData.fieldsetCount = 0;
            labelCallbackData.tmpCurrentLabel = {};

            filtersMenuE.find("fieldset").each(function() {
              var $t = jQuery(this),
                label = $t.find("label"),
                fieldsetClass =
                  "filtro_" +
                  ($t.find("h5:first").text() || "")
                    .toLowerCase()
                    .replaceSpecialChars()
                    .replace(/\s/g, "-");

              labelCallbackData[fieldsetClass] = {};

              // Ocultar fieldset quando não existe filtro e sair desste método
              if (label.length < 1) {
                $t.hide();
                return;
              }

              // Adicionar classe ao fieldset
              $t.addClass(fieldsetClass);

              // Adicionando classe e título ao label
              label.each(function(ndx) {
                var t = jQuery(this),
                  v = t.find("input").val() || "",
                  labelClass = fns.getLabelClass(t);

                labelCallbackData.tmpCurrentLabel = {
                  fieldsetParent: [$t, fieldsetClass],
                  elem: t
                };

                labelCallbackData[fieldsetClass][ndx.toString()] = {
                  className: labelClass,
                  title: v
                };

                t.addClass(labelClass).attr({
                  title: v,
                  index: ndx
                });

                options.labelCallback(labelCallbackData);
              });

              labelCallbackData.fieldsetCount++;
            });
          },
          getLabelClass: function($this) {
            var v;
            v = $this.find("input").val() || "empty_";
            return "sr_" + fns.toClass(v);
          },
          toClass: function(str) {
            return str
              .toLowerCase()
              .replaceSpecialChars()
              .replace(/\s/g, "-");
          },
          inputAction: function() {
            if (null !== pageJqxhr) pageJqxhr.abort();
            if (null !== shelfJqxhr) shelfJqxhr.abort();
            currentPage = 2;
            moreResults = true;
          },
          addFilter: function(input) {
            urlFilters += "&" + (input.attr("rel") || "");
            prodOverlay.fadeTo(300, 0.6);
            currentSearchUrl = fn.getUrl();
            shelfJqxhr = jQuery.ajax({
              url: currentSearchUrl,
              success: fns.filterAjaxSuccess,
              error: fns.filterAjaxError
            });
            // Adicionando classe ao label
            input.parent().addClass("sr_selected");

            fns.rearrangeFilters(input);
          },
          removeFilter: function(input) {
            var url = input.attr("rel") || "";
            prodOverlay.fadeTo(300, 0.6);
            if (url !== "") urlFilters = urlFilters.replace("&" + url, "");

            currentSearchUrl = fn.getUrl();
            shelfJqxhr = jQuery.ajax({
              url: currentSearchUrl,
              success: fns.filterAjaxSuccess,
              error: fns.filterAjaxError
            });
            // Removendo classe do label
            input.parent().removeClass("sr_selected");

            fns.rearrangeFilters(input);
          },
          filterAjaxSuccess: function(data) {
            var $data = jQuery(data);
            prodOverlay.fadeTo(300, 0, function() {
              jQuery(this).hide();
            });
            fns.updateContent($data);
            ajaxCallbackObj.requests++;
            options.ajaxCallback(ajaxCallbackObj);
            _html.animate(
              {
                scrollTop: options.filterScrollTop(
                  loadContentOffset || {
                    top: 0,
                    left: 0
                  }
                )
              },
              600
            );
          },
          filterAjaxError: function() {
            prodOverlay.fadeTo(300, 0, function() {
              jQuery(this).hide();
            });
            alert(options.filterErrorMsg);
            log(
              "Houve um erro ao tentar fazer a requisição da página com filtros."
            );
          },
          rearrangeFilters: function(input) {
            var label, fieldset;

            label = input.parent();
            fieldset = label.parent().parent();

            $.ajax({
              url: fn.getUrl(2),
              success: function(data) {
                var $d = $(data);
                filtersMenuE.find("fieldset").each(function() {
                  var h5, fieldset, remoteFieldset;
                  fieldset = $(this);
                  h5 = $d.find(
                    ".search-multiple-navigator h5:contains('" +
                      fieldset.find("h5").text() +
                      "')"
                  );
                  remoteFieldset = h5.parent();
                  if (h5.length > 1) {
                    h5.each(function() {
                      var _fieldset = $(this).parent();
                      if (_fieldset.index() === fieldset.index())
                        remoteFieldset = _fieldset;
                    });
                  } else {
                    remoteFieldset = h5.parent();

                    remoteFieldset.find("label").each(function() {
                      var labelClass, fieldset;
                      fieldset = $(this);
                      labelClass = fns.getLabelClass(fieldset);
                      fieldset.addClass(labelClass);
                    });
                  }
                  if (remoteFieldset.find("input").length)
                    fieldset.find("label").each(function() {
                      var _class, label, remoteLabel, input;
                      label = $(this);
                      _class =
                        "sr_" +
                        label
                          .attr("class")
                          .split("sr_")
                          .pop()
                          .split(" ")
                          .shift();

                      remoteLabel = remoteFieldset.find("label." + _class);
                      console.log(remoteLabel);
                      if (remoteLabel.length)
                        label
                          .removeClass("sr_disabled")
                          .find(".sr_text")
                          .text(remoteLabel.text());
                      else label.addClass("sr_disabled");
                    });
                });
              },
              error: function() {
                log("Não foi possível obter a página com os dados do admin.");
              }
            });
          },
          updateContent: function($data) {
            animatingFilter = true;
            if (!options.authorizeUpdate(ajaxCallbackObj)) return false;

            var shelf = $data.filter(options.shelfClass);
            var shelfPage = loadContentE.find(options.shelfClass);

            (shelfPage.length > 0
              ? shelfPage
              : options.emptySearchElem
            ).slideUp(600, function() {
              jQuery(this).remove();

              // Removendo a mensagem de busca vazia, esta remoção "forçada" foi feita para
              // corrigir um bug encontrado ao clicar em vários filtros
              if (options.usePopup) body.find(".boxPopUp2").vtexPopUp2();
              else options.emptySearchElem.remove();

              if (shelf.length > 0) {
                shelf.hide();
                loadContentE.append(shelf);
                options.shelfCallback();
                shelf.slideDown(600, function() {
                  animatingFilter = false;
                });
                ajaxCallbackObj.isEmpty = false;
              } else {
                ajaxCallbackObj.isEmpty = true;

                if (options.usePopup)
                  options.emptySearchElem
                    .addClass(
                      "freeContent autoClose ac_" +
                        options.popupAutoCloseSeconds
                    )
                    .vtexPopUp2()
                    .stop(true)
                    .show();
                else {
                  loadContentE.append(options.emptySearchElem);
                  options.emptySearchElem
                    .show()
                    .css("height", "auto")
                    .fadeTo(300, 0.2, function() {
                      options.emptySearchElem.fadeTo(300, 1);
                    });
                }

                options.emptySearchCallback(ajaxCallbackObj);
              }
            });
          },
          adjustText: function(input) {
            var label,
              text,
              qtt = "";
            label = input.parent();
            text = label.text();

            text =
              '<span class="sr_text">' + fns.removeCounter(text) + "</span>";

            label.html(text).prepend(input);
          },
          removeCounter: function(text) {
            if (options.removeCounter)
              return text.replace(/\([0-9]+\)/gi, function(a) {
                // qtt=a.replace(/\(|\)/,"");
                return "";
              });
            else return text;
          }
        };

        if (body.hasClass("page-department")) fns.mergeMenu();
        else if (
          body.hasClass("page-category") ||
          body.hasClass("resultado-busca")
        )
          fns.mergeMenuList();

        fns.exec();
        fn.infinitScroll();
        fn.scrollToTop();
        options.callback();

        // Exibindo o menu
        filtersMenuE.css("visibility", "visible");
      };
    })(jQuery);

    $(function() {
      $(".search-multiple-navigator input[type='checkbox']").vtexSmartResearch({
        filterScrollTop: function(shelfOffset) {
          return shelfOffset.top - 95;
        }
      });
    });
  }
}
