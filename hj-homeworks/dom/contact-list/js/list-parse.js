const contactsList = document.querySelector('.contacts-list'); // селектор по классу .contacts-list
const data = JSON.parse(loadContacts()); // распарсим JSON
contactsList.innerHTML = ''; // уберем исходный элемент

// Пройдемся циклом по всем тегам li с классом .contacts-list и поменяем текст напоявляющейся после нажатия на кнопку карточки, данные берем из JSON.

for (let item of data) {
  contactsList.innerHTML += `<li data-email="${item.email}" data-phone="${item.phone}">
                              <strong>${item.name}</strong>
                            </li>`;
}

