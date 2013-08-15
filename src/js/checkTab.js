(function(){

	console.warn('Check Tab Fired');

	window.onLoad = function() {
		console.log('Window Loaded');
		window.loaded = true;
		window.reallyLoaded = true;
		chrome.extension.sendRequest('');
	};
	
	if (!window.loaded) {
		console.warn('Window.onload set');
		window.onload = window.onLoad;
	} else {
		window.reallyLoaded = true;
	}

}());