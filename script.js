"use strict"

const ESC_KEYCODE = 27;
const successMessage = document.querySelector('.success');
const successCloseButton = document.querySelector('.success__closer');
const subscribeForm = document.querySelector('.subscribe__form');

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
};

const successMessageOpenHandler = () => {
  if (successMessage) {
    successMessage.classList.add('success--show');
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

// анимация
const scrollItems = document.querySelectorAll('.scrooll-item');

const scrollAnimation = () => {
  let windowScroolCoordinates = (window.innerHeight - 100) + window.scrollY;
  scrollItems.forEach((elem) => {
    let scrollOffset = elem.offsetTop + elem.offsetHeight / 2;
    if (windowScroolCoordinates >= scrollOffset) {
      elem.classList.add('scrooll-item--animation');
    } else {
      elem.classList.remove('scrooll-item--animation');
    }
  });
};

if (scrollItems) {
  window.addEventListener('scroll', scrollAnimation);
}

initSliderTeasers();

if (subscribeForm) {
  subscribeForm.addEventListener('submit', submitSubscribeForm);
}

{/* <script type="text/javascript" charset="utf-8" async src="https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Af3740b177900d2b9b2ddf5466a5e66db02cbcb3c4b3afe5fa779a45b70551ce2&amp;width=476&amp;height=391&amp;lang=ru_RU&amp;scroll=true"></script> */ }

// block scroll
const checkBox = document.getElementById('menu__toggle');
const fun1 = () => {

  if (checkBox.checked) {
    // add style in body
    document.querySelector("body").style.overflow = "hidden";
  } else {
    // remove style from body
    document.querySelector("body").style.overflow = "auto";
  }
}


// Слайдер с цитатами

const multiItemSlider = (function () {
  return function (selector, config) {
    let
      _mainElement = document.querySelector(selector), // основный элемент блока
      _sliderWrapper = _mainElement.querySelector('.slider__wrapper'), // обертка для .slider-item
      _sliderItems = _mainElement.querySelectorAll('.slider__item'), // элементы (.slider-item)
      _sliderControls = _mainElement.querySelectorAll('.slider__control'), // элементы управления
      _sliderControlLeft = _mainElement.querySelector('.slider__control_left'), // кнопка "LEFT"
      _sliderControlRight = _mainElement.querySelector('.slider__control_right'), // кнопка "RIGHT"
      _wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper).width), // ширина обёртки
      _itemWidth = parseFloat(getComputedStyle(_sliderItems[0]).width), // ширина одного элемента    
      _positionLeftItem = 0, // позиция левого активного элемента
      _transform = 0, // значение транфсофрмации .slider_wrapper
      _step = _itemWidth / _wrapperWidth * 100, // величина шага (для трансформации)
      _items = [], // массив элементов
      _interval = 0,
      _config = {
        isCycling: false, // автоматическая смена слайдов
        direction: 'right', // направление смены слайдов
        interval: 5000, // интервал между автоматической сменой слайдов
        pause: true // устанавливать ли паузу при поднесении курсора к слайдеру
      };

    for (let key in config) {
      if (key in _config) {
        _config[key] = config[key];
      }
    }

    // наполнение массива _items
    _sliderItems.forEach(function (item, index) {
      _items.push({ item: item, position: index, transform: 0 });
    });

    const position = {
      getItemMin: function () {
        let indexItem = 0;
        _items.forEach(function (item, index) {
          if (item.position < _items[indexItem].position) {
            indexItem = index;
          }
        });
        return indexItem;
      },
      getItemMax: function () {
        let indexItem = 0;
        _items.forEach(function (item, index) {
          if (item.position > _items[indexItem].position) {
            indexItem = index;
          }
        });
        return indexItem;
      },
      getMin: function () {
        return _items[position.getItemMin()].position;
      },
      getMax: function () {
        return _items[position.getItemMax()].position;
      }
    }

    const _transformItem = function (direction) {
      let nextItem;
      if (direction === 'right') {
        _positionLeftItem++;
        if ((_positionLeftItem + _wrapperWidth / _itemWidth - 1) > position.getMax()) {
          nextItem = position.getItemMin();
          _items[nextItem].position = position.getMax() + 1;
          _items[nextItem].transform += _items.length * 100;
          _items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)';
        }
        _transform -= _step;
      }
      if (direction === 'left') {
        _positionLeftItem--;
        if (_positionLeftItem < position.getMin()) {
          nextItem = position.getItemMax();
          _items[nextItem].position = position.getMin() - 1;
          _items[nextItem].transform -= _items.length * 100;
          _items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)';
        }
        _transform += _step;
      }
      _sliderWrapper.style.transform = 'translateX(' + _transform + '%)';
    }

    const _cycle = function (direction) {
      if (!_config.isCycling) {
        return;
      }
      _interval = setInterval(function () {
        _transformItem(direction);
      }, _config.interval);
    }

    // обработчик события click для кнопок "назад" и "вперед"
    const _controlClick = function (e) {
      if (e.target.classList.contains('slider__control')) {
        e.preventDefault();
        let direction = e.target.classList.contains('slider__control_right') ? 'right' : 'left';
        _transformItem(direction);
        clearInterval(_interval);
        _cycle(_config.direction);
      }
    };

    const _setUpListeners = function () {
      // добавление к кнопкам "назад" и "вперед" обрботчика _controlClick для событя click
      _sliderControls.forEach(function (item) {
        item.addEventListener('click', _controlClick);
      });
      if (_config.pause && _config.isCycling) {
        _mainElement.addEventListener('mouseenter', function () {
          clearInterval(_interval);
        });
        _mainElement.addEventListener('mouseleave', function () {
          clearInterval(_interval);
          _cycle(_config.direction);
        });
      }
    }

    // инициализация
    _setUpListeners();
    _cycle(_config.direction);

    return {
      right: function () { // метод right
        _transformItem('right');
      },
      left: function () { // метод left
        _transformItem('left');
      },
      stop: function () { // метод stop
        _config.isCycling = false;
        clearInterval(_interval);
      },
      cycle: function () { // метод cycle 
        _config.isCycling = true;
        clearInterval(_interval);
        _cycle();
      }
    }

  }
}());

