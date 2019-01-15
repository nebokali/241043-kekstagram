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
    }
  };
})();
