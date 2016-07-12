'use strict';

(function() {
	var container = document.querySelector('.catalog');
	var templateElement = document.querySelector('#template');
	var elementToClone;
	var itemsList = [];
	var ITEMS_LOAD_URL = '//poslavsky.github.io/content.json';

	if('content' in templateElement) {
		elementToClone = templateElement.content.querySelector('.card');
	} else {
		elementToClone = templateElement.querySelector('.card');
	}

	var getItemElement = function(data, itemContainer) {
		var element = elementToClone.cloneNode(true);
		element.querySelector('.card__title').textContent = data.title;
    element.querySelector('.card__descr').textContent = data.descr;
		element.querySelector('.card__tag').textContent = data.tags;
		element.querySelector('.card__img').src = ('img/pic/'+data.pic1);
		container.appendChild(element);
  	return element;
	}

	var getItems = function(callback) {
		var xhr = new XMLHttpRequest();
		xhr.onload = function(evt) {
	    var loadedData = JSON.parse(evt.target.response);
	    callback(loadedData);
	  };

		xhr.open('GET', ITEMS_LOAD_URL);
  	xhr.send();
	};

	var renderItems = function(itemsList) {
		itemsList.forEach(function(item) {
			getItemElement(item, container);
		});
	};

	getItems(function(loadedItems) {
		itemsList = loadedItems;
		renderItems(itemsList);
	})
})();

(function() {
	var container = document.querySelector('.catalog');
	var tamplate = document.querySelector('#template');
	var jsonData = [];
	function getData() {
		var xhr = new XMLHttpRequest();
		xhr.onloadstart = function() {
      container.classList.add('pictures-loading');
			xhr.open('GET', '//poslavsky.github.io/content.json');
    };
		xhr.onload = function(e) {
      container.classList.remove('pictures-loading');
      var rawData = e.target.response;
      var loadedPictures = JSON.parse(rawData);
      parseData = loadedPictures;
      renderPictures(loadedPictures);
    };
		xhr.send();
		xhr.onerror = function() {
      container.classList.add('pictures-failure');
    };
		xhr.timeout = 10000;
    xhr.ontimeout = function() {
      container.classList.add('pictures-failure');
    };
	}

	function getElementFromTamplate(data) {
		var element;
		if ('content' in template) {
      element = template.content.childNodes[1].cloneNode(true);
    } else {
      element = template.children[0].cloneNode(true);
    }

		element.querySelector('.card__title').textContent = data.title;
    element.querySelector('.card__descr').textContent = data.descr;
		element.querySelector('.card__tag').textContent = data.tag;

		backgroundImage.src = data.url;
	}

	function renderPictures(picturesArray) {
    container.innerHTML = '';
    var fragment = document.createDocumentFragment();
    picturesArray.forEach(function(picture) {
      var element = getElementFromTemplate(picture);
      fragment.appendChild(element);
    });
    container.appendChild(fragment);
  }
});
