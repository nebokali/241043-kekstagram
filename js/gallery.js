'use strict';

(function () {
  var pictureTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');
  var pictures = document.querySelector('.pictures');

  var randomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };
  var randomItem = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  var createPhotosArray = function (number) {
    var photos = [];
    for (var j = 0; j < 25; j++) {
      var url = 'photos/' + (j + 1) + '.jpg';
      var newDescriptionText = window.data.descriptionText;
      var descriptionNumber = randomNumber(0, newDescriptionText.length);
      var newCommentText = window.data.commentText;
      var commentsNumber = randomNumber(0, newCommentText.length);

      photos[j] = {
        url: url,
        description: newDescriptionText[descriptionNumber],
        likes: randomNumber(15, 200),
        comments: newCommentText[commentsNumber]
      };
    }
    return photos;
  };

  var fillPhotoData = function (object, template) {
    var objectElement = template.cloneNode(true);
    objectElement.querySelector('.picture__img').src = object.url;
    objectElement.querySelector('.picture__likes').textContent = object.likes;
    objectElement.querySelector('.picture__comments').textContent = object.comments.length;
    objectElement.addEventListener('click', function () {
      window.bigPicture.show(object);
    });
    return objectElement;
  };

  var successHandler = function (gallery) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < 25; i++) {
      fragment.appendChild(fillPhotoData(gallery[i], pictureTemplate));
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
      if (evt.keyCode === windows.data.ESC_KEY && containsError) {
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

  window.backend.load(successHandler, errorHandler);
})();
