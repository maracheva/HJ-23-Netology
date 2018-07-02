'use strict';

// по тегу <li class="drum-kit__drum">
const drumButtons = document.getElementsByClassName('drum-kit__drum');

// проходимся циклом по каждой кнопке
for (let btn of drumButtons) {
    btn.onclick = () => {
        const player = this.getElementsByTagName('audio')[0];
        player.play();
    }
}

