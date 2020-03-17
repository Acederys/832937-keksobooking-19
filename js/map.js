'use strict';

(function () {

  var TAIL_HEIGHT = 16;
  var mapActive = document.querySelector('.map__pin--main');
  var PIN_WIDTH = mapActive.offsetWidth;

  var PIN_HEIGHT = mapActive.offsetHeight;

  window.form.disableForm();

  var map = document.querySelector('.map');

  var coordY = mapActive.offsetTop + PIN_HEIGHT;

  var coordX = mapActive.offsetLeft + (0.5 * PIN_WIDTH);

  var adForm = document.querySelector('.ad-form');

  var mainPin = map.querySelector('.map__pin--main');
  var mainPinLeft = getComputedStyle(mainPin).left;
  var mainPinTop = getComputedStyle(mainPin).top;

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

  var setMainPinCoords = function () {
    mainPin.style.left = mainPinLeft;
    mainPin.style.top = mainPinTop;
  };

  var openMap = function () {
    map.classList.remove('map--faded');
  };

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

    var onMouseUp = function () {
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

  var resetPage = function () {
    setMainPinCoords();
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    isPageLoaded = false;
  };

  var initPage = function () {
    mapActive.addEventListener('mousedown', onMainPinMouseDown);
    window.form.addAddress({
      x: coordX,
      y: coordY
    });
  };
  initPage();

  window.map = {
    resetPage: resetPage
  };

})();
