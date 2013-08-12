(function(){

console.log(chrome.runtime);

	var currentScroll = window.scrollY;
	if (window.lastScroll) {
		window.scrollTo(0, window.lastScroll);
	} else {
		window.lastScroll = currentScroll;
		console.log("Extension Clicked");
	}
	
	chrome.extension.sendRequest('#F77F00');
}());