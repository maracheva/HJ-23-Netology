`use strict`;

const sliderArray = [
    "i/airmax-jump.png",
    "i/airmax-on-foot.png",
    "i/airmax-playground.png",
    "i/airmax-top-view.png",
    "i/airmax.png"
]

document.getElementById("slider").src = sliderArray[0];
let i = 1;
let slider = setInterval(() => {
    document.getElementById("slider").src = sliderArray[i];
    i++
    if (i === sliderArray.length) i = 0;
}, 5000);
