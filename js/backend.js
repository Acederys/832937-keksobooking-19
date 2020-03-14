'use strict';
(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var URLupload = 'https://js.dump.academy/keksobooking';
  var DEBOUNCE_INTERVAL = 300;

  window.loadJson = false;
  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', URL);

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    xhr.send();
  };

  window.upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('post', URLupload);
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError(xhr.response);
      }
    });

    xhr.send(data);
  };
})();
