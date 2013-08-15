(function(){
	window.onscroll = null;
	window.loaded = null;
	window.reallyLoaded = null;
	window.lastScroll = null;
	chrome.extension.sendRequest('inactive');
}());