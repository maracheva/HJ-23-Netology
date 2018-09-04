'use strict';

const draw = document.getElementById('draw');
const ctx = draw.getContext('2d');
const PI = Math.PI;
let drawing = false; // Статус рисования
const lineSize = changeLineSize(); // Размер линии
const hue = changeHue(); // оттенок

// скругление края линии
ctx.lineJoin = 'round';
ctx.lineCap = 'round';

document.body.style.overflow = 'hidden';

// При открытии страницы размер холста равен размеру окна браузера
window.addEventListener('resize', () => {
    sizeDraw();
});
// Если кнопка мыши отпущена, то линия не рисуется. 
draw.addEventListener("mouseup", () => {
    drawing = false;
  });
// Если кнопка мыши нажата, линия рисуется
draw.addEventListener("mousedown", () => {
    drawing = true;
  });
// Если мышь вышла за пределы холста, линия не рисуется. 
draw.addEventListener("mouseleave", () => {
    drawing = false;
});
// При движении по холсту мыши с нажатой левой кнопкой будет рисоваться на холсте линия
draw.addEventListener("mousemove", (e) => {
    if (drawing) {
        const point = [e.offsetX, e.offsetY]; // Для рисования используются координаты положения мыши.
        circle(point, lineSize(), hue(e));
  }
});
// При двойном клике холст очищается
draw.addEventListener('dblclick', () => {
    ctx.clearRect(0, 0, draw.width, draw.height);
});

// Функция определяет размеры холста относительно экрана
function sizeDraw() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    draw.setAttribute('width', width);
    draw.setAttribute('height', height);
    // При изменении размеров окна бразуера необходимо обновить размер холста и очистить его.
    ctx.clearRect(0, 0, width, height);
}

// Рисование точки
function circle(point, size, hue) {
    ctx.beginPath();
    ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.arc(...point, size, 0, 2 * PI);
    ctx.fill();
}

// Изменение толщины линии
// Толщина линии меняется при каждом тике на единицу в диапазоне от 5 до 100 включительно
function changeLineSize() {
    let current = 100; // Начинать нужно со 100
    let changeLine = true;
    // При достижении минимума — увеличиваться.
    return function () {
        if (current < 100 && changeLine) {
            return current++;
        } else {
            changeLine = false;
        }
    // При достижении максимума толщина должна уменьшаться
        if (current > 5 && !changeLine) {
            return current--;
        } else {
            changeLine = true;
        }
    }
}

// Изменение оттенка линии
function changeHue() {
    let current = 0;
    // при нажатии клавиши Shift, оттенок уменьшается, иначе увеличивается
    return function (event) {
        event.shiftKey ? current-- : current++;
    // Если оттенок достиг максимума или минимума, то значение устанавливается в минимум или максимум соответственно
        if (current < 0) {
            current = 359;
        } else if (current > 359) {
            current = 0;
        }

        return current;
    }
}

sizeDraw(); // вызов функции рисования