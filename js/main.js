var newArray = [];
// создали пустой массив

var CONST_NUMBER = 8;
// создали констунту для повторений
var TYPE = ['palace', 'flat', 'house', 'bungalo'];

var CHECKIN = ['12:00', '13:00', '14:00'];
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

var getRandomNumber = function(min, max) {
var rand = min + Math.random() * (max + 1 - min);
return Math.floor(rand);
};

// в переменной лежит функция случайного числа от минимального до максимального

for (var i = 0; i < CONST_NUMBER; i++) {
// создали цикл для повторений
newArray[i] = {
autor: {
avatar: 'img/avatars/user0' + getRandomNumber(1, 8) + '.png',
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
x: getRandomNumber(1, 1199),
y: getRandomNumber(130, 630),
}
};
console.log(newArray[i]);
}

var mapFaded = document.querySelector('.map');

// переменная для всей карты обьявлений

console.log(mapFaded);

mapFaded.classList.remove('map--faded');

var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

// шаблон для создания точек на карте

console.log(mapPinTemplate); // содержит кнопку с иконкой юзера

var mapPinInfo = document.querySelector('#card').content.querySelector('.map__card.popup');

// шаблон для создания окна информации

console.log(mapPinInfo);

//содержит блок информации

var rendInformation = function(info) {
// функция находит поле и вставляет тектовую информацию из массива

var cardElement = mapPinInfo.cloneNode(true);

cardElement.querySelector('.popup__avatar').textContent = info.autor.avatar;
cardElement.querySelector('.popup__title').textContent = info.offer.title;
cardElement.querySelector('.popup__text--address').textContent = info.offer.address;
cardElement.querySelector('.popup__text--price').textContent = info.offer.price;
cardElement.querySelector('.popup__type').textContent = info.offer.type;
cardElement.querySelector('.popup__text--capacity').textContent = info.offer.rooms + ' ' + info.offer.guests;
cardElement.querySelector('.popup__text--time').textContent = info.offer.checkin + ' ' + info.offer.checkout;
cardElement.querySelector('.popup__description').textContent = info.offer.description;
cardElement.querySelector('.popup__photos').textContent = info.offer.photos;

return cardElement;
};

var renderPin = function(info) {
var pinElement = mapPinTemplate.cloneNode(true);

pinElement.querySelector('img').src = info.autor.avatar;
pinElement.style.left = info.location.x + 'px';
pinElement.style.top = info.location.y + 'px';
pinElement.querySelector('img').alt = info.offer.title;
return pinElement;
};

var fragment = document.createDocumentFragment();

// for (var i = 0; i < newArray.length; i++) {
// fragment.appendChild(rendInformation(newArray[i]));
// }

for (var i = 0; i < newArray.length; i++) {
fragment.appendChild(renderPin(newArray[i]));
}

document.querySelector('.map__pins').appendChild(fragment);
// var mapListElement = document.querySelector('.map__overlay');