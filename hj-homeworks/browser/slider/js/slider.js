'use strict';

const sliderArray = [
    'airmax-jump.png',
    'airmax-on-foot.png',
    'airmax-playground.png',
    'airmax-top-view.png',
    'airmax.png'
]

const slider = document.getElementById('slider');
slider.scr = 'i/${sliderArray[0]}'; // заменим исходный файл на первый элемент массива ??? ПОЧЕМУ-ТО НЕВСЕГДА СРАБАТЫВАЕТ????

let i = 0; // счетчик
let changeSlider = setInterval(() => {
	if (i === sliderArray.length) {
		i = 0;
	}
	slider.src = `i/${sliderArray[i]}`;
	++ i;
}, 5000);


