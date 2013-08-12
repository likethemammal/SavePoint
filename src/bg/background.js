// var jqueryFile = 'var s = document.createElement("script");s.src = chrome.extension.getURL("jquery.js");s.onload = function() {    this.parentNode.removeChild(this)};(document.head||document.documentElement).appendChild(s);'

var currentTab = 0;

chrome.browserAction.onClicked.addListener(function(tab) {
	console.log('Button Clicked');
	// chrome.tabs.executeScript(null, {code: jqueryFile});
	chrome.tabs.executeScript(null, {file: 'savepoint.js'});
});

chrome.extension.onRequest.addListener(function(color){
	chrome.browserAction.setIcon({path: 'icons/icon16' + color + '.png'});
});

chrome.tabs.onActivated.addListener(function(){
	console.log('Tab Activated');
	chrome.tabs.executeScript(null, {file: "src/bg/clearData.js"});
	chrome.tabs.executeScript(null, {file: "src/bg/onActivate.js"});
});

chrome.tabs.onUpdated.addListener(function(){
	console.log('Tab Updated');
	chrome.tabs.executeScript(null, {file: "src/bg/clearData.js"});
	chrome.tabs.executeScript(null, {file: "src/bg/checkTab.js"});
});

// chrome.tabs.onCreated.addListener(function(){
	// console.log('Tab Created');
	// chrome.tabs.executeScript(null, {file: "src/bg/clearData.js"});
	// chrome.tabs.executeScript(null, {file: "src/bg/checkTab.js"});
// });

