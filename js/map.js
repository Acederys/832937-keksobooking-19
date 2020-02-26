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

window.map = {
  mapActive: mapActive,
  map: map,
  adForm: adForm,
  mapFilter: mapFilter,
};

window.form.disableOff();


var openMap = function () {
  window.map.map.classList.remove('map--faded');
  // у карты убирается класс
};

var openAdForm = function () {
  window.map.adForm.classList.remove('ad-form--disabled');
  // разблокируется форма
};
mapActive.addEventListener('mousedown', function
  // при клике активируется функция
  () {
    openMap();
    openAdForm();
    window.form.disabledOff();
    window.card.addAdress();
  });

mapActive.addEventListener('keydown',
  function (evt) {
    if (evt.key === ENTER_KEY) {
      openMap();
      openAdForm();
      window.form.disabledOff();
      window.card.addAdress();
    }
  });

})();