const slider = multiItemSlider('.slider', {
  isCycling: true
})

//pop-up в форме 

const successMessage2 = document.querySelector('.success__form');
const successCloseButton2 = document.querySelector('.success__closer__form');
const subscribeForm2 = document.querySelector('.contact_form');

const closeByEsc2 = () => {
  document.addEventListener('keydown', (evt) => {
    if (evt.keyCode === ESC_KEYCODE) {
      successMessageCloserHandler2();
    }
  });
};

const CloseOnClickOutsideHandler2 = (e) => {
  let target = e.target;

  if (target.classList.contains('success__overlay__form')) {
    successMessageCloserHandler2();
  }
};

const successMessageCloserHandler2 = () => {
  successMessage2.classList.remove('success__form--show');
};

const successMessageOpenHandler2 = () => {
  if (successMessage2) {
    successMessage2.classList.add('success__form--show');
  }

  successCloseButton2.addEventListener('click', successMessageCloserHandler2);
  closeByEsc2();
  document.addEventListener('click', CloseOnClickOutsideHandler2);
};

const resetForm2 = () => {
  subscribeForm2.reset();
};

const submitSubscribeForm2 = (evt) => {
  evt.preventDefault();
  successMessageOpenHandler2();
  resetForm2();
};

if (subscribeForm2) {
  subscribeForm2.addEventListener('submit', submitSubscribeForm2);
}
// // block scroll
// const checkBox = document.getElementById('menu__toggle');
// const fun1 = () => {

//   if (checkBox.checked) {
//     // add style in body
//     document.querySelector("body").style.overflow = "hidden";
//   } else {
//     // remove style from body
//     document.querySelector("body").style.overflow = "auto";
//   }
// }
