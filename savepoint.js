(function(){

	var SP = SP || {}

	SP.setSavePoint = function() {
		var currentScroll = window.scrollY;
		
		if (window.lastScroll) {
			window.scrollTo(0, window.lastScroll);
		} else {
			window.lastScroll = currentScroll;
			console.log("Extension Clicked");
			chrome.extension.sendRequest('g');
		}
	}
	
	SP.checkScroll = function() {
		var rangeMin = 200;
		var rangeMax = 200;
				
		var onScroll = function (ev) {
			if (window.scrollY <= window.lastScroll + rangeMax && window.scrollY >= window.lastScroll - rangeMin) {
				console.log('I am within');
				chrome.extension.sendRequest('g');
			} else {
				console.log('I am not');
				chrome.extension.sendRequest('y');
			}
		}

		if (!window.onscroll) {
			console.log('Scroll Event Listener added');
			window.onscroll = onScroll;
		} else if (window.onscroll.toString() !== onScroll.toString()) {
			console.log('Scroll Event Listener added');
			window.onscroll = onScroll;
		}
	}
	
	SP.setSavePoint();
	SP.checkScroll();
	
}());