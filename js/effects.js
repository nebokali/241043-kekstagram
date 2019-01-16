'use strict';

(function () {
  // Слайдер наложения эффектов

  var effectsRadio = document.querySelectorAll('.effects__radio');
  var uploadEffects = document.querySelector('.img-upload__effects');
  var pin = document.querySelector('.effect-level__pin');
  var effectLevel = document.querySelector('.img-upload__effect-level.effect-level');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectLevelValue = document.querySelector('.effect-level__value');
  var imageUploadPreview = document.querySelector('.img-upload__preview img');
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
      imageUploadPreview.style.filter = '';
    } else {
      effectLevel.classList.remove('hidden');
    }

    switch (effectName.value) {
      case 'chrome':
        imageUploadPreview.style.filter = 'filter: grayscale(' + depth / 100 + ');';
        break;
      case 'sepia':
        imageUploadPreview.style.filter = 'filter: sepia(' + depth / 100 + ');';
        break;
      case 'marvin':
        imageUploadPreview.style.filter = 'filter: invert(' + depth + '%);';
        break;
      case 'phobos':
        imageUploadPreview.style.filter = 'filter: blur(' + (3 * depth / 100) + 'px);';
        break;
      case 'heat':
        imageUploadPreview.style.filter = 'filter: brightness(' + (1 + 2 * depth / 100) + ');';
        break;
      default:
        imageUploadPreview.style.filter = '';
        break;
    }
  };

  pin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

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

  var scaleControlSmaller = document.querySelector('.scale__control--smaller');
  var scaleControlBigger = document.querySelector('.scale__control--bigger');
  var scaleControlValue = document.querySelector('.scale__control--value');

  var MIN_VALUE = 25;
  var MAX_VALUE = 100;
  var STEP = 25;

  var getScalePosition = function () {
    var value = scaleControlValue.value;
    return parseInt(value.replace(/\D/, ''), 10);
  };

  var setScalePosition = function (value) {
    scaleControlValue.value = value + '%';
    imageUploadPreview.style.transform = 'scale(' + value / 100 + ' )';
  };

  scaleControlBigger.addEventListener('click', function () {
    var value = getScalePosition();

    if ((value + STEP) < MAX_VALUE) {
      value += STEP;
      setScalePosition(value);
    } else if ((value + STEP) >= MAX_VALUE) {
      setScalePosition(100);
    }
  });

  scaleControlSmaller.addEventListener('click', function () {
    var value = getScalePosition();

    if ((value - STEP) > MIN_VALUE) {
      value -= STEP;
      setScalePosition(value);
    } else if ((value - STEP) <= MAX_VALUE) {
      setScalePosition(25);
    }
  });

  var escPress = function (action) {
    return (function (evt) {
      if (evt.keyCode === window.data.ESC_KEY) {
        action();
      }
    });
  };

  var closeSuccess = function () {
    document.removeEventListener('keydown', onSuccessEscPress);
    document.querySelector('main').removeChild(document.querySelector('main').querySelector('.success'));
  };
  var onSuccessEscPress = escPress(closeSuccess);
  var templateSuccess = document.querySelector('#success')
      .content
      .querySelector('.success');

  var closeError = function () {
    document.removeEventListener('keydown', onErrorEscPress);
    document.querySelector('main').removeChild(document.querySelector('main').querySelector('.error'));
  };
  var onErrorEscPress = escPress(closeError);
  var templateError = document.querySelector('#error')
      .content
      .querySelector('.error');

  window.effects = {
    setSliderPosition: setSliderPosition,

    openSuccess: function () {
      var openedSuccessfully = templateSuccess.cloneNode(true);
      document.querySelector('main').appendChild(openedSuccessfully);
      var button = openedSuccessfully.querySelector('.success__button');

      button.addEventListener('click', function () {
        closeSuccess();
      });

      document.addEventListener('keydown', onSuccessEscPress);
    },

    openError: function () {
      var openedErrorly = templateError.cloneNode(true);
      document.querySelector('main').appendChild(openedErrorly);
      var button = openedErrorly.querySelectorAll('.error__button');

      for (var i = 0; i < button.length; i++) {
        button[i].addEventListener('click', function () {
          closeError();
        });
      }
      document.addEventListener('keydown', onErrorEscPress);
    }
  };
})();
