'use strict';

(function () {
  var pictureTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');
  var pictures = document.querySelector('.pictures');
  var main = document.querySelector('main');
  var errorMessage = document.querySelector('#error').content.querySelector('.error');
  var errorTitle = errorMessage.querySelector('.error__title');
  var filters = document.querySelector('.img-filters');
  var filterPopular = document.querySelector('#filter-popular');
  var filterNew = document.querySelector('#filter-new');
  var filterDiscussed = document.querySelector('#filter-discussed');


  var picturesArray = [];
  var picturesNewArray = [];

  var successHandler = function (gallery) {
    picturesArray = gallery;
    renderPictures(gallery);
    picturesNewArray = picturesArray.slice();
  };

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

  var clean = function () {
    var cleanPictures = pictures.querySelectorAll('.picture');
    for (var i = 0; i < cleanPictures.length; i++) {
      pictures.removeChild(cleanPictures[i]);
    }
  };

  var renderPictures = window.debounce(function (gallery) {
    clean();
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < gallery.length; i++) {
      fragment.appendChild(createElementPicture(gallery[i], pictureTemplate));
    }
    pictures.appendChild(fragment);
  });

  var getRandomElements = function (gallery) {
    var galleryArray = [];
    var length = gallery.length - 1;
    for (var i = 0; i < 10; i++) {
      var randomElement = gallery[window.data.randomNumber(0, length)];
      while (galleryArray.indexOf(randomElement) !== -1) {
        randomElement = gallery[window.data.randomNumber(0, length)];
      }
      galleryArray.push(randomElement);
    }
    return galleryArray;
  };

  var createElementPicture = function (object, template) {
    var element = template.cloneNode(true);
    element.querySelector('.picture__img').src = object.url;
    element.querySelector('.picture__likes').textContent = object.likes;
    element.querySelector('.picture__comments').textContent = object.comments.length;

    element.addEventListener('click', function () {
      window.bigPicture.show(object);
    });
    return element;
  };

  filters.classList.remove('img-filters--inactive');

  var changeActiveButton = function (activeButton, otherButton, anotherButton) {
    activeButton.classList.add('img-filters__button--active');
    otherButton.classList.remove('img-filters__button--active');
    anotherButton.classList.remove('img-filters__button--active');
  };

  filterPopular.addEventListener('click', function () {
    renderPictures(picturesArray);
    changeActiveButton(filterPopular, filterNew, filterDiscussed);
  });

  filterNew.addEventListener('click', function () {
    picturesNewArray = getRandomElements(picturesArray);
    renderPictures(picturesNewArray);
    changeActiveButton(filterNew, filterPopular, filterDiscussed);
  });

  filterDiscussed.addEventListener('click', function () {
    picturesNewArray = [];
    picturesNewArray = picturesArray.slice();
    picturesNewArray.sort(function (first, second) {
      if (first.comments < second.comments) {
        return 1;
      } else if (first.comments > second.comments) {
        return -1;
      } else {
        return 0;
      }
    });
    renderPictures(picturesNewArray);
    changeActiveButton(filterDiscussed, filterPopular, filterNew);
  });

  window.gallery = {
    error: errorHandler
  };

  window.backend.getPictures(successHandler, errorHandler);
})();
