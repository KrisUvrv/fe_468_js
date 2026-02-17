const swiper = new Swiper('.swiper', {

  slidesPerView: 1.2,

  spaceBetween: 8,

  watchOverflow: true,

  speed: 1000, // плавнее

  loop: true, // зациклены

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

});

function roundToStep(value, step) {
  return Math.round(value / step) * step;
}

function calcSlidesPerView() {
  const width = window.innerWidth; // ширина окна

  const minW = 330; // Минимальная ширина диапазона
  const maxW = 768; // Выше 768px — считаем, что достигли tablet.

  const minSlides = 1.2; // Минимальное количество слайдов
  const maxSlides = 3; // На планшете 3 слайда.

  const clampedWidth = Math.min(Math.max(width, minW), maxW); // Ограничение диапазона; Если width меньше minW → берём minW; Если больше maxW → берём maxW. ✅ Итог: width всегда между 330 и 768.

  const percent = (clampedWidth - minW) / (maxW - minW); // Находим процент диапазона 👉 насколько мы продвинулись от mobile к tablet
  const value = minSlides + percent * (maxSlides - minSlides); // Получаем значение slidesPerView

  return roundToStep(value, 0.01); // Округляем к шагу
}

function updateSwiper() {
  swiper.params.slidesPerView = calcSlidesPerView();
  swiper.update();
}

updateSwiper();

window.addEventListener('resize', updateSwiper);
window.addEventListener('resize', () => {
  console.log(window.innerWidth)
});
