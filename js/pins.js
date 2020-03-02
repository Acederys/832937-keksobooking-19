'use strict';
(function () {
    var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');


    var renderPin = function (info) {
      var pinElement = mapPinTemplate.cloneNode(true);

      pinElement.querySelector('img').src = info.author.avatar;
      pinElement.style.left = info.location.x + 'px';
      pinElement.style.top = info.location.y + 'px';
      pinElement.querySelector('img').alt = info.offer.title;
      return pinElement;
    };
    var renderPinsList = function() {
      window.load(function (newArray) {
        var fragment = document.createDocumentFragment();

        for (var i = 0; i < newArray.length; i++) {
          fragment.appendChild(renderPin(newArray[i]));
        }

        document.querySelector('.map__pins').appendChild(fragment);
      });
    };
      window.pins = {
        renderPinsList: renderPinsList
      };
    })();
