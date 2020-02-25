'use srtict';

// установить значение поля ввода адреса при клике по кнопке
// неактивное состояние метка круглая
// активное состояние поле адресса это координаты острого конца метки
// перемещение метки в поле адресса острого конца

(function() {
window.addAdress = function () {
  var valueAddress = document.querySelector('#address').value = coordX + ',' + coordY;
  console.log(valueAddress);
  return valueAddress;
};
}) ();
