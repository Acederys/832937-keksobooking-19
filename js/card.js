'use srtict';

// установить значение поля ввода адреса при клике по кнопке
// неактивное состояние метка круглая
// активное состояние поле адресса это координаты острого конца метки
// перемещение метки в поле адресса острого конца

(function() {
var PIN_WIDTH = window.map.mapActive.offsetWidth;
console.log(PIN_WIDTH);

//ширина метки

var PIN_HEIGHT = window.map.mapActive.offsetHeight;
console.log(PIN_HEIGHT);

//высота метки

var coordY = window.map.mapActive.offsetTop + PIN_HEIGHT;
console.log(coordY);

// в переменную положили кординату острого угла метки по высоте

var coordX = window.map.mapActive.offsetLeft + (0.5 * PIN_WIDTH);
console.log(coordX);


window.card = {
  PIN_WIDTH:PIN_WIDTH,
  PIN_HEIGHT: PIN_HEIGHT,
  coordY: coordY,
  coordX: coordX,
  addAdress: addAdress,
};

// в переменную положили кординату острого угла метки по ширине

var addAdress = function () {
  var valueAddress = document.querySelector('#address').value = coordX + ',' + coordY;
  console.log(valueAddress);
  return valueAddress;
};
}) ();
