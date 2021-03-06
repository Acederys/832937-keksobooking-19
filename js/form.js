'use strict';

(function () {
  var ESC_KEY = 27;

  var type = document.querySelector('#type');

  var price = document.querySelector('#price');

  var timeIn = document.querySelector('#timein');

  var timeOut = document.querySelector('#timeout');

  var roomNumber = document.querySelector('#room_number');

  var roomCapacity = document.querySelector('#capacity');

  var capacityList = roomCapacity.querySelectorAll('option');

  var templateSuccess = document.querySelector('template#success');

  var templateError = document.querySelector('template#error');

  var roomOptions = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };

  var adForm = document.querySelector('.ad-form');

  var inputForm = adForm.querySelectorAll('input');

  var fieldForm = adForm.querySelectorAll('fieldset');


  var selectForm = adForm.querySelectorAll('select');

  var address = adForm.querySelector('#address');

  var reset = adForm.querySelector('.ad-form__reset');
  var errorBtn;
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
    var successPopup = document.querySelector('.success');
    var removedPopup = function (evt) {
      if (evt.keyCode === ESC_KEY) {
        document.removeEventListener('keydown', removedPopup);
        successPopup.remove();
        formReset();
        window.pins.clearPinsList();
        window.map.resetPage();
        window.card.deleteCard();
      }
    };
    var removedClockPopup = function () {
      document.removeEventListener('click', removedPopup);
      successPopup.remove();
      formReset();
      window.pins.clearPinsList();
      window.map.resetPage();
    };
    document.addEventListener('keydown', removedPopup);
    successPopup.addEventListener('click', removedClockPopup);
  };

  var formReset = function () {
    adForm.reset();
    roomCapacity.value = getPlaceholderGuest(roomNumber.value);
    window.map.resetPage();
    window.pins.clearPinsList();
    disableForm();
    window.filter.disableFilter();
  };

  var formResetClick = function (evt) {
    evt.preventDefault();
    formReset();
    window.card.deleteCard();
  };

  reset.addEventListener('click', formResetClick);

  var removedErrorKeyPopup = function () {
    document.removeEventListener('click', removedErrorKeyPopup);
    if (errorBtn) {
      errorBtn.remove();
    }
  };

  var removedErrorPopup = function (evt) {
    if (evt.keyCode === ESC_KEY) {
      document.removeEventListener('keydown', removedErrorPopup);
      if (errorBtn) {
        errorBtn.remove();
      }
    }
  };

  var showErrorPopup = function (popup) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(renderErrorPopup(popup));
    document.querySelector('main').appendChild(fragment);
    errorBtn = document.querySelector('.error');
    errorBtn.addEventListener('click', removedErrorKeyPopup);
    document.addEventListener('keydown', removedErrorPopup);
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


  var getPlaceholderGuest = function (roomNumberValue) {
    switch (roomNumberValue) {
      case '1':
        return 1;
      case '2':
        return 2;
      case '3':
        return 3;
    }
    return 0;
  };

  var getPlaceholderPrice = function (typeValue) {
    switch (typeValue) {
      case 'bungalo':
        return 0;
      case 'flat':
        return 1000;
      case 'house':
        return 5000;
      case 'palace':
        return 10000;
    }
    return 0;
  };

  price.placeholder = getPlaceholderPrice(type.value);

  price.addEventListener('change', function (evt) {
    var target = evt.target;
    if (target.value < getPlaceholderPrice(type.value)) {
      price.setCustomValidity('миниально' + getPlaceholderPrice(type.value));
    } else {
      price.setCustomValidity('');
    }
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
        price.placeholder = '10000';
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

  roomCapacity.addEventListener('change', function (evt) {
    evt.target.setCustomValidity('');
  });

  var disableForm = function () {
    for (var i = 0; i < inputForm.length; i++) {
      inputForm[i].setAttribute('disabled', 'true');
    }

    for (var j = 0; j < selectForm.length; j++) {
      selectForm[j].setAttribute('disabled', 'true');
    }

    for (var k = 0; k < fieldForm.length; k++) {
      fieldForm[k].setAttribute('disabled', 'true');
    }
  };

  var enableForm = function () {
    adForm.classList.remove('ad-form--disabled');

    for (var i = 0; i < inputForm.length; i++) {
      inputForm[i].removeAttribute('disabled', 'false');
    }

    for (var j = 0; j < selectForm.length; j++) {
      selectForm[j].removeAttribute('disabled', 'false');
    }
    for (var k = 0; k < fieldForm.length; k++) {
      fieldForm[k].removeAttribute('disabled', 'true');
    }
  };
  // экспортируем две функции, чтобы использовать их в map.js
  window.form = {
    disableForm: disableForm,
    enableForm: enableForm,
    addAddress: addAddress
  };

})();
