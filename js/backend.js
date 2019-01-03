'use strict';
(function () {
  var DATA_URL = 'https://js.dump.academy/kekstagram/data';
  var URL = 'https://js.dump.academy/kekstagram';
  var TIMEOUT = 10000;
  var SUCCESS_CODE = 200;

  var createRequest = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;
    return xhr;
  };

  window.backend = {
    load: function (onLoad, onError) {
      var loadRequest = createRequest(onLoad, onError);
      loadRequest.open('GET', DATA_URL);
      loadRequest.send();
    },
    save: function (data, onLoad, onError) {
      var saveRequest = createRequest(onLoad, onError);
      saveRequest.open('POST', URL);
      saveRequest.send(data);
    }
  };
})();
