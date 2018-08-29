'use strict';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const PI = Math.PI;
const colors = ['#ffffff', '#ffe9c4', '#d4fbff'];

canvas.style.backgroundColor = '#000000';
// событие при клике на поле
canvas.addEventListener('click', (event) => {
  const countStars = random(200, 400);

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  for (let i = 0; i < countStars; i++) {
    const x = Math.round(Math.random() * canvasWidth);
    const y = Math.round(Math.random() * canvasHeight);
    drawStar(x, y);
  }
});

function random(min, max) {
	return Math.round(min + ( (max - min) * Math.random()));
}

function drawStar(x, y) {
  const radius = random(0, 1.1, true);
  const color = colors[random(0, 2)];
  const opacity = random(0.8, 1, true);

  ctx.beginPath();
  ctx.globalAlpha = opacity;
  ctx.fillStyle = color;
  ctx.fillRect(x, y, radius, radius);
  ctx.closePath();
}