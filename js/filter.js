'use strict';
(function () {
  var filterForm = document.querySelector('.map__filters');
  var houseTypeSelect = filterForm.querySelector('#housing-type');

  houseTypeSelect.addEventListener('change', function () {
    var value = houseTypeSelect.value;
    // window.pins.list = document.querySelector('.map__pins').querySelectorAll('.map__pin');
    var filteredPins = window.pins.list.filter(function (it) {
      return it.offer.type === value;
    });
    var uniquePins = filteredPins.filter(function (it, i) {
      return filteredPins.indexOf(it) === i;
    });
    console.log(window.pins.list);
    window.pins.clearPinsList();
    window.pins.renderPinsList(filteredPins);
  });
})();
