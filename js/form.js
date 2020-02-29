'use srtict';
// В случае выбора количества комнат, менялся список опций у гостей
// потребуется такой хитрый объект
// он делает соответствие между кол-вом гостей и кол-вом комнат для них



// нажатие на элемент .map__pin-main приводит к вводу страницы в активное состояние
// .map перестает содержать .map--faded
// .ad-form перестает содержать .ad-form--disabled
// у input, select, .ad-form или из родительского элемента fieldset убирается disabled !!! removeAttribute('disabled');
// у .map__filters убирается disabled

(function() {
  var addressInput = document.querySelector('#address');
  console.log(addressInput);


  var type = document.querySelector('#type');
  console.log(type);

  // все типы жилья

  var price = document.querySelector('#price');
  console.log(price);

  // цены

  var timeIn = document.querySelector('#timein');
  console.log(timeIn);

  // время вьезда

  var timeOut = document.querySelector('#timeout');
  console.log(timeOut);

  // время выезда

  var roomNumber = document.querySelector('#room_number');
  console.log(roomNumber);

  // количество комнат

  var roomCapacity = document.querySelector('#capacity');
  console.log(roomCapacity);

  // количество места

  var capacityList = roomCapacity.querySelectorAll('option');
  console.log(capacityList);


  var roomOptions = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };

  var adForm = document.querySelector('.ad-form');
console.log(adForm);
// переменная содержит ваше обьявление

var inputForm = adForm.querySelectorAll('input');
console.log(inputForm);

// переменная содержит input находящиеся внутри формы обьявления

var selectForm = adForm.querySelectorAll('select');
console.log(selectForm);

// переменная содержит select внутри формы обьявления

var coordY = window.map.mapActive.offsetTop + window.map.PIN_HEIGHT;
console.log(coordY);

// в переменную положили кординату острого угла метки по высоте

var coordX = window.map.mapActive.offsetLeft + (0.5 * window.map.PIN_WIDTH);
console.log(coordX);

var addAdress = function () {
  var valueAddress = document.querySelector('#address').value = coordX + ',' + coordY;
  console.log(valueAddress);
  return valueAddress;
};

  var calculateGuestsNumber = function (value) {
    capacityList.forEach(function (option) {
    option.disabled = true;
  });

  roomOptions[value].forEach(function (it) {
    capacityList.forEach(function (opt) {
      if (Number(opt.value) === it) {
        opt.disabled = false;
        opt.selected = true;
      }
  });
});}

calculateGuestsNumber(roomNumber.value);

roomNumber.addEventListener('change', function (event) {
  calculateGuestsNumber(event.target.value);
})

type.addEventListener('change', function (evt) {
  // при убирании таргета с типа жилья он должен показывать стоимость в placeholder
  switch (evt.target.value) {
    case 'bungalo':
      price.min = 0;
      price.placeholder = '0';
      break;
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

capacity.addEventListener('change', function (evt) {
  evt.target.setCustomValidity('');
});

var disableForm = function() {
  for (var i = 0; i < form.inputForm.length; i++) {
    form.inputForm[i].removeAttribute('disabled', 'true')
   }

  for (var i = 0; i < form.selectForm.length; i++) {
    form.selectForm[i].removeAttribute('disabled', 'true')
  }
};

var enableForm = function () {
  adForm.classList.remove('ad-form--disabled');

  for (var i = 0; i < form.inputForm.length; i++) {
    form.inputForm[i].removeAttribute('disabled', 'false');
  };

  for (var i = 0; i < form.selectForm.length; i++) {
    form.selectForm[i].removeAttribute('disabled', 'false');
  };
};

// экспортируем две функции, чтобы использовать их в map.js
window.form = {
  disableForm: disableForm,
  enableForm: enableForm,
  addAdress: addAdress
};

}) ();
