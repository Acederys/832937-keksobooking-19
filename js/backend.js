'use strict';
(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';

  var ERROR_NIMBER = 200;

  window.load = function (onSuccess) {
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
    xhr.open('post', URL_UPLOAD);
    xhr.addEventListener('load', function () {
      if (xhr.status === ERROR_NIMBER) {
        onSuccess(xhr.response);
      } else {
        onError(xhr.response);
      }
    });

    xhr.send(data);
  };
})();
