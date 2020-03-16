'use strict';
(function () {
  var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var mapFilterContainr = document.querySelector('.map__filters-container');

  var template = document.querySelector('template');
  var popupFeat = mapCardTemplate.querySelectorAll('.popup__feature');

  for(var i = 0; i < popupFeat.length; ++i){
    popupFeat[i].remove();
  }

  // var popupFeat = mapCardTemplate.querySelector('.popup__features');
  // while( popupFeat.firstChild ) {
  //   popupFeat.removeChild( popupFeat.firstChild );
  // }
  var popupPhoto = template.content.querySelector('.popup__photo');

  var popupType = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var createFeatureFragment = function (info) {
    var featureFragment = document.createDocumentFragment();


    info.offer.features.forEach(function (it) {

      var featureItem = document.createElement('li');
      featureItem.className = 'popup__feature popup__feature--' + it;
      featureFragment.appendChild(featureItem);
    });
    return featureFragment;
  };

  var createPhotosFragment = function (info) {
    var photosFragment = document.createDocumentFragment();
    info.offer.photos.forEach(function (it) {
      var popupPhotoItem = popupPhoto.cloneNode(true);
      popupPhotoItem.src = it;
      photosFragment.appendChild(popupPhotoItem);
    });
    return photosFragment;
  };

  var renderCard = function (info) {
    // функция находит поле и вставляет тектовую информацию из массива

    var cardElement = mapCardTemplate.cloneNode(true);

    cardElement.querySelector('.map__card img').src = info.author.avatar;
    cardElement.querySelector('.popup__title').textContent = info.offer.title;
    cardElement.querySelector('.popup__text--price').textContent = info.offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__type').textContent = popupType[info.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = info.offer.rooms + ' комнаты для ' + info.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + info.offer.checkin + ', выезд до ' + info.offer.checkout;
    cardElement.querySelector('.popup__features').appendChild(createFeatureFragment(info));
    cardElement.querySelector('.popup__description').textContent = info.offer.description;
    cardElement.querySelector('.popup__photos').removeChild(cardElement.querySelector('.popup__photo'));
    cardElement.querySelector('.popup__photos').appendChild(createPhotosFragment(info));
    var closeBtn = cardElement.querySelector('.popup__close');
    mapFilterContainr.insertAdjacentElement('beforebegin', cardElement);
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

  var deleteCard = function(){
    var cardElement = mapCardTemplate.cloneNode(true);
    cardElement.remove();
  };

  window.card = {
    renderCard: renderCard,
    deleteCard:deleteCard
  };
}) ();
