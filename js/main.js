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

var photos = [];

for (var i = 0; i < photos.length; i++) {
  var photoElement = pictureTemplate.cloneNode(true);

  photoElement.querySelector('.picture__img').src = photos[i].url;

  var likesNumber = randomNumber(15, 200);

  photoElement.querySelector('.picture__likes').textContent = likesNumber;

  photoElement.querySelector('.picture__comments').textContent = photos[i].commentText;

  fragment.appendChild(photoElement);
}

for (var j = 0; j < 25; j++) {

  var descriptionNumber = randomNumber(0, descriptionText.length);

  var urlNumber = j + 1;

  var commentsNumber = randomNumber(0, commentText.length);

  var photo = {
    url: 'photos/' + urlNumber + '.jpg',
    descriptionText: descriptionText[descriptionNumber],
    likes: likesNumber,
    commentText: commentText[commentsNumber]
  };

  photos.push(photo);
}

pictures.appendChild(fragment);

bigPicture.classList.remove('hidden');

bigPicture.querySelector('img').src = photos[1].url;

bigPicture.querySelector('.likes-count').textContent = photos[0].likes;

var commentsTotalNumber = randomNumber(6, 100);

bigPicture.querySelector('.comments-count').textContent = commentsTotalNumber;

var avatarNumber = randomNumber(1, 6);

bigPicture.querySelector('.social__picture').src = 'img/avatar-' + avatarNumber + '.svg';

bigPicture.querySelector('.social__text').textContent = photos[0].commentText;

bigPicture.querySelector('.social__caption').textContent = photos[0].descriptionText;

bigPicture.querySelector('.social__comment-count').classList.add('.visually-hidden');

bigPicture.querySelector('.comments-loader').classList.add('.visually-hidden');
