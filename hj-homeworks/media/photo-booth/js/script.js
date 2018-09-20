'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const app = document.querySelector('.app');
    const controls = document.querySelector('.controls');
    const errorMessage = document.querySelector('#error-message');
    const takePhotoBth = document.querySelector('#take-photo');
    const listPhoto = document.querySelector('.list');

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Запрашиваем доступ к веб-камере. Если доступ не предоставлен, показываем ошибку
    navigator.mediaDevices
        .getUserMedia({
            video: true,
            audio: false
        })
        .then((stream) => {
            document.querySelector('.app').appendChild(getElem(video));
            document.querySelector('.video').srcObject = stream;
        })
        .catch(err => {
            errorMessage.style.display = 'block';
            errorMessage.innerText = err;
        });

    // обработка событий
    app.addEventListener('mouseenter', () => {
        controls.style.display = 'block'
    });
    app.addEventListener('mouseleave', () => {
        controls.style.display = ''
    });

    takePhotoBth.addEventListener('click', () => {
        takePhotoBth.appendChild(getElem(el('audio', {
            'src': './audio/click.mp3'
        })))
        takePhotoBth.getElementsByTagName('audio')[0].play();
        createPhoto();

    })

    // делаем фото
    function createPhoto() {
        const video = document.querySelector('video');
        // Установка размеров canvas идентичных с video.
        canvas.width = video.videoHeight;
        canvas.height = video.videoWidth;

        // копируем текущий кадр видеотега в canvas
        ctx.drawImage(video, 0, 0);

        img.childs[1].childs["0"].props.href = canvas.toDataURL();
        img.childs["0"].props.src = canvas.toDataURL();

        // обновляем картинку на странице
        if (listPhoto.firstChild) {
            listPhoto.insertBefore(getElem(img), listPhoto.firstChild)
        } else {
            listPhoto.appendChild(getElem(img));
        }

        const figcaption = document.querySelectorAll('figcaption');
        Array.from(figcaption).forEach(item => {
            item.addEventListener('click', getFormData);
        })
    }

    function getFormData(event) {
        if (event.target.parentNode === event.currentTarget.children[1]) {
            event.currentTarget.children[1].setAttribute('href', '');
            event.currentTarget.children[1].style.opacity = 0;
            event.preventDefault();
            const data = new FormData()
            canvas.toBlob(blob => {
                data.append('image', blob);
                // отправка формы
                fetch('https://neto-api.herokuapp.com/photo-booth', {
                    method: 'post',
                    body: data
                })
                .then(console.log);
            })
        }

        if (event.target.parentNode === event.currentTarget.children[0]) {
            event.currentTarget.children[0].setAttribute('href', '');
            event.currentTarget.children[0].style.opacity = 0;
        }

        if (event.target.parentNode === event.currentTarget.children[2]) {
            event.currentTarget.parentNode.parentNode.removeChild(event.currentTarget.parentNode);
        }

    }
    
    // функция создания DOM элемента
    function getElem(node) {
        const element = document.createElement(node.name);
        if ((typeof node === 'string')) {
            return document.createTextNode(node.toString());
        }

        if (Array.isArray(node)) {
            return node.reduce((f, elem) => {
                f.appendChild(getElem(elem));
                return f;
            }, document.createDocumentFragment());
        }

        if (node.props) {
            Object.keys(node.props).forEach(
                key => element.setAttribute(key, node.props[key])
            );
        }

        if (node.childs) {
            element.appendChild(getElem(node.childs))
        };

        return element;
    }

    //DOM elements
    const el = (name, props, ...childs) => ({
        name,
        props,
        childs
    });
    const video = el('video', {
        'autoplay': '',
        'class': 'video'
    });
    const img = el('figure', null,
        el('img', {
        'src': canvas.toDataURL()
        }),
        el(
        'figcaption',
        null,
        el(
            'a', {
            'href': canvas.toDataURL(),
            'download': "snapshot.png"
            },
            el('i', {
            'class': 'material-icons'
            }, 'file_download')),
        el(
            'a',
            null,
            el('i', {
            'class': 'material-icons'
            }, 'file_upload')),
        el(
            'a',
            null,
            el('i', {
            'class': 'material-icons'
            }, 'delete'))
        )
    );

})
