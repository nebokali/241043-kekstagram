'use strict';

(function () {
  // Валидация формы

  var buttonUploadSubmit = document.querySelector('#upload-submit');
  var textHashtags = document.querySelector('.text__hashtags');
  var upload = document.querySelector('.img-upload__overlay');
  var inputHash = document.querySelector('.text__hashtags');

  var uploadFileInput = document.querySelector('#upload-file');
  var uploadClose = upload.querySelector('.img-upload__cancel');

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

  var onPopupEscPress = function() {
    upload.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.data.ESC_KEY) {
        closePopup();
      }
    });
  };

  var closePopup = function () {
    if (inputHash !== document.activeElement) {
      upload.classList.add('hidden');
      document.removeEventListener('keydown', onPopupEscPress);
      uploadFileInput.value = '';
    }
  };

  var form = document.querySelector('.img-upload__form');
  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function () {
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
