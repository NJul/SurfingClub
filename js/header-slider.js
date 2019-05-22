"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

$(document).ready(function () {
  /* В переменную записывается селектор, который выбирает обертку нашего слайдера. Чтобы поттом к этой переменной можно было обращаться. */
  // $(".owl-carousel").owlCarousel({

  /* Показывается 1 слайд за 1 раз */
  // items: 1,

  /* Зацикливание, бесконечная прокрутка слайдов */
  // loop: true,

  /* Точки выбора слайда по умолчанию true */
  // dots: false,

  /* Скорость прокрутки слайда, 1000 = 1 секунда */
  // smartSpeed: 1000
  // });
  var headerSlider = $("#headerSlider");
  headerSlider.owlCarousel(_defineProperty({
    /* Показывается 1 слайд за 1 раз */
    items: 1,

    /* Зацикливание, бесконечная прокрутка слайдов */
    loop: true,

    /* Точки выбора слайда по умолчанию true */
    dots: false,

    /* Скорость прокрутки слайда, 1000 = 1 секунда */
    smartSpeed: 1000,
    autoplay: true,
    autoplayHoverPause: true,

    /* Настраиваем точное отображение порядкового номера слайда в счетчике слайдов карусели */
    onInitialized: counter,
    onChanged: counter
  }, "onInitialized", function onInitialized(e) {
    $(".slider-my-controls-number__active").text(1);
    $(".slider-my-controls-number__total").text(this.items().length);
  }));
  /* Находим на странице элемент с контроллом и по клику будем переключать на следующий слайд.  */

  $("#headerSliderRight").click(function () {
    headerSlider.trigger("next.owl.carousel");
  });
  $("#headerSliderLeft").click(function () {
    headerSlider.trigger("prev.owl.carousel");
  });
  /* Настраиваем точное отображение порядкового номера слайда в счетчике слайдов карусели */

  function counter(event) {
    if (!event.namespace) {
      return;
    }

    var slides = event.relatedTarget;
    $(".slider-my-controls-number__active").text(slides.relative(slides.current()) + 1);
  }
});