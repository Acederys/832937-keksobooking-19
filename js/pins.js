'use strict';
(function () {
  var MAX_PINS = 5;
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
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
      renderCard(info);
    };
    pinElement.addEventListener('click', onPinItemClick);
    return pinElement;
  };
  var renderCard = function (info) {
    // функция находит поле и вставляет тектовую информацию из массива

    var cardElement = mapCardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__avatar').textContent = info.autor.avatar;
    cardElement.querySelector('.popup__title').textContent = info.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = info.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = info.offer.price;
    cardElement.querySelector('.popup__type').textContent = info.offer.type;
    cardElement.querySelector('.popup__text--capacity').textContent = info.offer.rooms + ' ' + info.offer.guests;
    cardElement.querySelector('.popup__text--time').textContent = info.offer.checkin + ' ' + info.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = info.offer.description;
    cardElement.querySelector('.popup__photos').textContent = info.offer.photos;
    var closeBtn = cardElement.querySelector('.popup__close');
    var close = function () {
      cardElement.remove();
      closeBtn.removeEventListener('click', onCloseBtnClick);
    };
    var onCloseBtnClick = function () {
      close();
    };
    closeBtn.addEventListener('click', onCloseBtnClick);
    return cardElement;
  };

  var clearPinsList = function(){
    var pins = document.querySelector('.map__pins').querySelectorAll('.map__pin');
    for (var i = 0; i < pins.length; i++) {
      if (!pins[i].classList.contains('map__pin--main')) {
        pins[i].remove();
      }
    }
  };

  var clearCardList = function(){
    var card = document.querySelector('.map__card');
    for (var i = 0; i < card.length; i++) {
      if (!card[i].classList.contains('map__pin--main')) {
        card[i].remove();
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

  var renderCardList = function (card) {

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 1; i++) {
      fragment.appendChild(renderCard(card[i]));
    }

    document.querySelector('.map').appendChild(fragment);
  };

  var loadPins = function() {
    window.load(function(pinsArray) {
      window.pins.list = pinsArray;
      renderPinsList(pinsArray);
    });
  };

  var loadCard = function() {
    window.load(function(cardArray) {
      window.pins.list = cardArray;
      renderCardList(cardArray);
    });
  };

  window.pins = {
    loadPins: loadPins,
    renderPinsList: renderPinsList,
    clearPinsList:clearPinsList,
    clearCardList:clearCardList,
    loadCard: loadCard
  };
})();
