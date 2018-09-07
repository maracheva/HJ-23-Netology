// 'use strict';

// document.addEventListener('DOMContentLoaded', () => {


//     // Запрашиваем доступ к видеокамере
//     navigator.mediaDevices
//         .getUserMedia({
//             video: true,
//             audio: false
//         })
//         .then((stream) => {
//             let video = document.createElement('video');
//             video.srcObject = stream;
//             video.play();
//             document.querySelector('.app').insertBefore(video, document.getElementById('error-message'));
//             document.querySelector('.controls').style.display = 'block'

//         })
//         .catch(err => {
//             document.getElementById('error-message').style.display = 'block'
//             document.getElementById('error-message').textContent = err;
//         });





//     //Съемка фото
//     const button = document.getElementById('take-photo'); //Кнопка

//     const audio = document.createElement('audio'); //Аудио
//     audio.src = './audio/click.mp3';

//     button.addEventListener('click', () => {
//         audio.pause();
//         audio.currentTime = 0;
//         audio.play();
//         takeSnapshot();

//     })


//     //Создание HTML Элемента из объекта
//     function createElement(block) {
//         if ((block === undefined) || (block === null) || (block === false)) {
//             return document.createTextNode('');
//         }
//         if ((typeof block === 'string') || (typeof block === 'number') || (block === true)) {
//             return document.createTextNode(block.toString());
//         }
//         if (Array.isArray(block)) {
//             return block.reduce((f, elem) => {
//                 f.appendChild(createElement(elem));

//                 return f;
//             }, document.createDocumentFragment());
//         }

//         const element = document.createElement(block.block || 'div');

//         [].concat(block.cls || []).forEach(
//             className => element.classList.add(className)
//         );

//         if (block.attrs) {
//             Object.keys(block.attrs).forEach(
//                 key => element.setAttribute(key, block.attrs[key])
//             );
//         }

//         if (block.content) element.appendChild(createElement(block.content));

//         return element;
//     }
//     //Создание объекта из сохраненной фотографии (в аргумент падает сохраненная фотография)
//     function createPhotoFromList(photo) {
//         return {
//             block: 'figure',
//             content: [{
//                 block: 'img',
//                 attrs: {
//                     src: photo
//                 }
//             }, {
//                 block: 'figcaption',
//                 content: [{
//                     block: 'a',
//                     attrs: {
//                         href: photo,
//                         download: 'snapshot.png'
//                     },
//                     content: [{
//                         block: 'i',
//                         cls: 'material-icons',
//                         content: ['file_download']
//                     }]
//                 }, {
//                     block: 'a',
//                     content: [{
//                         block: 'i',
//                         cls: 'material-icons',
//                         content: ['file_upload']
//                     }]
//                 }, {
//                     block: 'a',
//                     content: [{
//                         block: 'i',
//                         cls: 'material-icons',
//                         content: ['delete']
//                     }]
//                 }]

//             }]


//         }
//     };


//     function takeSnapshot() {

//         var hidden_canvas = document.createElement('canvas'),
//             video = document.querySelector('video'),


//             // Получаем размер видео элемента.
//             width = video.videoWidth,
//             height = video.videoHeight,

//             // Объект для работы с canvas.
//             context = hidden_canvas.getContext('2d');


//         // Установка размеров canvas идентичных с video.
//         hidden_canvas.width = width;
//         hidden_canvas.height = height;

//         // Отрисовка текущего кадра с video в canvas.
//         context.drawImage(video, 0, 0, width, height);

//         // Преобразование кадра в изображение dataURL.
//         var imageDataURL = hidden_canvas.toDataURL('image/png');

//         const newPhotoList = createElement(createPhotoFromList(imageDataURL));



//         newPhotoList.addEventListener('click', event => {
//             if (event.target.textContent === 'delete') {
//                 event.currentTarget.remove()
//             }
//             if (event.target.textContent === 'file_upload') {
//                 const fromData = new FormData()
//                 hidden_canvas.toBlob(blob => {
//                     fromData.append('image', blob);
//                     fetch('https://neto-api.herokuapp.com/photo-booth', {
//                             method: 'post',
//                             body: fromData
//                         })
//                         .then(console.log);
//                 })
//             }
//         })

//         document.querySelector('.list').appendChild(newPhotoList) //Заменить на инсерт бефор

//     }
// })

'use strict';
// Находим нужные элементы на странице
const photoAppBlock = document.querySelector('.app');
const photoControlsBlock = document.querySelector('.controls');
const takePhotoBtn = document.getElementById('take-photo');
const errorMessageBox = document.getElementById('error-message');
const photoList = document.querySelector('.list');
const photoBoothApiUrl = 'https://neto-api.herokuapp.com/photo-booth';

// Общие параметры отправляемого запроса
const requestOptions = {
  method: 'POST',
  'Content-Type': 'multipart/form-data'
};

// Переменные для доступа к файлу звука и контроллер ошибок
let makePhotoSound;
let errorChecking = false;

