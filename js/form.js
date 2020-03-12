'use strict';

(function () {

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

  var templateSuccess = document.querySelector('template#success');

  var templateError = document.querySelector('template#error');

  var buttomForm = document.querySelector('.ad-form__submit');


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

  var address = adForm.querySelector('#address');

  var renderSuccessPopup = function () {
    var successFragment = templateSuccess.content.querySelector('.success').cloneNode(true);
    return successFragment;
  };

  var renderErrorPopup = function () {
    var errorFragment = templateError.content.querySelector('.error').cloneNode(true);
    return errorFragment;
  };

  var showSuccessPopup = function (popup) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(renderSuccessPopup(popup));
    document.querySelector('main').appendChild(fragment);
    var succesPopup = document.querySelector('.success');
    succesPopup.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 27) {
        var successFragment = template.querySelector('.success');
        successFragment.remove();
      }
    });
    succesPopup.addEventListener('click', function () {
      var successFragment = template.querySelector('.success');
        successFragment.remove();
    });
  };

  var showErrorPopup = function (popup) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(renderErrorPopup(popup));
    document.querySelector('main').appendChild(fragment);
    var errorBtn = document.querySelector('.error');
    errorBtn.addEventListener('click', function () {
      errorBtn.remove();
    });
    errorBtn.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 27) {
        errorBtn.remove();
      }
    });
  };


  adForm.addEventListener('click', function (evt) {
    evt.preventDefault();
    var data = new FormData(adForm);
    window.upload(data, showSuccessPopup, showErrorPopup);
  });

  var addAddress = function (coord) {
    address.value = coord.x + ', ' + coord.y;
  }

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
    });
  }

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

  var disableForm = function () {
    for (var i = 0; i < inputForm.length; i++) {
      inputForm[i].removeAttribute('disabled', 'true')
    }

    for (var i = 0; i < selectForm.length; i++) {
      selectForm[i].removeAttribute('disabled', 'true')
    }
  };

  var enableForm = function () {
    adForm.classList.remove('ad-form--disabled');

    for (var i = 0; i < inputForm.length; i++) {
      inputForm[i].removeAttribute('disabled', 'false');
    };

    for (var i = 0; i < selectForm.length; i++) {
      selectForm[i].removeAttribute('disabled', 'false');
    };
  };



  // экспортируем две функции, чтобы использовать их в map.js
  window.form = {
    disableForm: disableForm,
    enableForm: enableForm,
    addAddress: addAddress
  };

})();
