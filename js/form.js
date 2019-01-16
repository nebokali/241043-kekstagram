'use strict';

(function () {
  // Валидация формы

  var buttonUploadSubmit = document.querySelector('#upload-submit');
  var textHashtags = document.querySelector('.text__hashtags');
  var upload = document.querySelector('.img-upload__overlay');
  var uploadFileInput = document.querySelector('#upload-file');
  var inputComment = document.querySelector('.text__description');
  var MAX_COMMENT_LENGTH = 140;
  var uploadPreview = document.querySelector('.img-upload__preview img');
  var FILE_TYPES = [
    'gif',
    'jpg',
    'jpeg',
    'png'
  ];
  var buttonCloseUploadImage = document.querySelector('.img-upload__cancel');

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
          textHashtags.classList.add('red-border');
          break;
        } else if ((hashtag.length === 1) && (hashtag === '#')) {
          textHashtags.setCustomValidity('Хэштег не может состоять из одного #');
          textHashtags.classList.add('red-border');
          break;
        } else if ((hashtag.lastIndexOf('#') > 0) && (hashtag.length > 2))  {
          textHashtags.setCustomValidity('Хэштеги необходимо разделять пробелами');
          textHashtags.classList.add('red-border');
          break;
        } else if (hashtags.length > 5) {
          textHashtags.setCustomValidity('Нельзя использовать более пяти хэштегов');
          textHashtags.classList.add('red-border');
          break;
        } else if (hashtag.length > 20) {
          textHashtags.setCustomValidity('Максимальная длина хэштега 20 символов (знак # считается за один символ)');
          textHashtags.classList.add('red-border');
          break;
        } else if (count > 1) {
          textHashtags.setCustomValidity('Хештеги должны быть разными и не повторяться');
          textHashtags.classList.add('red-border');
          break;
        } else {
          textHashtags.setCustomValidity('');
        }
      }
    }
  };

  inputComment.addEventListener('input', function () {
    var comments = inputComment.value;
    if (comments.length > MAX_COMMENT_LENGTH) {
      inputComment.setCustomValidity('Максимальная длина комментария составляет ' + MAX_COMMENT_LENGTH + ' символов');
      inputComment.classList.add('red-border');
    } else {
      inputComment.setCustomValidity('');
    }
  });

  buttonUploadSubmit.addEventListener('click', validateHashtagsForm);

  var loadImage = function (onError) {
    var file = uploadFileInput.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        uploadPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
      openPopup();
    } else {
      onError('Некорректный формат изображения');
      closePopup();
    }
  };

  uploadFileInput.addEventListener('change', function () {
    loadImage(window.gallery.error);
  });

  var scaleControlValue = document.querySelector('.scale__control--value');
  var imageUploadPreview = document.querySelector('.img-upload__preview img');
  var uploadEffects = document.querySelector('.img-upload__effects');
  var effectName = uploadEffects.querySelector('input:checked');
  var MAX_SLIDER_LENGTH = 453;


  var openPopup = function () {
    upload.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    scaleControlValue.value = 100 + '%';
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.data.ESC_KEY) {
      closePopup();
    }
  };

  var closePopup = function () {
    if (textHashtags === document.activeElement || inputComment === document.activeElement) {
      textHashtags.blur();
      inputComment.blur();
    } else {
      upload.classList.add('hidden');
      uploadFileInput.value = '';
      scaleControlValue.value = '';
      textHashtags.value = '';
      inputComment.value = '';
      imageUploadPreview.style.filter = '';
      imageUploadPreview.style.transform = '';
      window.effects.setSliderPosition(MAX_SLIDER_LENGTH);
      textHashtags.classList.remove('red-border');
      effectName.value = '';
      document.removeEventListener('keydown', onPopupEscPress);
    }
  };

  buttonCloseUploadImage.addEventListener('click', function () {
    closePopup(upload);
  });

  var form = document.querySelector('.img-upload__form');

  form.addEventListener('submit', function (evt) {
    window.backend.savePicture(new FormData(form), function () {
      form.reset();
      closePopup();
      window.effects.openSuccess();
    },
    function () {
      form.reset();
      closePopup();
      window.effects.openError();
    });
    evt.preventDefault();
  });
})();
