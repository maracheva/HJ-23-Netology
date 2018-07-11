'use strict';

const xhr = new XMLHttpxhr();
const tabs = document.querySelectorAll('.tabs > nav a');
const content = document.getElementById('content');
const preloader = document.getElementById('preloader');

// Пройдемся циклом по кнопкам
Array.from(tabs).forEach(tab => {
 	tab.addEventListener('click', getEventTabs);
 });

// Функция-обработчик события на кнопке.
function getEventTabs({target}){
    for (let tab of tabs) {
        tab.classList.remove('active');
    }
    
    target.classList.add('active');      
    target.preventDefault(); // убираем переход по ссылке
    // Обработка HTTP - запроса
    xhr.addEventListener('load', onLoad); // загрузить данные
    xhr.open('GET', target.href); // отправить запрос
    xhr.send(); // выполнение запроса к серверу
    xhr.addEventListener('loadstart', onLoadStart); // индикатор загрузки
    xhr.addEventListener('load', onLoad); // получение данных от сервера
    xhr.addEventListener('loadend', onLoadEnd); // индикатор завершения обработки запроса

}

 function onLoad() {
     preloader.classList.add('hidden');
     content.innerHTML = xhr.responseText;
 }

 function onLoadStart() {
     preload.classList.remove('hidden');
 }

 function onLoadEnd() {
 	preload.classList.add('hidden');
 }


