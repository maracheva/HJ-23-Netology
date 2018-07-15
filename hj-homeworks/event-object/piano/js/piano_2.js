'use strict';

const piano = document.getElementsByTagName('ul')[0]; // родительский тег
const audio = document.getElementsByTagName('audio'); // тег audio
const keys = piano.getElementsByTagName('li'); 
const middle = [
    "https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/middle/first.mp3",
    "https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/middle/second.mp3",
    "https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/middle/third.mp3",
    "https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/middle/fourth.mp3",
    "https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/middle/fifth.mp3"
];
const lower = [
    'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/lower/first.mp3', 
    'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/lower/second.mp3', 
    'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/lower/third.mp3', 
    'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/lower/fourth.mp3', 
    'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/lower/fifth.mp3'
]; 
const higher = [
    'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/higher/first.mp3', 
    'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/higher/second.mp3', 
    'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/higher/third.mp3', 
    'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/higher/fourth.mp3', 
    'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/higher/fifth.mp3'
];

// Для изменения режима, в котором находится пианино, следует менять класс на теге <ul class="set <mark>middle</mark>">.
//В режиме lower класс .middle меняется на .lower. Для higher — аналогично.
//Для изменения звука кнопок следует менять src у тегов audio внутри соответствующих кнопок.

// проходимся циклом по каждой клавише пианино key и добавляем обработчик события
for (const key of keys) {
    key.addEventListener('click', playSound);
}

// Событие 'click' на клавише пианино
function playSound(event) {
    event.preventDefault(); // отменим переход по ссылке
    // счетчик по плейлисту.
    for(let i = 0; i < audio.length; i++) {
        
        if (piano.classList.contains('lower')) {
            audio[i].src = lower[i];

        } else if(piano.classList.contains('higher')){
            audio[i].src = higher[i];
               
        } else if(piano.classList.contains('middle')){
            audio[i].src = middle[i];
        }

    }
    // запускаем звук
    let play = event.currentTarget.getElementsByTagName('audio')[0];
    play.pause();
    play.currentTime = 0;
    play.play();

}

// События на клавиатуре
// функция-обработчик событий клавиатуры при нажатии клавиш
function getKeydown(event) {
// первый вариант
    if (event.getModifierState("Shift")) {
        piano.classList.remove('middle'); // удаляем то middle
        piano.classList.remove('higher');
        piano.classList.add('lower'); // подключаем тон lower
    } else if (event.getModifierState("Alt")) {
        piano.classList.remove('middle');
        piano.classList.remove('lower');
        piano.classList.add('higher'); // подключаем тон higher
    }
    
// второй вариант
//    if (event.shiftKey) { // если нажата клавиша Shift
//        piano.classList.remove('middle'); // удаляем тон middle
//        piano.classList.remove('higher'); // удаляем тон higher
//        piano.classList.add('lower'); // подключаем тон lower
//    } else if (event.altKey) { // если нажата клавиша Alt
//        piano.classList.remove('middle');
//        piano.classList.remove('lower'); // удаляем тон middle
//        piano.classList.add('higher'); // подключаем тон higher
//    }  
    
    playSound();
}

// функция - обработчик события на клавиатуре при отпускании зажатых клавиш
function getKeyup(event) {
    piano.classList.remove('lower'); 
    piano.classList.remove('higher'); 
    piano.classList.add('middle'); // по умолчанию подключен тон middle
    playSound();
}


// добавим обработчик событий на клавиатуре
// при нажатых клавишах Shift или Alt
document.addEventListener('keydown', getKeydown);
// при отпускании клавиши
document.addEventListener('keyup', getKeyup);