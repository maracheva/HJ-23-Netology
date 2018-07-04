'use strict';

const view = document.getElementById('view');
const nav = document.getElementById('nav');
const galleryList = nav.getElementsByTagName('a');

// пройдемся циклом 
for (let image of galleryList) {
    image.addEventListener('click', changeImage);
}

//функция-обработчик событий
function changeImage(event) {
    event.preventDefault(); // отменим переход по ссылке

    for (let image of galleryList) {
        image.classList.remove('gallery-current');
    }

    event.currentTarget.classList.add('gallery-current');
    view.src = event.currentTarget.href;
}
