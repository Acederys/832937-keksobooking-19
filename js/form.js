'use srtict';
// В случае выбора количества комнат, менялся список опций у гостей
// потребуется такой хитрый объект
// он делает соответствие между кол-вом гостей и кол-вом комнат для них



// нажатие на элемент .map__pin-main приводит к вводу страницы в активное состояние
// .map перестает содержать .map--faded
// .ad-form перестает содержать .ad-form--disabled
// у input, select, .ad-form или из родительского элемента fieldset убирается disabled !!! removeAttribute('disabled');
// у .map__filters убирается disabled

window.form = (function() {
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


var inputForm = window.map.adForm.querySelectorAll('input');
console.log(inputForm);

// переменная содержит input находящиеся внутри формы обьявления

var selectForm = window.map.adForm.querySelectorAll('select');
console.log(selectForm);

// переменная содержит select внутри формы обьявления

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

// var disableForm = function() {
//   for (var i = 0; i < form.inputForm.length; i++) {
//     form.inputForm[i].removeAttribute('disabled', 'false')
//    }

//   for (var i = 0; i < form.selectForm.length; i++) {
//     form.selectForm[i].removeAttribute('disabled', 'false')
//   }
// };

window.disabledOff = function () {
  for (var i = 0; i < form.inputForm.length; i++) {
    form.inputForm[i].removeAttribute('disabled', 'false');
  };
  for (var i = 0; i < form.selectForm.length; i++) {
    // функция убирает свойство disabled к input в форме
    form.selectForm[i].removeAttribute('disabled', 'false');
    // функция убирает свойство disabled к select в форме
  };
};

window.form = {
  addressInput: addressInput,
  type: type,
  price: price,
  timeIn: timeIn,
  timeOut: timeOut,
  roomNumber: roomNumber,
  roomCapacity: roomCapacity,
  capacityList: capacityList,
  roomOptions: roomOptions,
  inputForm: inputForm,
  selectForm: selectForm,
  // disableForm: disableForm,
  disabledOff: disabledOff
};

}) ();
