//General function to select HTML objects into the document
function $ (selector) {
	return document.querySelector(selector);
}

var dropdowns = { 
	/**
	* Add a 'mouseover' and 'keydown' events to open / close dropdowns
	*/
	init : function () {
		
	},

	closeDropdown : function () {

	},

	openDropdown : function () {

	}
}

/*function notify () {
	var request = new XMLHttpRequest();
	request.open("GET", "./data/config.json");
	request.send();

	request.onsreadytatechange = function () {
		if (request.readyState == 4 && request.status == 200) {
			$(".notifications").innerHTML = request.responseText.;
		};
	}
}

notify();
console.log("hello");*/