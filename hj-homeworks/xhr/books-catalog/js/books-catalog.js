const xhr = new XMLHttpRequest();
const content = document.getElementById('content');

xhr.addEventListener('load', onLoad);

xhr.open('GET', 'https://netology-fbb-store-api.herokuapp.com/book/');
xhr.send();

function onLoad({target}) {
  const data = JSON.parse(target.responseText);

  content.innerHTML = Array.from(data).reduce((memo, item) => {
    return memo + `<li data-title="${item.title}" data-author="${item.author.name}" data-info="${item.info}" data-price="${item.price}">
                    <img src="${item.cover.small}" alt="${item.title}">
                  </li>`;
  }, '');
}