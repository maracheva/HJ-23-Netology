'use strict';

function loadBlock(block, position) {
    const blockDiv = block.querySelectorAll('div');
    // Для того чтобы выбрать карточку, добавим/удалим класс flip-it. 
    blockDiv.forEach(elem => {
        elem.classList.remove('flip-it'); 
        if (elem.textContent === position.trim()) { // удалим пробельные символы с начала и конца строки
            elem.classList.add('flip-it');
        }
    })
}

// Long-pooling (длинные опросы)
const longpooling = document.querySelector('.long-pooling')

setInterval(function () {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://neto-api.herokuapp.com/comet/long-pooling');
    xhr.send();

    xhr.addEventListener('load', () => {
        if (event.target.status == 200) {
            loadBlock(longpooling, xhr.responseText);
        }
    })
}, 5000);

