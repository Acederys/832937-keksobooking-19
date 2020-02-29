'use srtict';

// нажатие на элемент .map__pin-main приводит к вводу страницы в активное состояние
// .map перестает содержать .map--faded
// .ad-form перестает содержать .ad-form--disabled
// у input, select, .ad-form или из родительского элемента fieldset убирается disabled !!! removeAttribute('disabled');
// у .map__filters убирается disabled

(function() {

  window.form.disableForm();

  var mapActive = document.querySelector('.map__pin--main');
console.log(mapActive);

// переменная содержит кнопку метки

var map = document.querySelector('.map');
console.log(map);

// переменная содержит секцию карты

var mapFilter = document.querySelector('.map__filters');
console.log(mapFilter);
// переменная содержит фильтр обьявлений

var PIN_WIDTH = window.map.mapActive.offsetWidth;
console.log(PIN_WIDTH);

//ширина метки

var PIN_HEIGHT = window.map.mapActive.offsetHeight;
console.log(PIN_HEIGHT);

//высота метки

var openMap = function () {
  map.classList.remove('map--faded');
  // у карты убирается класс
};

mapActive.addEventListener('mousedown', function
  // при клике активируется функция
  () {
    openMap();
    openAdForm();
    window.form.enableForm();
    window.form.addAddress(coordX, coordY);
  });

mapActive.addEventListener('keydown',
  function (evt) {
    if (evt.key === ENTER_KEY) {
      openMap();
      openAdForm();
      window.form.enableForm();
      window.form.addAddress(coordX, coordY);
    }
  });

  window.map = {
    mapActive: mapActive,
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT
  }

})();
