// var jqueryFile = 'var s = document.createElement("script");s.src = chrome.extension.getURL("jquery.js");s.onload = function() {    this.parentNode.removeChild(this)};(document.head||document.documentElement).appendChild(s);'

var currentTab = 0;

chrome.browserAction.onClicked.addListener(function(tab) {
	console.log(chrome.tabs);
	// chrome.tabs.executeScript(null, {code: jqueryFile});
	// chrome.tabs.executeScript(null, {code: jqueryNearestFile});
	chrome.tabs.executeScript(null, {file: 'savepoint.js'});
});

chrome.extension.onRequest.addListener(function(color){
	chrome.browserAction.setIcon({path: 'icons/icon16' + color + '.png'});
});

chrome.tabs.onActivated.addListener(function(tab){
	chrome.tabs.executeScript(null, {file: 'tabManager.js'});
});