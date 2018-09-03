'use strict';

const ws = new WebSocket('wss://neto-api.herokuapp.com/draw'); // передача текущего состояния холста

ws.addEventListener('open', event => {
	editor.addEventListener('update', sendSession);
});

ws.addEventListener('close', event => {
	editor.removeEventListener('update', sendSession);
});

ws.addEventListener('error', error => {
	console.error(error.data);
})

window.addEventListener('beforeunload', () => {
	ws.close(1000, 'Сессия завершена');
});

function sendSession(event) {
	event.canvas.toBlob(blob => ws.send(blob));
}
