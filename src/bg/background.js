// var jqueryFile = 'var s = document.createElement("script");s.src = chrome.extension.getURL("jquery.js");s.onload = function() {    this.parentNode.removeChild(this)};(document.head||document.documentElement).appendChild(s);'

chrome.browserAction.onClicked.addListener(function(tab) {
	console.log('Button Clicked');
	chrome.tabs.executeScript(null, {file: '/src/js/onSaveClick.js'}, handleError);
});

chrome.extension.onRequest.addListener(function(color){
	chrome.browserAction.setIcon({path: '/src/icons/icon16' + color + '.png'});
});

chrome.tabs.onActivated.addListener(function(){
	console.log('Tab Activated');
	chrome.tabs.executeScript(null, {file: "/src/js/clearData.js"});
	chrome.tabs.executeScript(null, {file: "/src/js/checkTab.js"});
	chrome.tabs.executeScript(null, {file: "/src/js/onActivate.js"});
	chrome.browserAction.setIcon({path: '/src/icons/icon16.png'});
});

chrome.tabs.onUpdated.addListener(function(tabID, changeInfo, tab){
	if (changeInfo.url) {
		console.log('Tab Updated');
		chrome.tabs.executeScript(null, {file: "/src/js/clearData.js"});
		chrome.tabs.executeScript(null, {file: "/src/js/checkTab.js"});
		console.log(chrome.browserAction.onClicked);
	}
});

chrome.windows.onFocusChanged.addListener(function(){
    console.log('Window Changed');
    chrome.tabs.executeScript(null, {file: "/src/js/clearData.js"});
    chrome.tabs.executeScript(null, {file: "/src/js/checkTab.js"});
    chrome.tabs.executeScript(null, {file: "/src/js/onActivate.js"}, function() {
        chrome.browserAction.setIcon({path: '/src/icons/icon16.png'});
    });
});

chrome.commands.onCommand.addListener(function(command) {
    console.log('Keyboard shortcut used: ', command);
    chrome.tabs.executeScript(null, {file: '/src/js/onSaveClick.js'}, handleError);
});

function handleError(results) {
    if (results === undefined) {
        chrome.browserAction.setIcon({path: '/src/icons/icon16r.png'});
    }
}