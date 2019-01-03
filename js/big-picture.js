'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');

  var randomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  var avatarNumber = randomNumber(1, 6);

  var fillBigPicture = function (img) {
    bigPicture.querySelector('img').src = window.photos[img].url;
    bigPicture.querySelector('.likes-count').textContent = randomNumber(15, 200);
    bigPicture.querySelector('.comments-count').textContent = randomNumber(6, 100);
    bigPicture.querySelector('.social__picture').src = 'img/avatar-' + avatarNumber + '.svg';
    bigPicture.querySelector('.social__text').textContent = window.photos[0].commentText;
    bigPicture.querySelector('.social__caption').textContent = window.photos[0].descriptionText;
    bigPicture.querySelector('.social__comment-count').classList.add('.visually-hidden');
    bigPicture.querySelector('.comments-loader').classList.add('.visually-hidden');
  };

  // Открытие и закрытие модальных окон

  var inputUploadImage = document.querySelector('.img-upload__input');
  var overlayUploadImage = document.querySelector('.img-upload__overlay');
  var buttonCloseUploadImage = document.querySelector('.img-upload__cancel');
  var buttonCloseBigPicture = document.querySelector('.big-picture__cancel');
  var bigPictureImage = document.querySelector('.big-picture__img img');

  var picture = document.querySelectorAll('.picture');

  inputUploadImage.addEventListener('change', function () {
    overlayUploadImage.classList.remove('hidden');
  });

  var closePopup = function (modal) {
    modal.classList.add('hidden');
  };

  buttonCloseUploadImage.addEventListener('click', function () {
    closePopup(overlayUploadImage);
  });

  buttonCloseUploadImage.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.data.ENT_KEY) {
      closePopup(overlayUploadImage);
    }
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.data.ESC_KEY && !overlayUploadImage.classList.contains('hidden')) {
      closePopup(overlayUploadImage);
    }
  });

  buttonCloseBigPicture.addEventListener('click', function () {
    closePopup(bigPicture);
  });

  buttonCloseBigPicture.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.data.ENT_KEY) {
      closePopup(bigPicture);
    }
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.data.ESC_KEY && !bigPicture.classList.contains('hidden')) {
      closePopup(bigPicture);
    }
  });

  // Открытие модального окна с фотографией

  var commentsList = bigPicture.querySelector('.social__comments');
  var createComment = function (pictures) {
    var elementLi = window.data.addElement('li', 'social__comment');
    var imgSocialPicture = window.data.addElement('img', 'social__picture');
    imgSocialPicture.src = pictures.avatar;
    imgSocialPicture.alt = 'Аватар комментатора фотографии';
    imgSocialPicture.width = '35';
    imgSocialPicture.height = '35';
    elementLi.appendChild(imgSocialPicture);
    var socialText = window.data.addElement('p', 'social__text');
    socialText.textContent = pictures.message;
    elementLi.appendChild(socialText);

    return elementLi;
  };

  var renderComments = function (pictures) {
    commentsList.innerHTML = '';
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 5; i++) {
      fragment.appendChild(createComment(pictures[i]));
    }
    commentsList.appendChild(fragment);
  };


  var showBigPicture = function (selectedPicture) {
    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.big-picture__img img').src = selectedPicture.url;
    bigPicture.querySelector('.likes-count').textContent = selectedPicture.likes;
    bigPicture.querySelector('.comments-count').textContent = selectedPicture.comments.length;
    renderComments(selectedPicture.comments);
    bigPicture.querySelector('.social__caption').textContent = selectedPicture.description;
    bigPicture.querySelector('.social__comment-count').classList.add('.visually-hidden');
    bigPicture.querySelector('.comments-loader').classList.add('.visually-hidden');
  };

  window.bigPicture = {
    show: showBigPicture
  };
})();