// Добавление недостающих элементов на страницу
//// Проверка доступности API
(function () {
  sendImage('');
})();

//// Выводим видео на экран
(function () {
  navigator.mediaDevices
    .getUserMedia({video: true, audio: false})
    .then(stream => {
      const video = document.createElement('video');
      video.src = URL.createObjectURL(stream);
      video.id = 'video-stream';

      // Если не возникало ошибок до этого момента, выводим видео на экран
      if (!errorChecking) {
        photoAppBlock.appendChild(video);
        photoControlsBlock.classList.add('visible');
      }
    })
    .catch(error => {
      errorChecking = true;
      errorMessageBox.textContent = 'Нет доступа к камере';
      errorMessageBox.classList.add('visible');
      console.error(error);
    });
})();

//// Создаём аудио-тег, оставляя ссылку на него в глобальном scope
(function () {
  makePhotoSound = document.createElement('audio');
  makePhotoSound.src = './audio/click.mp3';
  document.body.appendChild(makePhotoSound);
})();

// Обработка кликов по кнопке "Сделать фото"
takePhotoBtn.addEventListener('click', event => {
  try {
    // Получаем наш видео-тег
    const video = document.getElementById('video-stream');

    if (!video) {
      throw new Error('Не удалось найти видео-поток');
    }

    // Создаём канвас
    const canvas = document.createElement('canvas');
    const canvasContext = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvasContext.drawImage(video, 0, 0);

    // Получаем и обрабатываем снятое изображение
    const imageUrl = canvas.toDataURL();
    const imageHtml = captureImage(imageUrl);

    // Добавляем наше фото на страницу и, по системе товарища Павлова,
    // даём понять, что всё прошло хорошо
    if (!photoList.childNodes.length) {
      photoList.appendChild(imageHtml);
    } else {
      photoList.insertBefore(imageHtml, photoList.childNodes[0]);
    }
    makePhotoSound.play();

  } catch (e) {
    console.log('Возникла ошибка: ', e.message);
  }
});

// Шаблон создания HTML для изображения
function captureImage(imgPath) {
  // Создаю набор необходимых html-элементов
  const figure = document.createElement('figure');
  const img = document.createElement('img');
  const figcaption = document.createElement('figcaption');
  const anchor = document.createElement('a');
  const icon = document.createElement('i');

  // класс material-icons общий для всех тегов i
  icon.classList.add('material-icons');

  // Создаю набор html-элементов, согласно разметке
  const anchorDownload = anchor.cloneNode();
  const anchorUpload = anchor.cloneNode();
  const anchorDelete = anchor.cloneNode();

  const iconDownload = icon.cloneNode();
  const iconUpload = icon.cloneNode();
  const iconDelete = icon.cloneNode();

  // Настройка созданных тегов
  img.src = imgPath;

  iconDownload.textContent = 'file_download';
  anchorDownload.href = imgPath;
  anchorDownload.download = 'snapshot.png';
  anchorDownload.appendChild(iconDownload);

  iconUpload.textContent = 'file_upload';
  anchorUpload.appendChild(iconUpload);

  iconDelete.textContent = 'delete';
  anchorDelete.appendChild(iconDelete);

  // Наполнение объекта ответа функции (тег figure)
  [anchorDownload, anchorUpload, anchorDelete].forEach(node => {
    figcaption.appendChild(node);
  });
  figure.appendChild(img);
  figure.appendChild(figcaption);

  // Обработка кликов по кнопкам
  anchorDownload.addEventListener('click', event => {
    event.currentTarget.style.display = 'none';
  });

  anchorUpload.addEventListener('click', event => {
    // Столкнулся с проблемой, что из-за всяческих АдБлоков и БраузерСинков
    // теряется контекст event.currentTarget при получении ответа функции
    // sendImage... По-этому, пришлось сохранить ссылку на него в начале обработчика
    const clickedBtn = event.currentTarget;
    const response = sendImage(imgPath);

    response
      .then(apiResponse => clickedBtn.style.display = 'none')
      .catch(console.error);
  });

  anchorDelete.addEventListener('click', event => {
    figure.remove();
  });

  return figure;
}

// Отправка изображений на сервер
function sendImage(imageSrc) {
  // Результат работы функции - промис с ответом сервера или false
  return fetch(imageSrc)
    .then(response => response.blob())
    .then(imageBlob => {
      const sendingOptions = Object.assign({}, requestOptions);
      const requestData = new FormData();

      requestData.append('image', imageBlob);
      sendingOptions.body = requestData;
      return fetch(photoBoothApiUrl, sendingOptions);
    })
    .then(apiResponse => {
      if (apiResponse.status < 200 || apiResponse.status >= 300) {
        throw new Error('API availability issues');
      }

      return new Promise((done, fail) => {
        try {
          done(apiResponse);
        } catch (e) {
          fail(e);
        }
      });
    })
    .catch(error => {
      errorChecking = true;
      errorMessageBox.textContent = 'Проблема с доступностью API';
      errorMessageBox.classList.add('visible');
      console.error(error);

      return false;
    });
}