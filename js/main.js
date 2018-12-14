'use strict';

var randomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};
var pictures = document.querySelector('.pictures');
var bigPicture = document.querySelector('.big-picture');
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var fragment = document.createDocumentFragment();
var commentText = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var descriptionText = [
  'Тестим новую камеру!',
  'Тестим новую камеру!'
];
var avatarNumber = randomNumber(1, 6);
var inputUploadImage = document.querySelector('.img-upload__input');
var overlayUploadImage = document.querySelector('.img-upload__overlay');
var buttonCloseUploadImage = document.querySelector('.img-upload__cancel');
var buttonCloseBigPicture = document.querySelector('.big-picture__cancel');
var bigPictureImage = document.querySelector('.big-picture__img img');
var imageUploadPreview = document.querySelector('.img-upload__preview img');

var addData = function (place, object) {
  place.push(object);
};

// Заполнение галлереи

var photos = [];
for (var j = 0; j < 25; j++) {
  var descriptionNumber = randomNumber(0, descriptionText.length);
  var urlNumber = j + 1;
  var commentsNumber = randomNumber(0, commentText.length);
  var photo = {
    url: 'photos/' + urlNumber + '.jpg',
    descriptionText: descriptionText[descriptionNumber],
    likes: randomNumber(15, 200),
    commentText: commentText[commentsNumber]
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
var fillBigPicture = function (img) {
  bigPicture.querySelector('img').src = photos[img].url;
  bigPicture.querySelector('.likes-count').textContent = randomNumber(15, 200);
  bigPicture.querySelector('.comments-count').textContent = randomNumber(6, 100);
  bigPicture.querySelector('.social__picture').src = 'img/avatar-' + avatarNumber + '.svg';
  bigPicture.querySelector('.social__text').textContent = photos[0].commentText;
  bigPicture.querySelector('.social__caption').textContent = photos[0].descriptionText;
  bigPicture.querySelector('.social__comment-count').classList.add('.visually-hidden');
  bigPicture.querySelector('.comments-loader').classList.add('.visually-hidden');
};

// Открытие и закрытие модальных окон

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
  if (evt.keyCode === 13) {
    closePopup(overlayUploadImage);
  }
});

document.addEventListener('keydown', function (evt) {
  evt.preventDefault();
  if (evt.keyCode === 27 && !overlayUploadImage.classList.contains('hidden')) {
    closePopup(overlayUploadImage);
  }
});

buttonCloseBigPicture.addEventListener('click', function () {
  closePopup(bigPicture);
});

buttonCloseBigPicture.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    closePopup(bigPicture);
  }
});

document.addEventListener('keydown', function (evt) {
  evt.preventDefault();
  if (evt.keyCode === 27 && !bigPicture.classList.contains('hidden')) {
    closePopup(bigPicture);
  }
});

// Открытие модального окна с фотографией

var showBigPicture = function (selectedPicture, pictureUrl, pictureNumber) {
  selectedPicture.addEventListener('click', function (evt) {
    evt.preventDefault();
    bigPicture.classList.remove('hidden');
    bigPictureImage.src = 'photos/' + pictureUrl + '.jpg';
    fillBigPicture(pictureNumber);
  });
};

for (var k = 0; k < picture.length; k++) {
  showBigPicture(picture[k], (k + 1), k);
  bigPicture.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      closePopup(bigPicture);
    }
  });
}

// Эффекты обработки фото

var effectsRadio = document.querySelectorAll('.effects__radio');

for (var l = 0; l < effectsRadio.length; l++) {
  effectsRadio[l].addEventListener('change', function (evt) {
    evt.preventDefault();
    var effectNumber = evt.target.value;
    imageUploadPreview.className = 'effects__preview--' + effectNumber;
    if (imageUploadPreview.classList.contains('effects__preview--')) {
      imageUploadPreview.classList.remove('effects__preview--');
    }
  });
}
