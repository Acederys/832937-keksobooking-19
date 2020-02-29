'use srtict';

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

var openMap = function () {
  map.classList.remove('map--faded');
  // у карты убирается класс
};

mapActive.addEventListener('mousedown',
 function() {
    openMap();
    window.form.enableForm();
    window.form.addAddress();
  });

mapActive.addEventListener('keydown',
  function (evt) {
    if (evt.key === ENTER_KEY) {
      openMap();
      window.form.enableForm();
      window.form.addAddress();
    };
  });

})();
