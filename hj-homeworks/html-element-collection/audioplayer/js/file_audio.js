'use strict';

 const player = document.getElementsByClassName('mediaplayer')[0];
  const audio = player.getElementsByTagName('audio')[0];
  const title = player.getElementsByClassName('title')[0];
  const playPauseBtn = player.getElementsByClassName('playstate')[0];
  const stopBtn = player.getElementsByClassName('stop')[0];
  const prevBtn = player.getElementsByClassName('back')[0];
  const nextBtn = player.getElementsByClassName('next')[0];
  const trackList = ['LA Chill Tour', 'LA Fusion Jam', 'This is it band'];
  let trackIndex = 0;

  function setCurrentTrack() {
    audio.src = `./mp3/${trackList[trackIndex]}.mp3`;
    title.title = trackList[trackIndex];

    if (player.classList.contains('play')) {
      audio.play()
    }
  }

  playPauseBtn.onclick = () => {
    player.classList.contains('play') ? audio.pause() : audio.play();
    player.classList.toggle('play');
  };

  stopBtn.onclick = () => {
    if (player.classList.contains('play')) {
      player.classList.remove('play');
    }

    audio.pause();
    audio.currentTime = 0;
  };

  prevBtn.onclick = () => {
    if (trackIndex <= 0) {
      trackIndex = trackList.length - 1;
    } else {
      trackIndex--;
    }
    setCurrentTrack();
  }

  nextBtn.onclick = () => {
    if (trackIndex >= trackList.length - 1) {
      trackIndex = 0;
    } else {
      trackIndex++;
    }
    setCurrentTrack();
  }
