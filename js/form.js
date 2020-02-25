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
  window.calculateGuestsNumber = function (value) {
    window.capacityList.forEach(function (option) {
    option.disabled = true;
  });

  window.roomOptions[value].forEach(function (it) {
    window.capacityList.forEach(function (opt) {
      if (Number(opt.value) === it) {
        opt.disabled = false;
        opt.selected = true;
      }
  });
});}

calculateGuestsNumber(roomNumber.value);

window.roomNumber.addEventListener('change', function (event) {
  calculateGuestsNumber(event.target.value);
})

window.type.addEventListener('change', function (evt) {
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

window.timeIn.addEventListener('change', function (evt) {
  // при задании времени вьезда задается время вызда
  timeOut.value = evt.target.value;
});

window.timeOut.addEventListener('change', function (evt) {
  // при задании времени задается вызда время вьезда
  timeIn.value = evt.target.value;
});

window.capacity.addEventListener('change', function (evt) {
  evt.target.setCustomValidity('');
});

}) ();
