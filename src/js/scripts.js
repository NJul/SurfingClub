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

  const headerSlider = $(".owl-carousel");
  headerSlider.owlCarousel({
    /* Показывается 1 слайд за 1 раз */
    items: 1,
    /* Зацикливание, бесконечная прокрутка слайдов */
    loop: true,
    /* Точки выбора слайда по умолчанию true */
    dots: false,
    /* Скорость прокрутки слайда, 1000 = 1 секунда */
    smartSpeed: 1000
  });

  // Go to the next item
  /* Находим на странице элемент с контроллом и по клику будем, например, переключать на следующий слайд.  */

  $('#headerSliderRight').click(function () {
    headerSlider.trigger('next.owl.carousel');
  })
  // Go to the previous item
  $('#headerSliderLeft').click(function () {
    // With optional speed parameter
    // Parameters has to be in square bracket , '[]' )
    headerSlider.trigger('prev.owl.carousel');
  })

});