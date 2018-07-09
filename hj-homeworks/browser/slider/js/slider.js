`use strict`;

const sliderArray = [
    airmax-jump.png,
    airmax-on-foot.png,
    airmax-playground.png,
    airmax-top-view.png,
    airmax.png
]

const slider = document.getElementById('slider');
let cur = 0; // счетчик

// slider.scr = sliderArray[0]; 
slider.src = `i/${sliderArray[0]}`;

let changeSlider = setInterval(() => {
	if (cur === sliderArray.length) {
		cur = 0;
	}
	slider.src = `i/${sliderArray[cur]}`;
	++ cur;
}, 5000);


