'use strict';

const piano = document.getElementsByTagName('ul')[0]; // родительский тег
const audio = document.getElementsByTagName('audio')[0]; // тег audio
const pianoSoundsList = ['first.mp3', 'second.mp3', 'third.mp3', 'fourth.mp3', 'fifth.mp3']; // т.к. названия звуков у тонов middle, lower, higher одни и те же, создадим общий плейлист, а в ссылках будем указывать название папок, в которых лежат звуки конкретного тона (middle, lower, higher).
let nameSounds = ['higher', 'lower', 'middle']; // массив папок-тонов

// Для изменения режима, в котором находится пианино, следует менять класс на теге <ul class="set <mark>middle</mark>">.

//В режиме lower класс .middle меняется на .lower. Для higher — аналогично.
//
//Для изменения звука кнопок следует менять src у тегов audio внутри соответствующих кнопок.
//
// проходимся циклом по каждой клавише пианино key и добавляем обработчик события
for (const key of pianoSongList) {
    key.addEventListener('click', playSound);
}
// Событие 'click' на клавише пианино
function playSound(event) {
//    if (piano.classList.contains('lower')) {
//        for(let i = 0; i < audio.length; i++) {
//            audio[i].src = './sounds/lower/${pianoSoundsList[i]}`;
//        }                                         
//    } else if(piano.classList.contains('higher')){
//        for(let i = 0; i < audio.length; i++) {
//            audio[i].src = './sounds/higher/${pianoSoundsList[i]}`;
//        }    
//    } else if(piano.classList.contains('middle')){
//        for(let i = 0; i < audio.length; i++) {
//            audio[i].src = './sounds/middle/${pianoSoundsList[i]}`;
//        } 
//    }
//
    audio.src = `./sounds/${nameSounds}/${pianoSoundsList[event.currentTarget]}.mp3`;
    audio.pause();
    audio.currentTime = 0;
    audio.play();
//    event.currentTarget.getElementsByTagName('audio')[0].currentTime = 0;
//    event.currentTarget.getElementsByTagName('audio')[0].play();

}

// События на клавиатуре
// функция-обработчик событий клавиатуры
function getKeyboardEvent(event) {
//    if (event.getModifierState("Shift")) {
//        piano.classList.remove('middle'); // удаляем то middle
//        piano.classList.add('lower'); // подключаем тон lower
//    } else if (event.getModifierState("Alt")) {
//        piano.classList.remove('middle');
//        piano.classList.add('higher'); // подключаем тон higher
//    }
    if (event.shiftKey) { // если нажата клавиша Shift
        nameSounds = 'lower';
        piano.classList.remove('middle'); // удаляем тон middle
        piano.classList.add('lower'); // подключаем тон lower
    } else if (event.altKey) { // если нажата клавиша Alt
        nameSounds = 'higher';
        piano.classList.remove('middle');
        piano.classList.add('higher'); // подключаем тон higher
    }
    nameSounds = 'middle';
    piano.classList.add('middle'); // по умолчанию подключен тон middle
}
// добавим обработчик событий на клавиатуре
document.addEventListener('keydown', getKeyboardEvent);