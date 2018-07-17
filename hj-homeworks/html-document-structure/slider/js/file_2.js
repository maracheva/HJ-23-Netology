'use strict';

function Slider(container) {
	container.querySelector('li').classList.add('slide-current');
	const next = container.querySelector('a[data-action="next"]');
	const prev = container.querySelector('a[data-action="prev"]');
	const first = container.querySelector('a[data-action="first"]');
	const last = container.querySelector('a[data-action="last"]');

	prev.classList.add('disabled');
	first.classList.add('disabled');

	next.addEventListener('click', (event) => moveSlider(true));
	prev.addEventListener('click', (event) => moveSlider(false));
	first.addEventListener('click', (event) => jumpLastSlider(false));
	last.addEventListener('click', (event) => jumpLastSlider(true));

	function moveSlider(isForward) {
		const currentSlide = container.querySelector('.slide-current');
		const activatedSlide = isForward ? currentSlide.nextElementSibling : currentSlide.previousElementSibling;

		currentSlide.classList.remove('slide-current');
		activatedSlide.classList.add('slide-current'); 

		next.classList.toggle('disabled', activatedSlide.nextElementSibling == null);
		last.classList.toggle('disabled', activatedSlide.nextElementSibling == null);
		prev.classList.toggle('disabled', activatedSlide.previousElementSibling == null);
		first.classList.toggle('disabled', activatedSlide.previousElementSibling == null);
        
	}

	function jumpLastSlider(isForward) {
		const currentSlide = container.querySelector('.slide-current');
		const activatedSlide = isForward ? currentSlide.parentElement.lastElementChild : currentSlide.parentElement.firstElementChild;
		currentSlide.classList.remove('slide-current');
		activatedSlide.classList.add('slide-current'); 

		next.classList.toggle('disabled', activatedSlide.nextElementSibling == null);
		last.classList.toggle('disabled', activatedSlide.nextElementSibling == null);
		prev.classList.toggle('disabled', activatedSlide.previousElementSibling == null);
		first.classList.toggle('disabled', activatedSlide.previousElementSibling == null);

		
	}
}

const slider = document.querySelectorAll('.slider');
Array.from(slider).forEach(item => Slider(item));


