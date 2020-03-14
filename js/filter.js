'use strict';
(function () {
  var filterForm = document.querySelector('.map__filters');
  var houseTypeSelect = filterForm.querySelector('#housing-type');
  var housed = filterForm.querySelector('#housing-price');

  houseTypeSelect.addEventListener('change', function () {
    var value = houseTypeSelect.value;
    var filteredPins = window.pins.list.filter(function (it) {
      return it.offer.type === value;
    });
    var uniquePins = filteredPins.filter(function (it, i) {
      return filteredPins.indexOf(it) === i;
    });
    window.pins.clearPinsList();
    window.pins.renderPinsList(filteredPins);
  });
})();
