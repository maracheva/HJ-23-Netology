//Весь интерфейс слайдера реализован внутри тега с классом slider.
const sliderAll = document.querySelector('.slider');
//Список слайдов доступен в теге с классом slides. Каждый слайд является дочерним тегом списка слайдов.
const slides = slider.querySelector('.slides');
const currentSlide = slides.querySelector('.slide-current'); // текущий слайд имеет класс slide-current.

// Определяем слайды через цикл 
for (let slider of sliderAll) {
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
    
    
    slides.firstElementChild.classList.add('slide-current'); // При открытии текущим выбран первый слайд.
    
//    currentSlide.classList.remove('slide-current');
    
    updateControl(currentSlide);
    
    
    // обработка события на кнопке
    sliderNav.addEventListener('click', clickButtons); 
}


// функция-обработчик листания слайдов
function clickButtons({target}) {
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
    // подключение текущего элемента
    currentSlide.classList.add('slide-current');
    // подключаем обновление контрола
    updateControls();
    
}                          

//updateControls();
// обновляем контролы
function updateControl(currentSlide) {
      first.classList.toggle('disabled', !currentSlide.previousElementSibling);
    
      prev.classList.toggle('disabled', !currentSlide.previousElementSibling);
    
      next.classList.toggle('disabled', !currentSlide.nextElementSibling);
    
      last.classList.toggle('disabled', !currentSlide.nextElementSibling);
}