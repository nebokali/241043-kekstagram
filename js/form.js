'use strict';

(function () {
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
})();
