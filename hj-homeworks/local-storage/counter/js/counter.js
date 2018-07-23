'use strict';

const counter = document.getElementById('counter');
const btnIncrement = document.getElementById('increment');
const btnDescrement = document.getElementById('decrement');
const btnReset = document.getElementById('reset');

// При открытии страницы счётчик должен показывать значение 0, либо последнее значение, которое было на момент закрытия окна браузер
// через свойства объекта
if (sessionStorage.count === undefined) {
    sessionStorage.count = 0;
}

counter.textContent = sessionStorage.count;

//Кнопка «+» — идентификатор increment
btnIncrement.addEventListener('click', () => {
    counter.textContent = ++sessionStorage.count;
});

// Кнопка «-» — идентификатор decrement
btnDescrement.addEventListener('click', () => {
    counter.textContent = sessionStorage.count <= 0 ? 0 : --sessionStorage.count;
});

//Кнопка «Сбросить» — идентификатор reset
btnReset.addEventListener('click', () => {
    sessionStorage.count = 0;
    counter.textContent = 0;
});
