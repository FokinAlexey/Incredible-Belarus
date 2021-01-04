"use strict"

const initSliderTeasers = () => {
  let teasersSlider = document.querySelector('.teasers__slider');

  if (!teasersSlider) {
    return;
  }

  const teasersSwiper = new Swiper('.teasers__slider', {
    nested: true,
    loop: true,
    slidesPerView: 1,
    autoplay: {
      delay: 3000,
    },

    pagination: {
      el: '.now__pags',
      type: 'custom',
      renderCustom(swiper, current, total) {
        let currentLine = `<span class="slider-controls__pagination-item swiper-pagination-current">${current.toString().padStart(2, '0')}</span>`;
        let totalLine = `<span class="slider-controls__pagination-item swiper-pagination-total">${total.toString().padStart(2, '0')}</span>`;
        return currentLine + totalLine;
      },
    },
    navigation: {
      nextEl: '.now__control--next',
      prevEl: '.now__control--prev',
    }
  });
};

initSliderTeasers();



{/* <script type="text/javascript" charset="utf-8" async src="https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Af3740b177900d2b9b2ddf5466a5e66db02cbcb3c4b3afe5fa779a45b70551ce2&amp;width=476&amp;height=391&amp;lang=ru_RU&amp;scroll=true"></script> */ }