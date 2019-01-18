'use strict';

(function () {
  var scaleControlSmaller = document.querySelector('.scale__control--smaller');
  var scaleControlBigger = document.querySelector('.scale__control--bigger');
  var scaleControlValue = document.querySelector('.scale__control--value');

  var imageUploadPreview = document.querySelector('.img-upload__preview img');

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
})();
