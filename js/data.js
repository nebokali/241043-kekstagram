'use strict';

(function () {
  window.data = {
    commentText: [
      'Всё отлично!',
      'В целом всё неплохо. Но не всё.',
      'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
      'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
      'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
      'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
    ],

    descriptionText: [
      'Тестим новую камеру!',
      'Тестим новую камеру!'
    ],

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

    createArray: function () {
      var photos = [];
      for (var j = 0; j < 25; j++) {
        var url = 'photos/' + (j + 1) + '.jpg';
        var newDescriptionText = window.data.descriptionText;
        var descriptionNumber = window.data.randomNumber(0, newDescriptionText.length);
        var newCommentText = window.data.commentText;
        var commentsNumber = window.data.randomNumber(0, newCommentText.length);

        photos[j] = {
          url: url,
          description: newDescriptionText[descriptionNumber],
          likes: window.data.randomNumber(15, 200),
          comments: newCommentText[commentsNumber]
        };
      }
      return photos;
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
