(function(){

	window.onLoad = function() {
		window.loaded = true;
		window.reallyLoaded = true;
		chrome.extension.sendRequest('');
	};
	
	if (!window.loaded) {
		window.onload = window.onLoad;
	} else {
		window.reallyLoaded = true;
	}

}());