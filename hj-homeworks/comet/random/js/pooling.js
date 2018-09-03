'use strict';


//  Pooling (Частые опросы)
const pooling = document.querySelector('.pooling')

setInterval(function () {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://neto-api.herokuapp.com/comet/pooling');
    xhr.send();

    xhr.addEventListener('load', () => {
        loadBlock(pooling, xhr.responseText);
    })
}, 1000);

