'use strict';

(function () {

  window.form.disableForm();

  var template = document.querySelector('template');

  var buttomForm = document.querySelector('.ad-form__submit');

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
  var PinSize = {
    WIDTH: 65,
    HEIGHT: 65,
  };

  var DragLimit = {
    X: {
      MIN: 0,
      MAX: 1200
    },
    Y: {
      MIN: 130,
      MAX: 630
    }
  };

  var TAIL_HEIGHT = 16;
  var openMap = function () {
    map.classList.remove('map--faded');
    // у карты убирается класс
  };

  var renderSuccessPopup = function () {
    var successFragment = template.querySelector('.success').nodeClone(true);
    return successFragment;
  };

  var renderErrorPopup = function () {
    var errorFragment = template.querySelector('.error').nodeClone(true);
    return errorFragment;
  };

  var showSuccessPopup = function (popup) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(renderSuccessPopup(popup));
    document.querySelector('main').appendChild(fragment);
  };

  var showErrorPopup = function (popup) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(renderErrorPopup(popup));
    document.querySelector('main').appendChild(fragment);
  };

  buttomForm.addEventListener('click', function (evt) {
    var data = new FormData(document.querySelector('.ad-form'));
    window.load.URLupload(data, showSuccessPopup, showErrorPopup);
    // evt.preventDefault();
  });

  var isPageLoaded = false;

  var onMainPinMouseDown = function (evt) {
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      var mainPinPosition = {
        x: mapActive.offsetLeft - shift.x,
        y: mapActive.offsetTop - shift.y
      };
      var Border = {
        TOP: DragLimit.Y.MIN - mapActive.offsetHeight - TAIL_HEIGHT,
        BOTTOM: DragLimit.Y.MAX - mapActive.offsetHeight - TAIL_HEIGHT,
        LEFT: DragLimit.X.MIN,
        RIGHT: DragLimit.X.MAX - mapActive.offsetWidth
      };
      if (mainPinPosition.x >= Border.LEFT && mainPinPosition.x <= Border.RIGHT) {
        mapActive.style.left = mainPinPosition.x + 'px';
      }
      if (mainPinPosition.y >= Border.TOP && mainPinPosition.y <= Border.BOTTOM) {
        mapActive.style.top = mainPinPosition.y + 'px';
      }
      var pinTailCoords = {
        x: mainPinPosition.x + Math.ceil(PinSize.WIDTH / 2),
        y: mainPinPosition.y + PinSize.HEIGHT + TAIL_HEIGHT
      };
      window.form.addAddress(pinTailCoords);
    };

    var onMouseUp = function (upEvt) {
      if (!isPageLoaded) {
        openMap();
        window.form.enableForm();
        window.pins.loadPins();
        isPageLoaded = true;
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var initPage = function () {
    mapActive.addEventListener('mousedown', onMainPinMouseDown);
  };
  initPage();
  // mapFilter.addEventListener('submit', function (evt) {
  //   window.upload(new FormData(mapFilter));
  //   evt.preventDefault();
  // });

})();
