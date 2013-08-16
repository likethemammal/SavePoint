chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.executeScript(null, {file: 'src/js/onSaveClick.js'}, handleError);
});

chrome.extension.onRequest.addListener(function(color){
	chrome.browserAction.setIcon({path: '/src/icons/icon16' + color + '.png'});
});

chrome.tabs.onActivated.addListener(function(){
	chrome.tabs.executeScript(null, {file: "src/js/clearData.js"});
	chrome.tabs.executeScript(null, {file: "src/js/checkTab.js"});
	chrome.tabs.executeScript(null, {file: "src/js/onActivate.js"}, function() {
        chrome.browserAction.setIcon({path: '/src/icons/icon16.png'});
    });
	chrome.browserAction.setIcon({path: '/src/icons/icon16.png'});
});

chrome.tabs.onUpdated.addListener(function(tabID, changeInfo, tab){
	if (changeInfo.url) {
		chrome.tabs.executeScript(null, {file: "src/js/clearData.js"});
		chrome.tabs.executeScript(null, {file: "src/js/checkTab.js"});
	}
});

chrome.commands.onCommand.addListener(function(command) {
    chrome.tabs.executeScript(null, {file: 'src/js/onSaveClick.js'}, handleError);
});

function handleError(results) {
    if (results === undefined) {
        chrome.browserAction.setIcon({path: '/src/icons/icon16r.png'});
    }
}