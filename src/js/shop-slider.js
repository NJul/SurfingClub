$(document).ready(function () {

  const shopSlider = $("#shopSlider");

  shopSlider.owlCarousel({
    /* Показывается 3 слайда за 1 раз */
    items: 3,
    /* Зацикливание, бесконечная прокрутка слайдов */
    loop: true,
    /* Точки выбора слайда по умолчанию true */
    dots: false,
    /* Скорость прокрутки слайда, 1000 = 1 секунда */
    smartSpeed: 500,
    /* Отступ между слайдами */
    margin: 2
  });

  // Go to the next item
  $('#shopSliderRight').click(function () {
    shopSlider.trigger('next.owl.carousel');
  })
  // Go to the previous item
  $('#shopSliderLeft').click(function () {
    shopSlider.trigger('prev.owl.carousel');
  })



});