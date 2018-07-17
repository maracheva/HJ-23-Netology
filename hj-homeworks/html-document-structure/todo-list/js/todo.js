const todoList = document.querySelector('.todo-list');
const done = todoList.querySelector('.done');
const undone = todoList.querySelector('.undone');
const inputAll = todoList.querySelectorAll('input');

function moveTodoList ({target}) {

    if (target.hasAttribute('checked')) {
        undone.appendChild(target.parentElement)
        target.removeAttribute('checked');
    } else {
        done.appendChild(target.parentElement);
        target.setAttribute('checked', true);
    }
}

Array.from(inputAll).forEach(input => input.addEventListener('click',moveTodoList));
