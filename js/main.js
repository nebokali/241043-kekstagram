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
var ESC_KEY = 27;
var ENT_KEY = 13;

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
  if (evt.keyCode === ENT_KEY) {
    closePopup(overlayUploadImage);
  }
});

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEY && !overlayUploadImage.classList.contains('hidden')) {
    closePopup(overlayUploadImage);
  }
});

buttonCloseBigPicture.addEventListener('click', function () {
  closePopup(bigPicture);
});

buttonCloseBigPicture.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENT_KEY) {
    closePopup(bigPicture);
  }
});

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEY && !bigPicture.classList.contains('hidden')) {
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
    if (evt.keyCode === ESC_KEY) {
      closePopup(bigPicture);
    }
  });
}

// Валидация формы

var buttonUploadSubmit = document.querySelector('#upload-submit');
var textHashtags = document.querySelector('.text__hashtags');

var validateHashtagsForm = function () {
  var hashtags = textHashtags.value.split(/[\s]+/);
  for (var n = 0; n < hashtags.length; n++) {
    var hashtag = hashtags[n];
    if (hashtag !== '') {
      var count = 0;
      for (var m = 0; m < hashtags.length; m++) {
        if (hashtag.toLowerCase() === hashtags[m].toLowerCase()) {
          count++;
        }
      }
      if (hashtag.charAt(0) !== '#') {
        textHashtags.setCustomValidity('Хэштег должен начинаться с #');
        break;
      } else if (hashtag === '#') {
        textHashtags.setCustomValidity('Хэштег не может состоять из одного #');
        break;
      } else if (hashtag.lastIndexOf('#') > 0) {
        textHashtags.setCustomValidity('Хэштеги необходимо разделять пробелами');
        break;
      } else if (hashtags.length > 5) {
        textHashtags.setCustomValidity('Нельзя использовать более пяти хэштегов');
        break;
      } else if (hashtag.length > 20) {
        textHashtags.setCustomValidity('Максимальная длина хэштега 20 символов (знак # считается за один символ)');
        break;
      } else if (count > 1) {
        textHashtags.setCustomValidity('Хештеги должны быть разными и не повторяться');
        break;
      } else {
        textHashtags.setCustomValidity('');
      }
    }
  }
};

buttonUploadSubmit.addEventListener('click', validateHashtagsForm);

// Слайдер наложения эффектов

var effectsRadio = document.querySelectorAll('.effects__radio');
var uploadEffects = document.querySelector('.img-upload__effects');
var pin = document.querySelector('.effect-level__pin');
var effectLevel = document.querySelector('.img-upload__effect-level.effect-level');
var effectLevelDepth = document.querySelector('.effect-level__depth');
var effectLevelValue = document.querySelector('.effect-level__value');
var MAX_SLIDER_LENGTH = 453;

for (var l = 0; l < effectsRadio.length; l++) {
  effectsRadio[l].addEventListener('change', function (evt) {
    evt.preventDefault();
    var effectName = uploadEffects.querySelector('input:checked');
    imageUploadPreview.className = 'effects__preview--' + effectName.value;
    if (imageUploadPreview.classList.contains('effects__preview--')) {
      imageUploadPreview.classList.remove('effects__preview--');
    }
  });
}

var setSliderPosition = function (start) {
  var effectName = uploadEffects.querySelector('input:checked');
  var depth = Math.floor(100 * start / MAX_SLIDER_LENGTH);

  pin.style.left = start + 'px';
  effectLevelDepth.style.width = depth + '%';
  effectLevelValue.value = depth;

  if (effectName.value === 'none') {
    effectLevel.classList.add('hidden');
    imageUploadPreview.style = '';
  } else {
    effectLevel.classList.remove('hidden');
  }

  if (effectName.value === 'chrome') {
    imageUploadPreview.style = 'filter: grayscale(' + depth / 100 + ');';
  } else if (effectName.value === 'sepia') {
    imageUploadPreview.style = 'filter: sepia(' + depth / 100 + ');';
  } else if (effectName.value === 'marvin') {
    imageUploadPreview.style = 'filter: invert(' + depth + '%);';
  } else if (effectName.value === 'phobos') {
    imageUploadPreview.style = 'filter: blur(' + (3 * depth / 100) + 'px);';
  } else if (effectName.value === 'heat') {
    imageUploadPreview.style = 'filter: brightness(' + (1 + 2 * depth / 100) + ');';
  }
};

pin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    dragged = true;

    var shift = {
      x: startCoords.x - moveEvt.clientX
    };

    startCoords = {
      x: moveEvt.clientX
    };

    var pinMove = pin.offsetLeft - shift.x;

    if ((pinMove > 0) && (pinMove <= MAX_SLIDER_LENGTH)) {
      setSliderPosition(pinMove);
    }
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

setSliderPosition(MAX_SLIDER_LENGTH);

uploadEffects.addEventListener('change', function () {
  setSliderPosition(MAX_SLIDER_LENGTH);
});
