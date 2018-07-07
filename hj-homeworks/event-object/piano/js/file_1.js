'use strict';

//создаю колекции и массивы
let piano = document.getElementsByTagName('ul')[0],
    players = piano.getElementsByTagName('audio'),
    keys = piano.getElementsByTagName('li');
let middle = ["https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/middle/first.mp3",
              "https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/middle/second.mp3",
              "https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/middle/third.mp3",
              "https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/middle/fourth.mp3",
              "https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/middle/fifth.mp3"],
    lower = ['https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/lower/first.mp3', 'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/lower/second.mp3', 'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/lower/third.mp3', 'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/lower/fourth.mp3', 'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/lower/fifth.mp3'], 
    higher = ['https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/higher/first.mp3', 
              'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/higher/second.mp3', 
              'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/higher/third.mp3', 
              'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/higher/fourth.mp3', 
              'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/higher/fifth.mp3'];


//задаю зависимость источника звука от класса родительского тэга
 

//наикривейшая из функций реагирующая на зажатые клавиши
function pianoPlay(event) {
  if (piano.classList.contains('lower')) {
    for(let i = 0; i < players.length; i++) {
        players[i].src = lower[i];
    }                                         
  } else if(piano.classList.contains('higher')){
    for(let i = 0; i < players.length; i++) {
        players[i].src = higher[i];
    }    
  } else if(piano.classList.contains('middle')){
    for(let i = 0; i < players.length; i++) {
        players[i].src = middle[i];
    }
  }

  event.currentTarget.getElementsByTagName('audio')[0].currentTime = 0;
  event.currentTarget.getElementsByTagName('audio')[0].play();
 };

function toneChange(event) {
  if (event.shiftKey) {
    piano.classList.remove('middle');
    piano.classList.add('lower')
  }
  else if (event.altKey) {
    piano.classList.remove('middle');
    piano.classList.add('higher')
  }
}
function toneDef() {
    piano.classList.remove('lower');
    piano.classList.remove('higher');
    piano.classList.add('middle');
}



Array.from(keys).forEach(key => key.addEventListener('click', pianoPlay))
document.addEventListener('keydown', toneChange);
document.addEventListener('keyup', toneDef);
