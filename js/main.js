//General function to select DOM elements
function $ (selector) {
	return document.querySelector(selector);
}

function all (selector) {
	return document.querySelectorAll(selector);
}

//initialize the application view
function initialize () {
	requestData();

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

			//hide settings icon and links lists for My Folders tab
			if (this.hash == "#my-folders") {
				$("#settings").style.display = "none";
				$(".links-list").style.display = "none";
			//unhide for other tabs
			} else {
				$("#settings").style.display = "block";
				$(".links-list").style.display = "inline-block";
			}


		});
	}
	$(".tab-item").className = "active-tab-item";
}

function requestData () {
	var request = new XMLHttpRequest();
	request.open("GET", "http://ahmadhakroosh.github.io/webapp/data/config.json", true);
	request.send();

	request.onreadystatechange = function () {
		if (request.readyState == 4 && request.status == 200) {
			var data = JSON.parse(request.responseText);
			$(".notifications").innerHTML = data.notification;

			//set nav-sections titles
			var navSections = all(".nav-section");
			for (var i = 0; i < navSections.length; i++) {
				navSections[i].innerHTML = "<p>" + data.quickActions[i].label + "</p>" + navSections[i].innerHTML;
				navSections[i].style.background = "black url(./img/icons/" + data.quickActions[i].icon + ".png) center top 60px no-repeat";
			}
			//set menu-caption titles
			var menuCaptions = all(".menu-caption");
			for (var i = 0; i < menuCaptions.length; i++) {
				menuCaptions[i].innerHTML = "<p>" + data.quickActions[i].actionsLabel + "</p>";
			}
			//set links for quick actions menus
			var actionLists = all(".action-list");
			for (var i = 0; i < actionLists.length; i++) {
				actions = data.quickActions[i].actions;
				for (var j = 0; j < actions.length; j++) {
					actionLists[i].innerHTML += "<li class=\"action-list-item\"><a href=\"" + actions[j].url + "\">" + actions[j].label + "</a></li>"
				}
			}
			//initialize tabs data
			var tabs = all(".tab-link");
			var tabsList = data.tabsList;
			for (var i = 0; i < tabs.length; i++) {
				tabs[i].innerHTML = "<i class=\"" + tabsList[i].icon + "\"></i> " + tabsList[i].label;
			}

			var linksList = $(".links-list");
			var activeTab = $(".active-tab-item a");
			var tab = findTab(activeTab, data.tabsList);
			console.log("hello");
		}
	};
}

function saveData () {

}

function findTab (tab, tabsList) {
	for (var i = 0; i < tabsList.length; i++) {
		if (tabsList[i].hash == tab.hash) {
			return tabsList[i];
		}
	}
}

window.onLoad = initialize();