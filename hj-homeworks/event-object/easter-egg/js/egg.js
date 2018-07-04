'use strict';

const navPanel = document.getElementsByTagName('nav')[0];
const secretPanel = document.getElementsByClassName('secret')[0]; // <div class="secret">
const secretCode = 'KeyYKeyTKeyNKeyJKeyKKeyJKeyUKeyBKeyZ'; // код Нетология
const arr = [];


// функционал «пасхалки» — секрета, который откроется пользователю при наборе последовательности букв «нетология»:
function showSecret(event) {
    arr.push(event.code); //добавляем код клавиши в массив
    // склеиваем массив в строку и ищем секретную строку
    if (arr.join('') !== secretCode) { // если строка не равна секретному коду
        if (secretCode.includes(arr.join('')) === -1) { // если ничего не найдено
            arr.length = 0; // то массив пустой
        } else {
            secretPanel.classList.add('visible'); //отображаем секретную панель
        }
    }
}

// Открытие и закрытие панели навигации осуществляется с помощью добавления и удаления класса visible для тега nav.
function showMenu(event) {
    if (event.ctrlKey && event.altKey && event.code === 'KeyT') { //если нажаты клавиши 
          navPanel.classList.toggle('visible'); // отображаем меню
    }
      showSecret(event);
}

document.addEventListener('keydown', showMenu);
