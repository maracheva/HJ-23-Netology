'use strict';

list.addEventListener('click', hadleListClick);

function hadleListClick(event) {
	if (event.target.classList.contains('add-to-cart')) {
		event.preventDefault();
		addToCart(event.target.dataset);	
	};	
}
