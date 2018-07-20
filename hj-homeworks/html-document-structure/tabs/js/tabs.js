// Весь интерфейс вкладок реализован внутри тега с идентификатором tabs.
const tabs = document.getElementById('tabs');
// Список табов с классом tabs-nav. 
const tabsNav = tabs.querySelector('.tabs-nav');
// Список статей с классом tabs-content во вкладках.
const tabsContent = tabs.querySelector('.tabs-content').children;
const tabChildren = tabsNav.children; // дочерние элементы списка табов
const demoTab = tabsNav.firstElementChild; // первый элемент списка табов - демо-таб

// проходимся циклом по списку статей
Array.from(tabsContent).forEach((article, index) => {
    const tabIcon = article.dataset.tabIcon; // пиктограмма для таба 
    const tabTitle = article.dataset.tabTitle; // заголовок для таба
	const tabClone = demoTab.cloneNode(true); // клонируем демо-таб
	const tabsNew = tabsNav.appendChild(tabClone).firstElementChild; // первый дочерний элемент после клонирования демо-таба
	tabsNew.textContent = tabTitle; // добавим в таб заголовок
	tabsNew.classList.add(tabIcon); // добавляем класс, обозначающий пиктограмму таба.
    
    // При открытии отображается первая статья из списка.
	if (index > 0) {
		article.classList.add('hidden');
	}
    
});

tabsNav.removeChild(demoTab); // удаляем демо-таб
tabsNav.firstElementChild.classList.add('ui-tabs-active'); // добавляем текущим табом первую статью

// При клике на вкладку будет отображаться соответствующая ей статья из списка:
Array.from(tabChildren).forEach(tab => tab.addEventListener('click', activeTab));


function activeTab(event) {
    // чтобы задать текущий таб, добавим ему класс ui-tabs-active
	const currentTab = document.querySelector('.ui-tabs-active');
	currentTab.classList.remove('ui-tabs-active');
	event.currentTarget.classList.add('ui-tabs-active');

    // Для скрытия неактивных статей используем класс hidden
	Array.from(tabsContent).forEach(article => {
		article.classList.add('hidden');
		if (event.currentTarget.children[0].textContent === article.dataset.tabTitle) {
			article.classList.remove('hidden');
		}
        
	});
    
}
