'use strict';

(function() {
	var container = document.querySelector('.catalog');
	var tamplate = document.querySelector('#template');
	var jsonData = [];

	function getData() {
		console.log('111');
		var xhr = new XMLHttpRequest();
		xhr.onloadstart = function() {
      container.classList.add('pictures-loading');

    };
		xhr.open('GET', '//poslavsky.github.io/content.json');
		xhr.onload = function(e) {
      container.classList.remove('pictures-loading');
      var rawData = e.target.response;
      var loadedPictures = JSON.parse(rawData);
      parseData = loadedPictures;
			console.log(rawData);
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
	};

	getData();

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
})();
