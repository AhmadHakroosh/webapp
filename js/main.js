//General function to select DOM elements
function $ (selector) {
	return document.querySelector(selector);
}

function all (selector) {
	return document.querySelectorAll(selector);
}

var reports = [
	{name : "Corporate", url : ""},
	{name : "Simple", url : ""},
	{name : "Business", url : ""}
];

var dashboards = [
	{name : "Google", url : "https://www.google.com"},
	{name : "Yahoo", url : "https://www.yahoo.com"},
	{name : "Microsoft", url : "https://www.microsoft.com"}
];

var guides = [
	{name : "Stack Overflow", url : "https://www.stackoverflow.com"},
	{name : "W3Schools", url : "https://www.w3schools.com"}
];

//set the links of each menu
function setLinks (linksHeader, linksList) {
	var listSelector = "." + linksHeader + " .menu .action-list";
	var link = "";
	for (var i = 0; i < linksList.length; i++) {
		link = "<li class=\"action-list-item\"><a href=\"" + linksList[i].url + "\">" + linksList[i].name + "</a></li>";
		$(listSelector).innerHTML += link;
	};
}

//initialize the application view
function initialize () {
	//set links of each menu
	setLinks("reports", reports);
	setLinks("dashboards", dashboards);
	setLinks("guides", guides);

	tabbing();

	console.log("hello");
}

//activate selected tab, deactivate others
function tabbing () {
	//add an event listener for each tab
	var tabs = all(".tab-item a");

	for (var i = 0; i < tabs.length; i++) {
		tabs[i].addEventListener("click", function (e) {
			$(".active-tab-item").className = "tab-item";
			this.parentNode.className = "active-tab-item";
		});
	}
	$(".tab-item").className = "active-tab-item";
}

function activateTab (tabName) {
	
}

window.onLoad = initialize();