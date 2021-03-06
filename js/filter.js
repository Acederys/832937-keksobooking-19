'use strict';
(function () {
  var filterForm = document.querySelector('.map__filters');
  var featuresFieldset = filterForm.querySelector('#housing-features');
  var housingFeatures = featuresFieldset.querySelectorAll('.map__checkbox');
  var filtersForm = document.querySelectorAll('.map__filter');
  var filterContains = document.querySelector('.map__filters');
  var filterInputs = filterContains.querySelectorAll('input');
  var filterSelects = filterContains.querySelectorAll('select');

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
    return false;
  };

  var onChangeFilterFormDebounced = window.debounce(function () {
    var data = searchItems(filtersForm);
    var featuresData = searchItems(housingFeatures, true);
    if (featuresData.length > 0) {
      data.features = featuresData;
    }

    var filteredPins = window.pins.list.filter(function (it) {
      var
        verification = true;
      for (var key in data) {
        if (key && data) {
          if (key === 'price' && !priceRen(it.offer[key], data[key])) {

            verification = false;
          }
          if (!Array.isArray(data[key]) && key !== 'price') {
            if (typeof it.offer[key] === 'number') {
              if (it.offer[key] !== Number(data[key])) {
                verification = false;
              }
            } else {
              if (it.offer[key] !== data[key]) {

                verification = false;
              }
            }
          }
          if (Array.isArray(data[key]) && !contains(it.offer[key], data[key])) {

            verification = false;
          }
        }
      }
      if (
        verification) {
        return it;
      }
      return false;
    });

    window.pins.clearPinsList();
    window.pins.renderPinsList(filteredPins);
    window.card.deleteCard();
  });

  filterForm.addEventListener('change', function () {
    onChangeFilterFormDebounced();
  });


  var searchItems = function (obj, name) {
    if (!name) {
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
  };

  var contains = function (where, what) {
    for (var i = 0; i < what.length; i++) {
      if (where.indexOf(what[i]) === -1) {
        return false;
      }
    }
    return true;
  };
  var disableFilter = function () {
    for (var i = 0; i < filterInputs.length; i++) {
      filterInputs[i].setAttribute('disabled', 'true');
    }

    for (var a = 0; a < filterSelects.length; a++) {
      filterSelects[a].setAttribute('disabled', 'true');
    }
  };

  var enableFilter = function () {

    for (var i = 0; i < filterInputs.length; i++) {
      filterInputs[i].removeAttribute('disabled', 'false');
    }

    for (var a = 0; a < filterSelects.length; a++) {
      filterSelects[a].removeAttribute('disabled', 'false');
    }
  };

  window.filter = {
    disableFilter: disableFilter,
    enableFilter: enableFilter
  };
})();
