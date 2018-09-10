'use strict';

const app = document.querySelector('.app');
const controls = document.querySelector('.controls');
const takePhotoBth = controls.querySelector('#take-photo');
const errorMessage = document.getElementById('error-message');
const listPhoto = document.querySelector('.list');

const video = document.createElement('video');
const audio = document.createElement('audio');

audio.src = './audio/click.mp3';

// Запрашиваем доступ к веб-камере. Если доступ не предоставлен, показываем ошибку
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices
    .getUserMedia({video: true, audio: false})
    .then(stream => {
      video.src = URL.createObjectURL(stream);
      video.play();
      app.appendChild(video);

      controls.style.display = 'block';
      // Обрабатываем событие на кнопке «Сделать снимок» 
      takePhotoBth.addEventListener('click', () => getPhoto(stream));
    })
    .catch(error => {
      errorMessage.textContent = `Нет доступа к камере. Ошибка ${error.name}`;
      errorMessage.style.display = 'block';
    });
} else {
  errorMessage.textContent = 'Ваш браузер не поддерживает mediaDevices';
  errorMessage.style.display = 'block';
}

function getPhoto(stream) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d'); // Объект для работы с canvas.
  let newListPhoto, dataUrl;
  // Установка размеров canvas идентичных с video.
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  ctx.drawImage(video, 0, 0);

  dataUrl = canvas.toDataURL();
  newListPhoto = createImg(dataUrl);
  // обрабатываем события на кнопках
  newListPhoto.addEventListener('click', (e) => {
    switch(e.target.textContent) {
      // При клике на кнопке «Загрузить» отправляем выбранное фото на сервер.
      case 'file_download':
        e.target.style.display = 'none';
        break;
      // При клике на кнопке «Скачать» сохраняем выбранное фото на диске.
      case 'file_upload':
        fetchRequest(dataUrl, e.target);
        break;
      // При клике на кнопке «Удалить» удаляем фото из списка
      case 'delete':
        newListPhoto.parentNode.removeChild(newListPhoto);
        break;
    }
  });

  listPhoto.appendChild(newListPhoto);

  audio.play();
}

// Шаблон создания HTML для изображения
function createImg(imgUrl) {
  return {
      block: 'figure',
      content: [{
          block: 'img',
          attrs: {
              src: imgUrl
          }
      }, {
          block: 'figcaption',
          content: [{
              block: 'a',
              attrs: {
                  href: imgUrl,
                  download: 'snapshot.png'
              },
              content: [{
                  block: 'i',
                  cls: 'material-icons',
                  content: ['file_download']
              }]
          }, {
              block: 'a',
              content: [{
                  block: 'i',
                  cls: 'material-icons',
                  content: ['file_upload']
              }]
          }, {
              block: 'a',
              content: [{
                  block: 'i',
                  cls: 'material-icons',
                  content: ['delete']
              }]
          }]

      }]
  }
};
// function createImg(imgUrl) {
//   return el('figure', {}, [
//     el('img', {src: imgUrl}),
//     el('figcaption', {}, [
//       el('a', {href: imgUrl, download: 'snapshot.png'}, [
//         el('i', {class: 'material-icons'}, 'file_download')
//       ]),
//       el('a', {}, [
//         el('i', {class: 'material-icons'}, 'file_upload')
//       ]),
//       el('a', {}, [
//         el('i', {class: 'material-icons'}, 'delete')
//       ])
//     ])
//   ]);
// }


// function el(tagName, attributes, children) {
//   const element = document.createElement(tagName);

//   if (typeof attributes === 'object') {
//     Object.keys(attributes).forEach(i => element.setAttribute(i, attributes[i]));
//   }

//   if (typeof children === 'string') {
//     element.textContent = children;
//   } else if (children instanceof Array) {
//     children.forEach(child => element.appendChild(child));
//   }

//   return element;
// }

// функция отправки формы
function fetchRequest(imgData, target) {
  const data = new FormData();
  const blob = dataUriToBlob(imgData);

  data.append('image', blob);

  fetch('https://neto-api.herokuapp.com/photo-booth', {
    body: data,
    credentials: 'same-origin',
    method: 'POST'
  })
  .then(result => {
    if (200 <= result.status && result.status < 300) {
      return result;
    }
    throw new Error(result.statusText);
  })
  .then(result => {
    console.log(result);
    target.style.display = 'none';
  });
}

function dataUriToBlob(dataURI) {
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  const array = [];
  const byteString = atob(dataURI.split(',')[1]);

  for(let i = 0; i < byteString.length; i++) {
    array.push(byteString.charCodeAt(i));
  }

  return new Blob([new Uint8Array(array)], { type: mimeString });
}
