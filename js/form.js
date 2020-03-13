'use strict';

(function () {

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

  var mainPin = map.querySelector('.map__pin--main');
  var mainPinLeft = getComputedStyle(mainPin).left;
  var mainPinTop = getComputedStyle(mainPin).top;

  var setMainPinCoords = function () {
    mainPin.style.left = mainPinLeft;
    mainPin.style.top = mainPinTop;
  };

  var renderSuccessPopup = function () {
    var successFragment = templateSuccess.content.querySelector('.success').cloneNode(true);
    return successFragment;
  };

  var renderErrorPopup = function () {
    var errorFragment = templateError.content.querySelector('.error').cloneNode(true);
    return errorFragment;
  };

  var dellPage = function(){
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
  };

  var showSuccessPopup = function (popup) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(renderSuccessPopup(popup));
    document.querySelector('main').appendChild(fragment);
    var succesPopup = document.querySelector('.success');
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 27) {
        succesPopup.remove();
        formReset();
        window.pins.clearPinsList();
        setMainPinCoords();
        dellPage();
      }
    });
    succesPopup.addEventListener('click', function () {
      succesPopup.remove();
      formReset();
      window.pins.clearPinsList();
      setMainPinCoords();
      dellPage();
    });
  };

  var formReset = function() {
    adForm.reset();
  };

  reset.addEventListener('click', function (evt) {
    evt.preventDefault();
    formReset();
  });

  var formOk = function () {
    errorBtn.remove();
  };
  var showErrorPopup = function (popup) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(renderErrorPopup(popup));
    document.querySelector('main').appendChild(fragment);
    var errorBtn = document.querySelector('.error');
    errorBtn.addEventListener('click', formOk());
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 27) {
        formOk();
      }
    });
  };


  adForm.addEventListener('submit', function (evt) {
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
