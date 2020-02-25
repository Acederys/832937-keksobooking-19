'use srtict';

(function() {
  var mapActive = document.querySelector('.map__pin--main');
console.log(mapActive);
window.mapActive = mapActive;
// переменная содержит кнопку метки

var map = document.querySelector('.map');
console.log(map);
window.map = map;
// переменная содержит секцию карты

var adForm = document.querySelector('.ad-form');
console.log(adForm);
window.adForm = adForm;
// переменная содержит ваше обьявление

var mapFilter = document.querySelector('.map__filters');
console.log(mapFilter);
window.mapFilter = mapFilter;
// переменная содержит фильтр обьявлений

var inputForm = adForm.querySelectorAll('input');
console.log(inputForm);
window.inputForm = inputForm;
// переменная содержит input находящиеся внутри формы обьявления

var selectForm = adForm.querySelectorAll('select');
console.log(selectForm);
window.selectForm = selectForm;
// переменная содержит select внутри формы обьявления

var PIN_WIDTH = mapActive.offsetWidth;
console.log(PIN_WIDTH);
window.PIN_WIDTH = PIN_WIDTH;
//ширина метки

var PIN_HEIGHT = mapActive.offsetHeight;
console.log(PIN_HEIGHT);
window.PIN_HEIGHT = PIN_HEIGHT;
//высота метки

var coordY = mapActive.offsetTop + PIN_HEIGHT;
console.log(coordY);
window.coordY = coordY;
// в переменную положили кординату острого угла метки по высоте

var coordX = mapActive.offsetLeft + (0.5 * PIN_WIDTH);
console.log(coordX);
window.coordX = coordX;
// в переменную положили кординату острого угла метки по ширине

var addressInput = document.querySelector('#address');
console.log(addressInput);
window.addressInput = addressInput;

var type = document.querySelector('#type');
console.log(type);
window.type = type;
// все типы жилья

var price = document.querySelector('#price');
console.log(price);
window.price = price;
// цены

var timeIn = document.querySelector('#timein');
console.log(timeIn);
window.timeIn = timeIn;
// время вьезда

var timeOut = document.querySelector('#timeout');
console.log(timeOut);
window.timeOut = timeOut;
// время выезда

var roomNumber = document.querySelector('#room_number');
console.log(roomNumber);
window.roomNumber = roomNumber;
// количество комнат

var roomCapacity = document.querySelector('#capacity');
console.log(roomCapacity);
window.roomCapacity = roomCapacity
// количество места

var capacityList = roomCapacity.querySelectorAll('option');
console.log(capacityList);
window.capacityList = capacityList;

var roomOptions = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0]
};
window.roomOptions = roomOptions;
})();

