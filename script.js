"use strict"

const ESC_KEYCODE = 27;
const successMessage = document.querySelector('.success');
const successCloseButton = document.querySelector('.success__closer');
const subscribeForm = document.querySelector('.subscribe__form');
const legendButton = document.querySelector('.legend__button');
const legendBlock = document.querySelector('.legend__content');

// логика показа-скрытия popup с сообщением о подписке

const closeByEsc = () => {
  document.addEventListener('keydown', (evt) => {
    if (evt.keyCode === ESC_KEYCODE) {
      successMessageCloserHandler();
    }
  });
};

const CloseOnClickOutsideHandler = (e) => {
  let target = e.target;

  if (target.classList.contains('success__overlay')) {
    successMessageCloserHandler();
  }
};

const successMessageCloserHandler = () => {
  successMessage.classList.remove('success--show');
  // enableScrolling();
};

const successMessageOpenHandler = () => {
  if (successMessage) {
    successMessage.classList.add('success--show');
    // disableScrolling();
  }

  successCloseButton.addEventListener('click', successMessageCloserHandler);
  closeByEsc();
  document.addEventListener('click', CloseOnClickOutsideHandler);
};

const resetForm = () => {
  subscribeForm.reset();
};

const submitSubscribeForm = (evt) => {
  evt.preventDefault();
  successMessageOpenHandler();
  resetForm();
};

//логика показа блока legendBlock 

const toggleLegendButton = () => {
  if (legendBlock.classList.contains('legend__content--closed')) {
    legendBlock.classList.remove('legend__content--closed');
    legendBlock.classList.add('legend__content--opened');
    legendButton.textContent = 'Cвернуть';

  } else {
    legendBlock.classList.add('legend__content--closed');
    legendBlock.classList.remove('legend__content--opened');
    legendButton.textContent = 'Подробнее';
  }
};

// слайдер на главной странице

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

// слайдер на странице замков

const initSliderCastles = () => {
  let mirCastleSlider = document.querySelector('.mir-castle__slider');

  if (!mirCastleSlider) {
    return;
  }

  const mirSwiper = new Swiper('.mir-castle__slider', {
    nested: true,
    loop: true,
    slidesPerView: 1,
    autoplay: {
      delay: 3000,
    },
    effect: 'fade',
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });
};

// табы на сранице замков

const tabs = document.querySelectorAll('.story__tab-link');
const storyBlockContent = document.querySelector('.story__list');

const tabElementClick = () => {

  let hideAllTabs = () => {
    tabs.forEach((tab) => {
      tab.parentElement.classList.remove('story__tab-item--show');
    });
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', (evt) => {
      evt.preventDefault();
      hideAllTabs();
      tab.parentElement.classList.add('story__tab-item--show');
      storyBlockContent.style.transform = `translateX(${-(i * 100)}%)`;
    });
  });
};

//переключение табов на странице замков на слайдер

const addSwiperStory = () => {
  let storySlider = document.querySelector('.swiper-story');

  if (!storySlider) {
    return;
  }
  const breakpoint = window.matchMedia(`(min-width:1024px)`);
  let swiperStory;

  const breakpointChecker = () => {

    if (breakpoint.matches === true) {
      if (swiperStory) {
        swiperStory.destroy(true, true);
      }
      return;
    } else if (breakpoint.matches === false) {
      return enableSwiper();
    }
  };

  const enableSwiper = () => {
    swiperStory = new Swiper('.swiper-story', {
      loop: true,
      spaceBetween: 20,
      pagination: {
        el: '.swiper-pagination-story',
        clickable: false
      },
    });
  };

  breakpoint.addListener(breakpointChecker);

  breakpointChecker();
};


initSliderTeasers();
initSliderCastles();
addSwiperStory();

if (subscribeForm) {
  subscribeForm.addEventListener('submit', submitSubscribeForm);
}

if (legendButton) {
  legendButton.addEventListener('click', toggleLegendButton);
}

if (tabs) {
  tabElementClick();
}

{/* <script type="text/javascript" charset="utf-8" async src="https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Af3740b177900d2b9b2ddf5466a5e66db02cbcb3c4b3afe5fa779a45b70551ce2&amp;width=476&amp;height=391&amp;lang=ru_RU&amp;scroll=true"></script> */ }