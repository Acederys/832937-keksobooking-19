'use strict';
(function () {
  var filterForm = document.querySelector('.map__filters');
  var houseTypeSelect = filterForm.querySelector('#housing-type');
  var rooms = filterForm.querySelector('#housing-rooms');
  var featuresFieldset = filterForm.querySelector('#housing-features');
  var housingFeatures = featuresFieldset.querySelectorAll('.map__checkbox');
  var filtersForm = document.querySelectorAll('.map__filter');
  var data = [];
  var filteredData = [];
  var filterItems = filterForm.querySelectorAll('select, input');

  filterForm.addEventListener('change', function () {
    var data = searchItems(filtersForm);
    var featuresData = searchItems(housingFeatures, true);
    if (featuresData.length > 0) {
      data.features = featuresData;
    }



    var filteredPins = window.pins.list.filter(function (it) {
      var trueVar = true;
      for (var key in data) {
        if (!Array.isArray(data[key]) && it.offer[key] != data[key]) {

          trueVar = false;
        } else if (Array.isArray(data[key]) && !contains(it.offer[key], data[key])) {
          trueVar = false;
        }
      }
      if (trueVar) {
        return it;
      }
      // return it.offer.type === value;
    });

    window.pins.clearPinsList();
    window.pins.renderPinsList(filteredPins);


  });


  function searchItems(obj, name = false) {
    var data = [];
    for (var i = 0, cnt = obj.length; i < cnt; i++) {
      if (obj[i].tagName === 'INPUT' && obj[i].type === 'checkbox') {
        if (obj[i].checked && name) {
          data.push(obj[i].value);
        }
      } else {
        if (obj[i].value !== 'any') {
          data[obj[i].name.replace(/housing-/g, '')] = obj[i].value;
        }
      }
    }
    return data;
  }

  function contains(where, what) {
    for (var i = 0; i < what.length; i++) {
      if (where.indexOf(what[i]) == -1) return false;
    }
    return true;
  }
})();
