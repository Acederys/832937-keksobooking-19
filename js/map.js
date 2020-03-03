'use strict';

(function () {

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


  var PIN_WIDTH = mapActive.offsetWidth;
  console.log(PIN_WIDTH);

  //ширина метки

  var PIN_HEIGHT = mapActive.offsetHeight;
  console.log(PIN_HEIGHT);

  //высота метки

  var coordY = mapActive.offsetTop + PIN_HEIGHT;
  console.log(coordY);

  // в переменную положили кординату острого угла метки по высоте

  var coordX = mapActive.offsetLeft + (0.5 * PIN_WIDTH);
  console.log(coordX);


  var openMap = function () {
    map.classList.remove('map--faded');
    // у карты убирается класс
  };

  var isPageLoaded = false;
  var activatePage = function() {
    if(isPageLoaded){
      return;
    }
    openMap();
    window.form.enableForm();
    window.form.addAddress(coordX, coordY);
    window.pins.loadPins();
    isPageLoaded = true;
  };
  mapActive.addEventListener('mousedown',
    function () {
      activatePage();
    });

  mapActive.addEventListener('keydown',
    function (evt) {
      if (evt.key === ENTER_KEY) {
        activatePage();
      };
    });

  // mapFilter.addEventListener('submit', function (evt) {
  //   window.upload(new FormData(mapFilter));
  //   evt.preventDefault();
  // });

})();
