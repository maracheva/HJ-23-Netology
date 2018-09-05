'use strict';

document.addEventListener('mousemove', event => {
    const eye = document.querySelector('.big-book__pupil'); //Глаз
    const width = document.querySelector('body').offsetWidth;
    const height = document.querySelector('body').offsetHeight;
    // положение центра глаза
    const eyeCenter = [eye.getBoundingClientRect().left + (eye.offsetWidth / 2), eye.getBoundingClientRect().top + (eye.offsetHeight / 2)] 
    //Длина вектора
    const vectorLength = Math.sqrt(Math.pow((mousemove[0] - eyeCenter[0]), 2) + Math.pow((mousemove[1] - eyeCenter[1]), 2)) 
    // положение курсора мыши
    const mousemove = [event.clientX, event.clientY]; 

    function changeSizeEye(length) {
        let size = 3 - (length * 2 / width) - (length * 2 / height)
        // Размер зрачка должен меняться в диапазоне от 1 до 3. 1 - курсор мыши близко к краю окна браузера. 3 — курсор мыши около глаза.
        if (size < 1) size = 1;
        // размер зрачка
        document.querySelector('.big-book__pupil').style.setProperty('--pupil-size', size);
    }

    changeSizeEye(vectorLength)

    function changePositionMouse() {
        // Смещения по обеим осям должны находиться в диапазоне от -30px до 30px
        const positionX = 30 * (mousemove[0] - eyeCenter[0]) / (width / 2);
        const positionY = 30 * (mousemove[1] - eyeCenter[1]) / (height / 2);
        // смещение зрачка от центра по оси X
        document.querySelector('.big-book__pupil').style.setProperty('--pupil-x', `${positionX}px`);
        // смещение зрачка от центра по оси Y
        document.querySelector('.big-book__pupil').style.setProperty('--pupil-y', `${positionY}px`);
    }
    changePositionMouse()
})
