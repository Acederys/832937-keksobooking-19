'use strict';
(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var URLUPLOAD = 'https://js.dump.academy/keksobooking';
  var template = document.querySelector('template');
  var success = template.querySelector('#success');
  var error = template.querySelector('#error');
  var main = document.querySelector('main');
  var map = document.querySelector('.map');
  var StatusCode = {
    OK: 200
  };

   var URLload = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', URL);

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    xhr.send();
  };
  var URLupload = function(onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('POST', URL);

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
        var OKElement = success.cloneNode(true);
        map.appendChild(OKElement);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      var ErrorElement = error.cloneNode(true);
        main.appendChild(ErrorElement);
      var closeBtn = cardElement.querySelector('.error__button');
    mapFilterContainr.insertAdjacentElement('beforebegin', cardElement);
    var close = function () {
      cardElement.remove();
      closeBtn.removeEventListener('click', onCloseBtnClick);
    };
    var onCloseBtnClick = function () {
      close();
    };
    closeBtn.addEventListener('click', onCloseBtnClick);
    });

    xhr.addEventListener('timeout', function () {
      var ErrorElement = error.cloneNode(true);
        main.appendChild(ErrorElement);
      var closeBtn = cardElement.querySelector('.error__button');
    mapFilterContainr.insertAdjacentElement('beforebegin', cardElement);
    var close = function () {
      cardElement.remove();
      closeBtn.removeEventListener('click', onCloseBtnClick);
    };
    var onCloseBtnClick = function () {
      close();
    };
    closeBtn.addEventListener('click', onCloseBtnClick);
    });
    xhr.send();
  };

  window.load = {
    URLload: URLload,
    URLupload: URLupload
  };

})();
