chrome.browserAction.onClicked.addListener(function(tab) {
	console.log(chrome.tabs);
	chrome.tabs.executeScript(null, {code: 'console.log(window)'});
});