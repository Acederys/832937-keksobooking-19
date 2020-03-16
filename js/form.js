'use strict';

(function () {
  var ESC_KEY = 27;

  var addressInput = document.querySelector('#address');

  var type = document.querySelector('#type');

  var price = document.querySelector('#price');

  var timeIn = document.querySelector('#timein');

  var timeOut = document.querySelector('#timeout');

  var roomNumber = document.querySelector('#room_number');

  var roomCapacity = document.querySelector('#capacity');

  var capacityList = roomCapacity.querySelectorAll('option');

  var templateSuccess = document.querySelector('template#success');

  var templateError = document.querySelector('template#error');

  var buttomForm = document.querySelector('.ad-form__submit');
  var map = document.querySelector('.map');

  var roomOptions = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };

  var adForm = document.querySelector('.ad-form');

  var inputForm = adForm.querySelectorAll('input');

  var selectForm = adForm.querySelectorAll('select');

  var address = adForm.querySelector('#address');

  var reset = adForm.querySelector('.ad-form__reset');

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
    var removedPopup = function (evt) {
      if (evt.keyCode === ESC_KEY) {
        document.removeEventListener('keydown', removedPopup)
        succesPopup.remove();
        formReset();
        window.pins.clearPinsList();
        window.map.resetPage();
      };
    };
    var removedClockPopup = function (evt) {
      document.removeEventListener('click', removedPopup)
      succesPopup.remove();
      formReset();
      window.pins.clearPinsList();
      window.map.resetPage();
    };
    document.addEventListener('keydown', removedPopup);
    succesPopup.addEventListener('click', removedClockPopup);
  };

  var formReset = function () {
    adForm.reset();
  };

  var formResetClick = function (evt) {
    evt.preventDefault();
    formReset();
  };

  reset.addEventListener('click', formResetClick);

  var removedErorrKeyPopup = function () {
    document.removeEventListener('click', removedErorrKeyPopup);
    errorBtn.remove();
  };

  var removedErorrPopup = function (evt) {
    if (evt.keyCode === ESC_KEY) {
      document.removeEventListener('keydown', removedErorrPopup);
      errorBtn.remove();
    };
  };

  var showErrorPopup = function (popup) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(renderErrorPopup(popup));
    document.querySelector('main').appendChild(fragment);
    var errorBtn = document.querySelector('.error');
    errorBtn.addEventListener('click', fremovedErorrKeyPopup);
    document.addEventListener('keydown', removedErorrPopup);
  };

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var data = new FormData(adForm);
    window.upload(data, showSuccessPopup, showErrorPopup);
  });

  var addAddress = function (coord) {
    address.value = coord.x + ', ' + coord.y;
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
    });
  };

  calculateGuestsNumber(roomNumber.value);

  roomNumber.addEventListener('change', function (event) {
    calculateGuestsNumber(event.target.value);
  });

  type.addEventListener('change', function (evt) {
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
