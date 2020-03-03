'use strict';
(function() {
var filterForm = document.querySelector('.map__filters');
var houseTypeSelect = filterForm.querySelector('#housing-type');

houseTypeSelect.addEventListener('change', function(){
    var value = houseTypeSelect.value;
    window.pins.list = document.querySelector('.map__pins').querySelectorAll('.map__pin');
    var filteredPins = window.pins.list.filter(function(it){
    return it.type === value;
    };
    var uniquePins =
    filteredPins.filter(function (it, i) {
      return filteredPins.indexOf(it) === i;
    });
    window.render(uniquePins);
  });
  console.log(window.pins.list);
  window.ProcessingInstruction.clearPinsList();
  window.pins.renderRinsList(filteredPins);
});
})();
