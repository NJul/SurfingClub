"use strict";

$(document).ready(function () {
  var shopSlider = $("#shopSlider");
  shopSlider.owlCarousel({
    /* Показывается 3 слайда за 1 раз */
    items: 3,

    /* Зацикливание, бесконечная прокрутка слайдов */
    // loop: true,

    /* Точки выбора слайда по умолчанию true */
    dots: false,

    /* Скорость прокрутки слайда, 1000 = 1 секунда */
    smartSpeed: 500
  });
});