'use srtict';

// нажатие на элемент .map__pin-main приводит к вводу страницы в активное состояние
// .map перестает содержать .map--faded
// .ad-form перестает содержать .ad-form--disabled
// у input, select, .ad-form или из родительского элемента fieldset убирается disabled !!! removeAttribute('disabled');
// у .map__filters убирается disabled

var mapActive = document.querySelector('.map__pin--main');
console.log(mapActive);
// переменная содержит кнопку метки

var map = document.querySelector('.map');
console.log(map);
// переменная содержит секцию карты

var adForm = document.querySelector('.ad-form');
console.log(adForm);
// переменная содержит ваше обьявление

var mapFilter = document.querySelector('.map__filters');
console.log(mapFilter);
// переменная содержит фильтр обьявлений

var inputForm = adForm.querySelectorAll('input');
console.log(inputForm);
// переменная содержит input находящиеся внутри формы обьявления

var selectForm = adForm.querySelectorAll('select');
console.log(selectForm);
// переменная содержит select внутри формы обьявления

for (var i = 0; i < inputForm.length; i++) {
  inputForm[i].setAttribute('disabled', 'disabled');
  // функция придает свойство disabled к input в форме
};

for (var i = 0; i < selectForm.length; i++) {
  selectForm[i].setAttribute('disabled', 'disabled');
  // функция придает свойство disabled к select в форме
};

var disabledOff = function () {
  for (var i = 0; i < inputForm.length; i++) {
    inputForm[i].removeAttribute('disabled', 'false');
  };
  for (var i = 0; i < selectForm.length; i++) {
    // функция убирает свойство disabled к input в форме
    selectForm[i].removeAttribute('disabled', 'false');
    // функция убирает свойство disabled к select в форме
  };
};

var openMap = function () {
  map.classList.remove('map--faded');
  // у карты убирается класс
};

var openAdForm = function () {
  adForm.classList.remove('ad-form--disabled');
  // разблокируется форма
};
mapActive.addEventListener('mousedown', function
  // при клике активируется функция
  () {
    openMap();
    openAdForm();
    disabledOff();
    addAdress();
  });

mapActive.addEventListener('keydown',
  function (evt) {
    if (evt.key === ENTER_KEY) {
      openMap();
      openAdForm();
      disabledOff();
      addAdress();
    }
  });

// !!!

// установить значение поля ввода адреса при клике по кнопке
// неактивное состояние метка круглая
// активное состояние поле адресса это координаты острого конца метки
// перемещение метки в поле адресса острого конца
// .map__pin--main top: 200px; left: 300px —> 300 + расстоние до острого конца по x, 200 + расстояние до острого конца по y

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
// в переменную положили кординату острого угла метки по ширине

var addressInput = document.querySelector('#address');
console.log(addressInput);
//  в переменную полижили поле адреса


var addAdress = function () {
  var valueAddress = document.querySelector('#address').value = coordX + ',' + coordY;
  console.log(valueAddress);
  return valueAddress;
};

// В случае выбора количества комнат, менялся список опций у гостей
// потребуется такой хитрый объект
// он делает соответствие между кол-вом гостей и кол-вом комнат для них



// нажатие на элемент .map__pin-main приводит к вводу страницы в активное состояние
// .map перестает содержать .map--faded
// .ad-form перестает содержать .ad-form--disabled
// у input, select, .ad-form или из родительского элемента fieldset убирается disabled !!! removeAttribute('disabled');
// у .map__filters убирается disabled

var mapActive = document.querySelector('.map__pin--main');
console.log(mapActive);
// переменная содержит кнопку метки

var map = document.querySelector('.map');
console.log(map);
// переменная содержит секцию карты

var adForm = document.querySelector('.ad-form');
console.log(adForm);
// переменная содержит ваше обьявление

var mapFilter = document.querySelector('.map__filters');
console.log(mapFilter);
// переменная содержит фильтр обьявлений

var inputForm = adForm.querySelectorAll('input');
console.log(inputForm);
// переменная содержит input находящиеся внутри формы обьявления

var selectForm = adForm.querySelectorAll('select');
console.log(selectForm);
// переменная содержит select внутри формы обьявления

var type = document.querySelector('#type');
// все типы жилья

var price = document.querySelector('#price');
// цены

var timeIn = document.querySelector('#timein');
// время вьезда

var timeOut = document.querySelector('#timeout');
// время выезда

var room_number = document.querySelector('#room_number');
// количество комнат

var capacity = document.querySelector('#capacity');
// количество места

type.addEventListener('change', function (evt) {
  // при убирании таргета с типа жилья он должен показывать стоимость в placeholder
  switch (evt.target.value) {
    case 'bungalo':
      price.min = 0;
      price.placeholder = '0';
      brack;
    case 'flat':
      price.min = 1000;
      price.placeholder = '1000';
      break;
    case 'house':
      price.min = 5000;
      price.placeholder = '5000';
      break;
    case 'palace':
      price.min = 10000;
      price.placeholder = 10000;
      break;
  }
});

timeIn.addEventListener('change', function (evt) {
  // при задании времени вьезда задается время вызда
  timeOut.value = evt.target.value;
});

timeOut.addEventListener('change', function (evt) {
  // при задании времени задается вызда время вьезда
  timeIn.value = evt.target.value;
});

var ROOM_NUMBER = {
  // обьнет с массивами чисел для комнат
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

capacity[value].forEach(function (option) {
  type.forEach(function (capacity) {
    if (capacity.value === option) {
      capacity.setAttribute('disabled', false);
    }
  });
});

room_number.addEventListener('change', function () {
  desabledOption(room_number.value)
});

room_number.addEventListener('change', function (evt) {
  evt.target.setCustomValidity('');
});

capacity.addEventListener('change', function (evt) {
  evt.target.setCustomValidity('');
});
