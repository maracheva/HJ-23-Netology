'use strict'

// Каждый глаз имеет свою область.  
const leftEye = document.querySelector('.cat_position_for_left_eye'); // Область левого глаза
const   rightEye = document.querySelector('.cat_position_for_right_eye'); // Область правого глаза

let coord = null;

function catEye(eye, coord) {
    const pupil = eye.querySelector('.cat_eye');

  if(coord.x < eye.getBoundingClientRect().left) pupil.style.left = `${0}%`
  if(coord.x > eye.getBoundingClientRect().right) pupil.style.left = `${50}%`
  if(eye.getBoundingClientRect().left < coord.x && coord.x < eye.getBoundingClientRect().right) pupil.style.left = `${25}%`
  if(coord.y < eye.getBoundingClientRect().top) pupil.style.top = `${0}%`
  if(coord.y > eye.getBoundingClientRect().bottom) pupil.style.top = `${50}%`
  if(eye.getBoundingClientRect().top < coord.y && coord.y < eye.getBoundingClientRect().bottom) pupil.style.top = `${25}%`
  
}


document.addEventListener('mousemove', event => {
    coord = {
        x: event.pageX,
        y: event.pageY
    }

    catEye(leftEye, coord);
    catEye(rightEye, coord);

})