'use strict';

document.addEventListener('DOMContentLoaded', function () {
    const chat = document.querySelector('.chat'),
        messageBox = chat.querySelector('.message-box'), // Форма отправки нового сообщения
        messageInput = chat.querySelector('.message-input'), // Поле ввода сообщения
        messageSubmit = chat.querySelector('.message-submit'), // Кнопка «Отправить сообщение»
        messagesContent = chat.querySelector('.messages-content'), // Все новые сообщения для отображения
        chatStatus = chat.querySelector('.chat-status'); // для вывода состояния чата

    // шаблоны message
    const messageLoading = document.querySelector('.message.loading'), // собеседник сейчас печатает сообщение
        messagePersonal = document.querySelector('.message-personal'), // сообщение от пользователя
        messageStatus = document.querySelector('.message-status'), // вывод разных уведомлений
        messageText = document.querySelector('.message-text'), // для вывода текста уведомления
        message = Array.from(document.querySelectorAll('.message')).find(elem => elem.classList.length === 1); // все сообщения с классом message

    const ws = new WebSocket('wss://neto-api.herokuapp.com/chat');

    // обработка события «Отправить сообщение» и вывести уведомление с текстом «Пользователь появился в сети».
    ws.addEventListener('open', () => {
        let messageNew = messageStatus.cloneNode(true);
        messageNew.querySelector('.message-text').textContent = 'Пользователь появился в сети'; 
        messagesContent.appendChild(messageNew)
        messageSubmit.disabled = false; // активируем кнопку «Отправить сообщение»
        chatStatus.textContent = chatStatus.dataset.online // соединение успешно установлено, обновляем статус чата
    });

    // обработка события окончания работы (соединение с веб-сокет сервером закрывается)
    ws.addEventListener('close', event => {
        let messageNew = messageStatus.cloneNode(true);
        messageNew.querySelector('.message-text').textContent = 'Пользователь не в сети';
        messagesContent.appendChild(messageNew)
        messageSubmit.disabled = true; // деактивируем кнопку «Отправить сообщение»
        chatStatus.textContent = chatStatus.dataset.offline // меняем статус пользователя
        ws.close(1000, 'Работа закончена');
    });

    // При получении сообщения по веб-сокет соединению необходимо проверить текст сообщения
    ws.addEventListener('message', event => {
        // отображаем информацию о том, что собеседник сейчас печатает сообщение
        if (event.data === '...') {
            let messageNew = messageLoading.cloneNode(true);
            messageNew.querySelector('span').textContent = 'Пользователь наберает сообщение';
            messagesContent.appendChild(messageNew)
        }
        // отображаем сообщение с этим текстом
        if (event.data !== '...'){
            let data = new Date();
            let datetext = data.getHours() + ":" + data.getMinutes();
            let messageNew = message.cloneNode(true);
            messageNew.querySelector('.message-text').textContent = event.data;
            messageNew.querySelector('.timestamp').textContent = datetext;
            messagesContent.appendChild(messageNew);
            let messageDelete = Array.from(messagesContent.querySelectorAll('.message.loading'));
            messageDelete.forEach(item => messagesContent.removeChild(item)); // удаляем информацию о том, что собеседник печатает
        }

    });
    // обработка события ввода текста
    messageInput.addEventListener('focusin', function(){
        ws.send("...")
    })


    function createMessage(event) {
        event.preventDefault();
        let data = new Date();
        let datetext = data.getHours() + ":" + data.getMinutes();
        let messageNew = messagePersonal.cloneNode(true);
        messageNew.querySelector('.message-text').textContent = messageInput.value;
        messageNew.querySelector('.timestamp').textContent = datetext;
        if (messageInput.value.length === 0) return;
        ws.send(messageInput.value)
        messagesContent.appendChild(messageNew)
        messageInput.value = '';
    }
    // обработка события отправки нового сообщения
    messageBox.addEventListener('submit', createMessage)

})
