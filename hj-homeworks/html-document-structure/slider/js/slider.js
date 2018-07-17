//Весь интерфейс слайдера реализован внутри тега с классом slider.
const slidersAll = document.querySelectorAll('.slider');
// Определяем слайды через цикл 
for (let slider of slidersAll) {
    Slider(slider);
}

// функция управления слайдами
function Slider(container) {
    //Кнопки навигации по слайдеру помещены в тег с классом slider-nav и помечены дата-атрибутом data-action:
    const sliderNav = container.querySelector('.slider-nav');
    const first = sliderNav.querySelector('[data-action="first"]'); // первый слайд
    const prev = sliderNav.querySelector('[data-action="prev"]'); // переходит к предыдущему слайду;
    const next = sliderNav.querySelector('[data-action="next"]'); // переходит к следующему слайду;
    const last = sliderNav.querySelector('[data-action="last"]'); // последний слайд
    //Список слайдов доступен в теге с классом slides. Каждый слайд является дочерним тегом списка слайдов.
    const slides = container.querySelector('.slides');

    slides.firstElementChild.classList.add('slide-current'); // При открытии текущим выбран первый слайд.
    let currentSlide = slides.querySelector('.slide-current'); // текущий слайд имеет класс slide-current.
    // подключаем обновление контрола
    updateControl(currentSlide);  
    // обработка события на кнопке
    sliderNav.addEventListener('click', moveSlide); 
    
    // функция листания слайдов
    function moveSlide({target}) {
        // проверка на отключение текущего элемента
        if (target.classList.contains('disabled')) {
            return;
        }
    
        //  отключение текущего элемента
        currentSlide.classList.remove('slide-current');
        // выбираем активный элемент в зависимости от контрола
        switch(target) {
            case first:
                currentSlide = slides.firstElementChild;
                break;
            case prev:
                currentSlide = currentSlide.previousElementSibling;
                break;
            case next:
                currentSlide = currentSlide.nextElementSibling;
                break;
            case last:
                currentSlide = slides.lastElementChild;
                break;
        }
        // подключаем обновление контрола
        updateControl(currentSlide);
        // подключение текущего элемента
        currentSlide.classList.add('slide-current');
        
    }
    
    // обновляем контролы
    function updateControl(currentSlide) {
        first.classList.toggle('disabled', !currentSlide.previousElementSibling);
        prev.classList.toggle('disabled', !currentSlide.previousElementSibling);
        next.classList.toggle('disabled', !currentSlide.nextElementSibling);
        last.classList.toggle('disabled', !currentSlide.nextElementSibling);
    }
}

