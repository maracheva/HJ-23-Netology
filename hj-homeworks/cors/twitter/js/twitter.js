'use strict';

	const wallpaper = document.querySelector('[data-wallpaper]');
	const username = document.querySelector('[data-username]');
	const description = document.querySelector('[data-description]');
	const pic = document.querySelector('[data-pic]');
	const tweets = document.querySelector('[data-tweets]');
	const followers = document.querySelector('[data-followers]');
	const following = document.querySelector('[data-following]');

function callback (data) {
	wallpaper.src = data.wallpaper;
	username.textContent = data.username;
	description.textContent = data.description;
	pic.src = data.pic;
	tweets.value = data.tweets;
	followers.value = data.followers;
	following.value = data.following;
}

const url = `https://neto-api.herokuapp.com/twitter/jsonp`; 
const script = document.createElement('script');
script.setAttribute('src', url);

document.body.appendChild(script);
