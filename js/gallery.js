'use strict';

(function () {
  var pictures = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var fragment = document.createDocumentFragment();

  var randomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };
  var addData = function (place, object) {
    place.push(object);
  };

  var newCommentText = window.data.commentText;
  var newDescriptionText = window.data.descriptionText;

  var photos = [];
  for (var j = 0; j < 25; j++) {
    var descriptionNumber = randomNumber(0, newDescriptionText.length);
    var urlNumber = j + 1;
    var commentsNumber = randomNumber(0, newCommentText.length);
    var photo = {
      url: 'photos/' + urlNumber + '.jpg',
      descriptionText: newDescriptionText[descriptionNumber],
      likes: randomNumber(15, 200),
      commentText: newCommentText[commentsNumber]
    };
    addData(photos, photo);
  }

  var fillPhotoData = function (place, object) {
    object.querySelector('.picture__img').src = place[i].url;
    object.querySelector('.picture__likes').textContent = randomNumber(15, 200);
    object.querySelector('.picture__comments').textContent = randomNumber(6, 100);
    fragment.appendChild(object);
  };

  for (var i = 0; i < photos.length; i++) {
    var photoElement = pictureTemplate.cloneNode(true);
    fillPhotoData(photos, photoElement);
  }

  pictures.appendChild(fragment);

  window.photos = photos;
})();
