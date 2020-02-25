'use srtict';

// нажатие на элемент .map__pin-main приводит к вводу страницы в активное состояние
// .map перестает содержать .map--faded
// .ad-form перестает содержать .ad-form--disabled
// у input, select, .ad-form или из родительского элемента fieldset убирается disabled !!! removeAttribute('disabled');
// у .map__filters убирается disabled

(function() {
  for (var i = 0; i < window.inputForm.length; i++) {
  window.inputForm[i].setAttribute('disabled', 'disabled');
  // функция придает свойство disabled к input в форме
};

for (var i = 0; i < window.selectForm.length; i++) {
  window.selectForm[i].setAttribute('disabled', 'disabled');
  // функция придает свойство disabled к select в форме
};

var disabledOff = function () {
  for (var i = 0; i < window.inputForm.length; i++) {
    window.inputForm[i].removeAttribute('disabled', 'false');
  };
  for (var i = 0; i < window.selectForm.length; i++) {
    // функция убирает свойство disabled к input в форме
    window.selectForm[i].removeAttribute('disabled', 'false');
    // функция убирает свойство disabled к select в форме
  };
};

window.openMap = function () {
  window.map.classList.remove('map--faded');
  // у карты убирается класс
};

window.openAdForm = function () {
  window.adForm.classList.remove('ad-form--disabled');
  // разблокируется форма
};
window.mapActive.addEventListener('mousedown', function
  // при клике активируется функция
  () {
    openMap();
    openAdForm();
    disabledOff();
    addAdress();
  });

  window.mapActive.addEventListener('keydown',
  function (evt) {
    if (evt.key === ENTER_KEY) {
      openMap();
      openAdForm();
      disabledOff();
      addAdress();
    }
  });

})();
