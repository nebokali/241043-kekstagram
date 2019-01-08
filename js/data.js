'use strict';

(function () {
  window.data = {
    ESC_KEY: 27,

    ENT_KEY: 13,

    addElement: function (elementName, className) {
      var element = document.createElement(elementName);
      element.classList.add(className);
      return element;
    },

    randomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },

    fillData: function (object, template) {
      var objectElement = template.cloneNode(true);
      objectElement.querySelector('.picture__img').src = object.url;
      objectElement.querySelector('.picture__likes').textContent = object.likes;
      objectElement.querySelector('.picture__comments').textContent = object.comments.length;
      objectElement.addEventListener('click', function () {
        window.bigPicture.show(object);
      });
      return objectElement;
    }
  };
})();
