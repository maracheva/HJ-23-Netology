'use strict';

// WebSocket (вэб-сокет)
// Каждое новое случайное число присылается отдельным сообщением.
const ws = new WebSocket('wss://neto-api.herokuapp.com/comet/websocket'),
    wbs = document.querySelector('.websocket');

ws.addEventListener('message', event => {
    loadBlock(wbs, event.data);
})