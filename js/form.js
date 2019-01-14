'use strict';

(function () {
  // Валидация формы

  var buttonUploadSubmit = document.querySelector('#upload-submit');
  var textHashtags = document.querySelector('.text__hashtags');
  var upload = document.querySelector('.img-upload__overlay');
  var uploadFileInput = document.querySelector('#upload-file');
  var inputComment = document.querySelector('.text__description');
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

  var openPopup = function () {
    upload.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var onPopupEscPress = function () {
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.data.ESC_KEY) {
        closePopup();
      }
    });
  };

  var closePopup = function () {
    if (textHashtags === document.activeElement || inputComment === document.activeElement) {
      textHashtags.blur();
      inputComment.blur();
    } else {
      upload.classList.add('hidden');
      uploadFileInput.value = '';
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
