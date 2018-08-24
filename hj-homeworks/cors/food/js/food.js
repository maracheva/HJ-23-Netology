'use strict';

const urlRecipe = 'https://neto-api.herokuapp.com/food/42';
const urlRating = 'https://neto-api.herokuapp.com/food/42/rating';
const urlConsumers = 'https://neto-api.herokuapp.com/food/42/consumers';

const pic = document.querySelector('[data-pic]');
const title = document.querySelector('[data-title]');
const ingredients = document.querySelector('[data-ingredients]');

const rating = document.querySelector('[data-rating]');
const star = document.querySelector('[data-star]');
const votes = document.querySelector('[data-votes]');

const consumers = document.querySelector('[data-consumers]');
const span = document.createElement('span');

function loadData(url) {
	return new Promise((done, fail) => {
		window['callback'] = done;
		const script = document.createElement('script');
		script.src = `${url}?jsonp=${'callback'}`;
		document.body.appendChild(script);
	});
}

function food(data) {
	pic.style.background = `url(${data.pic}) no-repeat`;
	title.textContent = data.title;
	ingredients.textContent = data.ingredients.join(', ');

	return urlRating;
}

function rating(data) {
	rating.textContent = data.rating;
	star.style.width = `${data.rating *10}%`
	votes.textContent = `${data.votes} оценок`;

	return urlConsumers;
}

function user(data) {
	Array.from(data.consumers).forEach( element => {
		consumers.appendChild(document.createElement('img'));
		consumers.lastElementChild.src = element.pic;
		consumers.lastElementChild.setAttribute('title', element.name);
	});

	consumers.appendChild(span);
	consumers.lastElementChild.textContent = `(+${data.total})`;
}

loadData(urlRecipe)
	.then(food)
	.then(res => loadData(res))
	.then(rating)
	.then(res => loadData(res))
	.then(user)
	.catch(error => {
		console.log(error);
	});