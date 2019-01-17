'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var buttonCloseBigPicture = document.querySelector('.big-picture__cancel');
  var commentsList = bigPicture.querySelector('.social__comments');
  var COMMENTS_LOAD_AMOUNT = 5;
  var commentsLoader = bigPicture.querySelector('.comments-loader');
  var commentsLeft;
  var commentsObject = {};

  var closePopup = function () {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    buttonCloseBigPicture.removeEventListener('keydown', onButtonCloseEntPress);
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.data.ESC_KEY && !bigPicture.classList.contains('hidden')) {
      closePopup();
    }
  };

  var onButtonClosePress = function () {
    buttonCloseBigPicture.onclick = function() {
      closePopup();
    }
  };

  var onButtonCloseEntPress = function (evt) {
    if (evt.keyCode === window.data.ENT_KEY) {
      closePopup();
    }
  };

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

  var getCommentsAmount = function (currentCommentsNumber, totalCommentsNumber) {
    bigPicture.querySelector('.social__comment-count').textContent = currentCommentsNumber + ' из '
      + totalCommentsNumber + ' комментариев';
  };

  var renderComments = function (pictures) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pictures.length; i++) {
      fragment.appendChild(createComment(pictures[i]));
    }
    commentsList.appendChild(fragment);
    getCommentsAmount(commentsObject.currentCommentsNumber, commentsObject.totalCommentsNumber);
  };

  var updateComments = function (comments) {
    if (comments.length > COMMENTS_LOAD_AMOUNT) {
      commentsLoader.classList.remove('hidden');
      commentsObject.currentCommentsNumber = commentsObject.totalCommentsNumber - comments.length + COMMENTS_LOAD_AMOUNT;
      return comments.splice(0, COMMENTS_LOAD_AMOUNT);
    }
    commentsLoader.classList.add('hidden');
    commentsObject.currentCommentsNumber = commentsObject.totalCommentsNumber;
    return comments.splice(0, comments.length);
  };

  var loadComments = function () {
    renderComments(updateComments(commentsLeft));
  };

  commentsLoader.addEventListener('click', loadComments);

  var showBigPicture = function (selectedPicture) {
    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.big-picture__img img').src = selectedPicture.url;
    bigPicture.querySelector('.likes-count').textContent = selectedPicture.likes;
    bigPicture.querySelector('.social__caption').textContent = selectedPicture.description;
    commentsLeft = selectedPicture.comments.slice(0);
    commentsObject.totalCommentsNumber = commentsLeft.length;
    commentsList.innerHTML = '';
    renderComments(updateComments(commentsLeft));
    document.addEventListener('keydown', onPopupEscPress);
    buttonCloseBigPicture.addEventListener('click', onButtonClosePress);
    buttonCloseBigPicture.addEventListener('keydown', onButtonCloseEntPress);
  };

  window.bigPicture = {
    show: showBigPicture
  };
})();
