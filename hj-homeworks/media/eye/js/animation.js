
'use strict';

document.addEventListener('mousemove', event => {
    const eye = document.querySelector('.big-book__pupil'); //Глаз
    const width = document.querySelector('body').offsetWidth;
    const height = document.querySelector('body').offsetHeight;
    const mousemove = [event.clientX, event.clientY] //Определяем положение мыши
    // Положение центра глаза
    const eyeCenter = [eye.getBoundingClientRect().left + (eye.offsetWidth / 2), eye.getBoundingClientRect().top + (eye.offsetHeight / 2)] 
    //Длина вектора
    const vectorLength = Math.sqrt(Math.pow((mousemove[0] - eyeCenter[0]), 2) + Math.pow((mousemove[1] - eyeCenter[1]), 2)) 

    function changeSizeEya(length) {
        // Размер зрачка должен меняться в диапазоне от 1 до 3. 
        // 1 - курсор мыши близко к краю окна браузера. 3 — курсор мыши около глаза.
        let size = 3 - (length * 2 / width) - (length * 2 / height);
        if (size < 1) {
            size = 1;
        }
        // размер зрачка        
        document.querySelector('.big-book__pupil').style.setProperty('--pupil-size', size);
    }

    function changePositionMouse() {
        // Смещения по обеим осям должны находиться в диапазоне от -30px до 30px
        // смещение зрачка от центра по оси X
        const positionX = 30 * (mousemove[0] - eyeCenter[0]) / (width / 2);
        document.querySelector('.big-book__pupil').style.setProperty('--pupil-x', `${positionX}px`);
        // смещение зрачка от центра по оси Y
        const positionY = 30 * (mousemove[1] - eyeCenter[1]) / (height / 2);
        document.querySelector('.big-book__pupil').style.setProperty('--pupil-y', `${positionY}px`);
    }
    
    changeSizeEya(vectorLength)
    changePositionMouse()
})