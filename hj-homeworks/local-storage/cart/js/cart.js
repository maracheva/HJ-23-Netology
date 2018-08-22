'use strict';
// При открытии страницы необходимо отобразить выбор размера и цвета с учетом доступности.
// Любые изменения размера и цвета должны запоминаться на стороне клиента, 
// и при повторном открытии должно быть выбрано последнее актуальное значение.

// При нажатии на кнопку «Добавить в корзину» необходимо отправить данные 
// формы методом POST на адрес https://neto-api.herokuapp.com/cart. 
// Данные формы необходимо дополнить идентификатором товара. 
// Он доступен в атрибуте data-product-id формы. Его нужно отправить в запросе полем productId.

// В случае успеха вернется новое состояние корзины — обновите корзину, используя эти данные. 
// В случае ошибки вы получите объект со свойством error, равным true, 
// и свойством message с описанием причины ошибки.

// Для удаления товара из корзины отправьте его идентификатор 
// полем productId на адрес https://neto-api.herokuapp.com/cart/remove методом POST. 
// В случае успеха вы получите новое состояние корзины. Ошибка выглядит так же, как и при добавлении.

// Для получения списка доступных цветов запросите JSON по адресу https://neto-api.herokuapp.com/cart/colors
// Для получения списка доступных размеров запросите JSON по адресу https://neto-api.herokuapp.com/cart/sizes
// Для получения текущего состояния корзины запросите JSON по адресу https://neto-api.herokuapp.com/cart

// Варианты цвета подставляются в тело тега с идентификатором colorSwatch
// Варианты размера подставляются в тело тега с идентификатором sizeSwatch
// Корзина доступна в теге с идентификатором quick-cart
// Форма отправки заказа имеет идентификатор AddToCartForm

const colorSwatch = document.querySelector('#colorSwatch');
const sizeSwatch = document.querySelector('#sizeSwatch');
const quickCart = document.querySelector('#quick-cart');
const cartForm = document.querySelector('#AddToCartForm');
const urls = [
  'https://neto-api.herokuapp.com/cart/colors',
  'https://neto-api.herokuapp.com/cart/sizes',
  'https://neto-api.herokuapp.com/cart'
];
Promise.all(urls.map(url => fetch(url)))
  .then(resp => Promise.all(resp.map(result => result.json())))
  .then(([dataColors, dataSizes, dataCart]) => {
    snippetSwatchColor(dataColors);
    snippetSwatchSize(dataSizes);
    snippetCart(dataCart);
  });

// Добавление цветов
function snippetSwatchColor(data) {
    data.forEach(function (item) {
        let available;
        let	checked;

        if (item.isAvailable) {
            available = 'available';
            checked = 'checked';
        } else {
            available = 'soldout';
            checked = 'disabled';
        } 

        colorSwatch.innerHTML += `
            <div data-value="${item.type}" class="swatch-element color ${item.type} ${available}">
                <div class="tooltip">${item.title}</div>
                <input quickbeam="color" id="swatch-1-${item.type}" type="radio" name="color" value="${item.type}" ${checked}>
                <label for="swatch-1-${item.type}" style="border-color: red;">
                    <span style="background-color: ${item.code};"></span>
                    <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
                </label>
            </div>`
    })
}


// Добавление размеров
function snippetSwatchSize(data) {
    data.forEach(function (item) {
        let available;
        let checked;

        if (item.isAvailable) {
            available = 'available';
            checked = 'checked';
        } else {
            available = 'soldout';
            checked = 'disabled';
        } 
        
        sizeSwatch.innerHTML += `
            <div data-value="${item.type}" class="swatch-element plain ${item.type} ${available}">
                <input id="swatch-0-${item.type}" type="radio" name="size" value="${item.type}" ${checked}>
                <label for="swatch-0-${item.type}">
                    ${item.title}
                    <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
                </label>
            </div>`
    })

    if (localStorage.index) {
        const arrIndex = JSON.parse(localStorage.index),
        inputSwatches = document.querySelectorAll('.swatches input');
        arrIndex.forEach(function (item) {
            inputSwatches[item].checked = true;
        })
    }

}

// Добавление товара в корзину
function snippetCart(data) {
    let priceSum = 0;
	data.forEach(function (item) {
		quickCart.innerHTML = `
			<div class="quick-cart-product quick-cart-product-static" id="quick-cart-product-${item.id}" style="opacity: 1;">
				<div class="quick-cart-product-wrap">
					<img src="${item.pic}" title="${item.title}">
					<span class="s1" style="background-color: #000; opacity: .5">$${item.price}</span>
					<span class="s2"></span>
				</div>
				<span class="count hide fadeUp" id="quick-cart-product-count-${item.id}">${item.quantity}</span>
				<span class="quick-cart-product-remove remove" data-id="${item.id}"></span>
			</div>`;
		priceSum = item.price * item.quantity;
	})
   
	quickCart.innerHTML += `
		<a id="quick-cart-pay" quickbeam="cart-pay" class="cart-ico open">
			<span>
				<strong class="quick-cart-text">Оформить заказ<br></strong>
				<span id="quick-cart-price">${priceSum}</span>
			</span>
		</a>`
   
	const quickCartPay = document.querySelector('#quick-cart-pay');
	(data.length === 0) ? quickCartPay.classList.remove('open') : quickCartPay.classList.add('open');
	
	const removeBth = document.querySelector('.remove');
	removeBth.addEventListener('click', (event) => {
        const id = event.target.dataset.id;
        const formData = new FormData(); 
	    formData.append('productId', removeBth.dataset.id);
	    fetchRequest(formData, 'https://neto-api.herokuapp.com/cart/remove');
    });
}

function fetchRequest(data, url) {
    fetch(url, {
      body: data,
      method: 'POST'
    })
    .then((result) => {
      if (200 <= result.status && result.status < 300) {
        return result;
      }
      throw new Error(response.statusText);
    })
    .then((result) => result.json())
    .then((data) => {
      if (data.error) {
        console.error(data.message);
      } else {
        snippetCart(data);
      }
    });
}


