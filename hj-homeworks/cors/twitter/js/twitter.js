'use strict';

	const wallpaper = document.querySelector('[data-wallpaper]');
	const username = document.querySelector('[data-username]');
	const description = document.querySelector('[data-description]');
	const pic = document.querySelector('[data-pic]');
	const tweets = document.querySelector('[data-tweets]');
	const followers = document.querySelector('[data-followers]');
	const following = document.querySelector('[data-following]');

function callback (userData) {
	wallpaper.src = userData.wallpaper;
	username.textContent = userData.username;
	description.textContent = userData.description;
	pic.src = userData.pic;
	tweets.value = userData.tweets;
	followers.value = userData.followers;
	following.value = userData.following;
}

const url = `https://neto-api.herokuapp.com/twitter/jsonp`; 
const script = document.createElement('script');
script.setAttribute('src', url);

document.body.appendChild(script);
