'use strict';

const sliderArray = [
    './i/airmax-jump.png',
    './i/airmax-on-foot.png',
    './i/airmax-playground.png',
    './i/airmax-top-view.png',
    './i/airmax.png'
]

const slider = document.getElementById('slider');
let cur = 0; // счетчик

slider.scr = sliderArray[0]; 

let changeSlider = setInterval(() => {
	if (cur === sliderArray.length) {
		cur = 0;
	}
	slider.src = sliderArray[cur];
	++ cur;
}, 5000);


