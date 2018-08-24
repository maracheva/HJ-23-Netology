'use strict';

const username = document.querySelector('[data-name]');
const description = document.querySelector('[data-description]');
const pic = document.querySelector('[data-pic]');
const position = document.querySelector('[data-position]');
const technologies = document.querySelector('[data-technologies]');
const content = document.querySelector('.content');

function loadData(url) {
	// const functionName = 'callback';
	return new Promise((done, fail) => {
		window['callback'] = done;
		const script = document.createElement('script');
		script.src = `${url}?jsonp=${'callback'}`;
		document.body.appendChild(script);
	});
}

function profile(data) {
	username.textContent = data.name;
	description.textContent = data.description;
	pic.src = data.pic;
	position.textContent = data.position;

	loadData(`https://neto-api.herokuapp.com/profile/${data.id}/technologies`)
		.then(technology);
	content.style.display = 'initial';
}

function technology(data) {
	Array.from(data).forEach( element => {
		const span = document.createElement('span');
		technologies.appendChild(span);
		technologies.lastElementChild.classList.add('devicons');
		technologies.lastElementChild.classList.add(`devicons-${element}`);
	});
}

loadData('https://neto-api.herokuapp.com/profile/me')
	.then(profile);
