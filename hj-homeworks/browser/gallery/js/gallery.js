'use strict';

const imgArray = [
	'breuer-building.jpg',
	'guggenheim-museum.jpg',
	'headquarters.jpg',
	'IAC.jpg',
	'new-museum.jpg'
]

const prevBtn = document.getElementById('prevPhoto');
const nextBtn = document.getElementById('nextPhoto');
const currentPhoto = document.getElementById('currentPhoto');

currentPhoto.src = `i/${imgArray[0]}`; // заменим исходный файл на первое фото

let i = 0; // счетчик
function prevPhoto() {
    if (i <= 0) {
      i = imgArray.length - 1;
    } else {
      i--;
    }
    currentPhoto.src = `i/${imgArray[i]}`;
}

function nextPhoto() {
    if (i >= imgArray.length - 1) {
        i = 0;
    } else {
        i++;
    }
    currentPhoto.src = `i/${imgArray[i]}`;
}

prevBtn.onclick = prevPhoto;
nextBtn.onclick = nextPhoto;

//prevBtn.onclick = function () {
//    prevPhoto();
//}

//nextBtn.onclick = function () {
//    nextPhoto();
//}






