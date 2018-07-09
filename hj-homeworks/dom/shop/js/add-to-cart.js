const add = document.querySelectorAll('.add'); 
const cartCount = document.querySelector('#cart-count');
const cartTotalPrice = document.querySelector('#cart-total-price');

let counter = 0;
let totalPrice = 0;

function addToCart(){
	cartCount.innerHTML = ++counter;
	totalPrice += +this.dataset.price;
	cartTotalPrice.innerHTML = getPriceFormatted(totalPrice);	
}

for (const key of add){ 
	key.addEventListener('click', addToCart); 
}