{
  window.addEventListener("load", function() {
    // Adicionar Class na Vitrine
    const vitrineItem = document.querySelectorAll(".ds-new-vitrine ul li");
    const vitrineArray = Array.from(vitrineItem);

    vitrineArray.forEach(item => {
      if (item.classList.contains("helperComplement")) {
        item.remove();
      } else {
        item.classList.add("vitrine-item");
      }
    });

    // Porcentagem
    const percentage = document.querySelectorAll(
      ".ds-new-vitrine .flag-desconto .porcentagem"
    );
    const percentageArray = Array.from(percentage);

    percentageArray.map((item, index) => {
      const value = item.innerHTML.replace(" %", "").replace(",", ".");
      return (percentageArray[index].innerHTML = `${Math.round(value)}%`);
    });

    // Vitrine Carousel
    jQuery(".vitrine-carousel .ds-new-vitrine ul").slick({
      slidesToShow: 4,
      slidesToScroll: 4,
      dots: true,
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: false
          }
        }
      ]
    });
  });
}
