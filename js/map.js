'use srtict';

// нажатие на элемент .map__pin-main приводит к вводу страницы в активное состояние
// .map перестает содержать .map--faded
// .ad-form перестает содержать .ad-form--disabled
// у input, select, .ad-form или из родительского элемента fieldset убирается disabled !!! removeAttribute('disabled');
// у .map__filters убирается disabled

(function() {

  var mapActive = document.querySelector('.map__pin--main');
console.log(mapActive);

// переменная содержит кнопку метки

var map = document.querySelector('.map');
console.log(map);

// переменная содержит секцию карты

var adForm = document.querySelector('.ad-form');
console.log(adForm);
// переменная содержит ваше обьявление

var mapFilter = document.querySelector('.map__filters');
console.log(mapFilter);
// переменная содержит фильтр обьявлений

// window.disabledOff();


var openMap = function () {
  map.classList.remove('map--faded');
  // у карты убирается класс
};

var openAdForm = function () {
 adForm.classList.remove('ad-form--disabled');
  // разблокируется форма
};
mapActive.addEventListener('mousedown', function
  // при клике активируется функция
  () {
    openMap();
    openAdForm();
    window.disabledOff();
    window.card.addAdress();
  });

mapActive.addEventListener('keydown',
  function (evt) {
    if (evt.key === ENTER_KEY) {
      openMap();
      openAdForm();
      window.disabledOff();
      window.card.addAdress();
    }
  });

  window.map = {
    adForm: adForm
  }

})();
