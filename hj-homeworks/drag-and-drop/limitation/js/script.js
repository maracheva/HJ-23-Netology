'use strict'

const textarea = document.querySelector('.textarea'); // текстовое поле
const block = document.querySelector('.block'); // взгляд
const message = document.querySelector('.message'); // сообщение

// текстовое поле в фокусе
function focusIn() {
    // Чтобы взгляд смотрел вниз нужно присвоим классу block дополнительный класс active.
    block.classList.add('active')
}

// текстовое поле не в фокусе, зверь должен смотреть прямо и сообщения быть не должно.
function focusOut(event) {
    block.classList.remove('active') // взгяд смотрит прямо
    // Чтобы проявилось сообщение классу message присвоим дополнительный класс view
    if (message.classList.contains('view')) {
        message.classList.remove('view') //  удаляем сообщение
    } 
    return event
}


function addMessage(callback, delay) {
    let timeout;
    return () => {
        focusIn()
        message.classList.remove('view')
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            if (block.classList.contains('active')) {
                message.classList.add('view') // добавляем сообщение
            }
            timeout = null;
            callback();
        }, delay);
    };
};

// Когда текстовое поле в фокусе зверь должен смотреть вниз
textarea.addEventListener('focus', focusIn)
// Текстовое поле не в фокусе, зверь смотит прямо
textarea.addEventListener('focusout', focusOut)
// пользователь перестаёт печатать, через 2 секунды должно появиться сообщение и зверь должен посмотреть прямо
textarea.addEventListener('input', addMessage(() => {
    block.classList.remove('active');
}, 2000));
