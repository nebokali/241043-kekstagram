'use strict';

(function () {
  var pictureTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');
  var pictures = document.querySelector('.pictures');

  var successHandler = function (gallery) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < 25; i++) {
      fragment.appendChild(window.data.fillData(gallery[i], pictureTemplate));
    }
    pictures.appendChild(fragment);
  };

  var main = document.querySelector('main');
  var errorMessage = document.querySelector('#error').content.querySelector('.error');
  var errorTitle = errorMessage.querySelector('.error__title');

  var errorHandler = function (error) {
    var errorButton = errorMessage.querySelector('.error__button');
    var containsError = true;

    main.appendChild(errorMessage);
    errorTitle.textContent = error;

    errorButton.addEventListener('click', function () {
      if (containsError) {
        main.removeChild(errorMessage);
        containsError = false;
      }
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.data.ESC_KEY && containsError) {
        main.removeChild(errorMessage);
        containsError = false;
      }
    });

    document.addEventListener('click', function (evt) {
      var target = evt.target;
      if (!target.classList.contains('error__inner') && containsError) {
        main.removeChild(errorMessage);
        containsError = false;
      }
    });
  };

  window.backend.getPictures(successHandler, errorHandler);
})();
