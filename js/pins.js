'use strict';
(function () {
  var MAX_PINS = 5;
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var map = document.querySelector('.map');

  var renderPin = function (info) {
    var pinElement = mapPinTemplate.cloneNode(true);

    pinElement.querySelector('img').src = info.author.avatar;
    pinElement.style.left = info.location.x + 'px';
    pinElement.style.top = info.location.y + 'px';
    pinElement.querySelector('img').alt = info.offer.title;
    var onPinItemClick = function () {
      var mapCardRemovable = map.querySelector('.map__card');
      if (mapCardRemovable) {
        mapCardRemovable.remove();
      }
      window.card.renderCard(info);
    };
    pinElement.addEventListener('click', onPinItemClick);
    return pinElement;
  };

  var clearPinsList = function () {
    var pins = document.querySelector('.map__pins').querySelectorAll('.map__pin');
    for (var i = 0; i < pins.length; i++) {
      if (!pins[i].classList.contains('map__pin--main')) {
        pins[i].remove();
      }
    }
  };

  var renderPinsList = function (pins) {

    var fragment = document.createDocumentFragment();
    var maxLength = pins.length > MAX_PINS ? 5 : pins.length;
    for (var i = 0; i < maxLength; i++) {
      fragment.appendChild(renderPin(pins[i]));
    }

    document.querySelector('.map__pins').appendChild(fragment);
  };

  var loadPins = function () {
    window.load(function (pinsArray) {
      window.pins.list = pinsArray;
      renderPinsList(pinsArray);
    });
  };

  window.pins = {
    loadPins: loadPins,
    renderPinsList: renderPinsList,
    clearPinsList: clearPinsList
  };
})();
