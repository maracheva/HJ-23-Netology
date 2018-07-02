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
const mp3List = ['LA Chill Tour', 'LA Fusion Jam', 'This is it band'];

let trackIndex = 0;

playstateBtnBtn.onclick = () => {
    mediaplayer.classList.contains('play') ? audio.pause() : audio.play();
    mediaplayer.classList.toggle('play');
  }

stopBtn.onclick = () => {
   if (mediaplayer.classList.contains('play')) {
      mediaplayer.classList.remove('play');
    }

    audio.pause();
    audio.currentTime = 0;
}

prevBtn.onclick = () => {
    if (trackIndex <= 0) {
      trackIndex = mp3List.length - 1;
    } else {
      trackIndex--;
    }
    setCurrentTrack();
}

nextBtn.onclick = () => {
    if (trackIndex >= mp3List.length - 1) {
      trackIndex = 0;
    } else {
      trackIndex++;
    }
    setCurrentTrack();
}

function setCurrentTrack() {
    audio.src = `./mp3/${mp3List[trackIndex]}.mp3`;
    title.title = mp3List[trackIndex];

    if (mediaplayer.classList.contains('play')) {
      audio.play()
    }
}




//const player = document.getElementsByClassName('mediaplayer')[0];
//  const audio = player.getElementsByTagName('audio')[0];
//  const title = player.getElementsByClassName('title')[0];
//  const playPauseBtn = player.getElementsByClassName('playstate')[0];
//  const stopBtn = player.getElementsByClassName('stop')[0];
//  const prevBtn = player.getElementsByClassName('back')[0];
//  const nextBtn = player.getElementsByClassName('next')[0];
//  const trackList = ['LA Chill Tour', 'LA Fusion Jam', 'This is it band'];
//  let trackIndex = 0;
//
//  function setCurrentTrack() {
//    audio.src = `./mp3/${trackList[trackIndex]}.mp3`;
//    title.title = trackList[trackIndex];
//
//    if (player.classList.contains('play')) {
//      audio.play()
//    }
//  }
//
//  playPauseBtn.onclick = () => {
//    player.classList.contains('play') ? audio.pause() : audio.play();
//    player.classList.toggle('play');
//  };
//
//  stopBtn.onclick = () => {
//    if (player.classList.contains('play')) {
//      player.classList.remove('play');
//    }
//
//    audio.pause();
//    audio.currentTime = 0;
//  };
//
//  prevBtn.onclick = () => {
//    if (trackIndex <= 0) {
//      trackIndex = trackList.length - 1;
//    } else {
//      trackIndex--;
//    }
//    setCurrentTrack();
//  }
//
//  nextBtn.onclick = () => {
//    if (trackIndex >= trackList.length - 1) {
//      trackIndex = 0;
//    } else {
//      trackIndex++;
//    }
//    setCurrentTrack();
//  }
