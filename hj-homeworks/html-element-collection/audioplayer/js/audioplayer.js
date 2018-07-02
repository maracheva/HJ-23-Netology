'use strict';

// родительский тег <div class="mediaplayer">
const mediaplayer = document.getElementsByClassName('mediaplayer')[0];
// дочерние теги:
const audio = mediaplayer.getElementsByTagName('audio')[0]; // тег <audio>
const playstateBtn = mediaplayer.getElementsByClassName('playstate')[0]; // Play/Pause тег <button class="playstate">
const stopBtn = mediaplayer.getElementsByClassName('stop')[0]; // Stop <button class="stop">
const backBtn = mediaplayer.getElementsByClassName('back')[0]; // Back <button class="back">
const nextBtn = mediaplayer.getElementsByClassName('next')[0]; // Next <button class="next">

const title = mediaplayer.getElementsByClassName('title')[0]; // название песни с помощью обновления свойства title у тега <span class="title" title="LA Chill Tour"></span>.
const mp3List = ['LA Chill Tour.mp3', 'LA Fusion Jam.mp3', 'This is it band.mp3'];

// Play or Pause
playstateBtn.onclick = () => {
    mediaplayer.classList.contains('play') ? audio.pause() : audio.play();
    mediaplayer.classList.toggle('play');
}

// Stop
stopBtn.onclick = () => {
   if (mediaplayer.classList.contains('play')) {
       mediaplayer.classList.remove('play');
    }
    
    audio.pause();
    audio.currentTime = 0;
}

let index = 0; // счетчик
// Change Song of mp3List
const currentSong = () => {
    audio.src = `./mp3/${mp3List[index]}`; // текущий трэк
    title.title = mp3List[index]; // название текущего трэка

    if (mediaplayer.classList.contains('play')) {
        audio.play();
    }
}
 
// Button Next Song
nextBtn.onclick = () => {
    if (index >= mp3List.length - 1) {
        index = 0;
    }
    index++;
    currentSong();
}

// Button Back Song
backBtn.onclick = () => {
    if (index <= 0) {
        index = mp3List.length - 1;
    }
    index--;
    currentSong();
}








  