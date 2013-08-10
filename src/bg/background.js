
var code = "(function(){var currentScroll = window.scrollY;if (window.lastScroll){window.scrollTo(0, window.lastScroll);} else {window.lastScroll = currentScroll;}}());"

// var code = 'console.log(window.scrollY)'

chrome.browserAction.onClicked.addListener(function(tab) {
	console.log(chrome.tabs);
	chrome.tabs.executeScript(null, {code: code});
});
