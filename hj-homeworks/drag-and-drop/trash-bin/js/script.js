'use strict'

let movedPiece = null; // переменная, которая будет запоминать перемещение мыши
let posX = null, posY = null; // координаты

// Перетаскивание всех элементов с классом logo
document.addEventListener('mousedown', event => {
    if (event.target.classList.contains('logo')) {
        // Предотвращаем выделение текста
        // При захвате элемента курсор должен быть в центре этого элемента.
        posX = event.target.getBoundingClientRect().left;
        posY = event.target.getBoundingClientRect().top;
        movedPiece = event.target;
        movedPiece.classList.add('moving');
    }
});

document.addEventListener('mousemove', event => {
    if (movedPiece) {
        event.preventDefault();
        movedPiece.style.left = `${event.pageX - (movedPiece.width / 2)}px`;
        movedPiece.style.top = `${event.pageY - (movedPiece.height / 2)}px`;

    }
    else movedPiece = null;
});

// При захвате элемента необходимо присвоить этому элементу класс moving 
// и удалить этот класс после отпускания элемента.
document.addEventListener('mouseup', event => {
    if (movedPiece) {
        movedPiece.classList.remove('moving');
        movedPiece.style.visibility = 'hidden';
        const trashBin = document.elementFromPoint(event.clientX, event.clientY).closest('#trash_bin');
        movedPiece.style.visibility = 'visible';
        if (trashBin) {
            movedPiece.style.display = 'none'; // Удалить элемент(display: none;), если он был отпущен в области корзины, которая имеет id trash_bin
            movedPiece = null;
            posX = null;
            posY = null;
        }  else {
            movedPiece.style.left = `${posX}px`;
            movedPiece.style.top = `${posY}px`;
            posX = null;
            posY = null;
            movedPiece = null;
        }
    }
});