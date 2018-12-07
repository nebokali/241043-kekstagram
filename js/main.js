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
var likesNumber = randomNumber(15, 200);
var pictureNumber = randomNumber(0, 25);
var commentsTotalNumber = randomNumber(6, 100);
var avatarNumber = randomNumber(1, 6);
var addData = function (place, object) {
  place.push(object);
}

var photos = [];
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
  addData(photos, photo);
}

for (var i = 0; i < photos.length; i++) {
  var photoElement = pictureTemplate.cloneNode(true);
  var fillPhotoData = function (place, object, likes_count) {
    object.querySelector('.picture__img').src = place[i].url;
    object.querySelector('.picture__likes').textContent = likes_count;
    object.querySelector('.picture__comments').textContent = place[i].commentText;
    fragment.appendChild(object);
  }
  fillPhotoData(photos, photoElement, likesNumber);
}

pictures.appendChild(fragment);
bigPicture.classList.remove('hidden');
var fillBigPicture = function (origin, img, likes_count, comments_count, social_picture, social__caption) {
  bigPicture.querySelector('img').src = origin[img].url;
  bigPicture.querySelector('.likes-count').textContent = likes_count;
  bigPicture.querySelector('.comments-count').textContent = comments_count;
  bigPicture.querySelector('.social__picture').src = 'img/avatar-' + social_picture + '.svg';
  bigPicture.querySelector('.social__text').textContent = origin[0].commentText;
  bigPicture.querySelector('.social__caption').textContent = origin[social__caption].descriptionText;
}
fillBigPicture(photos, pictureNumber, likesNumber, commentsTotalNumber, avatarNumber, 0);
bigPicture.querySelector('.social__comment-count').classList.add('.visually-hidden');
bigPicture.querySelector('.comments-loader').classList.add('.visually-hidden');
