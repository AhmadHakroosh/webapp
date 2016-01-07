//General function to select DOM elements
function $ (selector) {
	return document.querySelector(selector);
}

function all (selector) {
	return document.querySelectorAll(selector);
}

//activate selected tab, deactivate others
function tabbing () {
	//add an event listener for each tab
	var tabs = all(".tab-link");

	for (var i = 0; i < tabs.length; i++) {
		tabs[i].addEventListener("click", function (e) {
			$(".active-tab-item").className = "tab-item";
			this.parentNode.className = "active-tab-item";

			setLinksList();
			setFrameLink();

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

//make ajax call, and request data from server
function requestData () {
	var request = new XMLHttpRequest();
	request.open("GET", "http://ahmadhakroosh.github.io/webapp/data/config.json", true);
	request.send();

	request.onreadystatechange = function () {
		if (request.readyState == 4 && request.status == 200) {
			var data = JSON.parse(request.responseText);
			
			//set notification
			setNotification(data.notification);

			//set nav-sections titles
			setMenus(data.quickActions);

			//initialize tabs data
			initializeTabs(data.tabsList);

			//set links list
			setLinksList();
		}
	};
}

//save the form inputs
function saveData () {
	var activeTab = $(".active-tab-item .tab-link").hash;
	var parameters = [], links = [];
	var parameters = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

	for (var i = 0; i < parameters.length; i++) {
		parameters[i] = parameters[i].replace(/%3A/g,':').replace(/%2F/g,'/').replace(/%26/g,'&').replace(/%25/g,'%');
		parameters[i] = parameters[i].slice(parameters[i].indexOf('=') + 1);
	}

	for (i = 0; i < all(".link-name").length; i++) {
		if (parameters[i] != "" && parameters[2 * i + 1] != "") {
			links[i] = {
				label : parameters[2 * i],
				url : parameters[2 * i + 1]
			}
		} else {
			continue;
		}
	}

	var request = new XMLHttpRequest();
	request.open("GET", "http://ahmadhakroosh.github.io/webapp/data/config.json", true);
	request.send();

	request.onreadystatechange = function () {
		if (request.readyState == 4 && request.status == 200) {
			var data = JSON.parse(request.responseText);
			
			for (var i = 0; i < data.tabsList.length; i++) {
				if (data.tabsList[i].hash == activeTab) {
					for (var i = 0; i < links.length; i++) {
						data.tabsList[i].links.push(links[i]);
					}
				}
			}
		}
	}
}

//set links list for selection
function setLinksList () {
	var activeTab = $(".active-tab-item .tab-link").hash;
	$(".links-action-list").innerHTML = $(activeTab + " .links").innerHTML;
	$(".active-link").innerHTML = $(".links-action-list .link-item").innerHTML;
	setFrameLink();
	$(".links-list").addEventListener("click" , function (e) {
		$(".links-action-list").style.display = $(".links-action-list").style.display == "none" ? "block" : "none";
	});
	var links = all(".links-action-list .link-item");
	for (var i = 0; i < links.length; i++) {
		links[i].addEventListener("click", function (e) {
			$(".active-link").innerHTML = this.innerHTML;
			setFrameLink();
		});
	}
}

//set the frame src attribute
function setFrameLink () {
	$(".frame-window").src = $(".active-link a").href;
	setExpandLink();
}

function setExpandLink () {
	$(".expand-icon").href = $(".frame-window").src;
}

function setNotification (notification) {
	$(".notifications").innerHTML = notification;
}

function setMenus (quickActions) {
	//set menus backgrounds and headers
	var navSections = all(".nav-section");
	for (var i = 0; i < navSections.length; i++) {
		navSections[i].innerHTML = "<p>" + quickActions[i].label + "</p>" + navSections[i].innerHTML;
		navSections[i].style.background = "black url(./img/icons/" + quickActions[i].icon + ".png) center top 60px no-repeat";
	}

	//set menu captions
	var menuCaptions = all(".menu-caption");
	for (var i = 0; i < menuCaptions.length; i++) {
		menuCaptions[i].innerHTML = "<p>" + quickActions[i].actionsLabel + "</p>";
	}

	//set links for quick actions menus
	var actionLists = all(".action-list");
	for (var i = 0; i < actionLists.length; i++) {
		actions = quickActions[i].actions;
		for (var j = 0; j < actions.length; j++) {
			actionLists[i].innerHTML += "<li class=\"action-list-item\"><a href=\"" + actions[j].url + "\">" + actions[j].label + "</a></li>"
		}
	}
}

function initializeTabs (tabsList) {
	var tabs = all(".tab-link");
	for (var i = 0; i < tabs.length; i++) {
		tabs[i].innerHTML = "<i class=\"" + tabsList[i].icon + "\"></i> " + tabsList[i].label;
	}

	//set tabs links
	var links;
	for (var i = 0; i < tabsList.length; i++) {
		links = tabsList[i].links;
		for (var j = 0; j < links.length; j++) {
			$(tabsList[i].hash + " .links").innerHTML += "<li class=\"link-item\"><a href=\"" + links[j].url + "\">" + links[j].label + "</a></li>";
		}
	}
}

//initialize the application view
function initialize () {
	//get the data from the server
	requestData();
	//activate tabbing functionality
	tabbing();
	//link event listener to save button
	$(".settings-form").addEventListener("submit", saveData());
}

window.onLoad = initialize();