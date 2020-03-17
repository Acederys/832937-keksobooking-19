'use strict';
(function () {
  var filterForm = document.querySelector('.map__filters');
  var featuresFieldset = filterForm.querySelector('#housing-features');
  var housingFeatures = featuresFieldset.querySelectorAll('.map__checkbox');
  var filtersForm = document.querySelectorAll('.map__filter');

  var priceArr = {
    'middle': {
      'min': 10000,
      'max': 50000
    },
    'low': {
      'max': 10000
    },
    'high': {
      'min': 50000
    }
  };

  var priceRen = function (priceItem, priceName) {
    if (priceArr[priceName].min && priceArr[priceName].max) {
      if (priceArr[priceName].min < priceItem && priceItem < priceArr[priceName].max) {
        return true;
      }
      return false;
    } else if (priceArr[priceName].max) {
      if (priceItem < priceArr[priceName].max) {
        return true;
      }
      return false;
    } else if (priceArr[priceName].min) {
      if (priceItem > priceArr[priceName].min) {
        return true;
      }
      return false;
    }
  };

  var onChangeFilterFormDebounced = window.debounce(function () {
    var data = searchItems(filtersForm);
    var featuresData = searchItems(housingFeatures, true);
    if (featuresData.length > 0) {
      data.features = featuresData;
    }
    var filteredPins = window.pins.list.filter(function (it) {
      var trueVar = true;
      for (var key in data) {
        if (key === 'price' && !priceRen(it.offer[key], data[key])) {
          trueVar = false;
        }
        if (!Array.isArray(data[key]) && it.offer[key] != data[key] && key !== 'price') {
          trueVar = false;
        }
        if (Array.isArray(data[key]) && !contains(it.offer[key], data[key])) {
          trueVar = false;
        }
      }
      if (trueVar) {
        return it;
      }
    });

    window.pins.clearPinsList();
    window.pins.renderPinsList(filteredPins);
  });

  filterForm.addEventListener('change', function () {
    onChangeFilterFormDebounced();
  });


  function searchItems(obj, name) {
    if (name !== true){
      name = false;
    }
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
