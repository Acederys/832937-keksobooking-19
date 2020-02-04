var newArray = [];
// создали пустой массив

var CONST_NUMBER = 8;
// создали констунту для повторений
var TYPE = ['palace', 'flat', 'house', 'bungalo'];

var CHECKIN = ['12:00', '13:00', '14:00'];

var CHECKOUT = ['12:00', '13:00', '14:00'];

var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var FOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var getRandomElement = function (array) {
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

for (var i = 0; i < CONST_NUMBER; i++) {
  // создали цикл для повторений
  newArray[i] = {
    autor: {
      avatar: 'img/avatars/user0' + getRandomElement(1, 8) + '.png',
    },
    offer: {
      title: 'заголовок предложения',
      address: '600,300',
      price: 100,
      type: getRandomElement(TYPE),
      rooms: 2,
      guests: 2,
      checkin: getRandomElement(CHECKIN),
      checkout: getRandomElement(CHECKOUT),
      features: getRandomElement(FEATURES),
      description: 'строка с описанием',
      photos: getRandomElement(FOTOS),
    },
    location: {
      x: 1,
      y: getRandomElement(130, 630),
    }
  };
}

var mapFaded = document.querySelector('.map');

mapFaded.classList.remove('map--faded');

var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var rendInformation = function (info) {

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

  return rendInformation;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < newArray.length; i++) {
  fragment.appendChild(rendInformation(newArray[i]));
}

var mapListElement = document.querySelector('.map__overlay');