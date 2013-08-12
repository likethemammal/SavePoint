(function(){

	var SP = SP || {};
	var rangeMin = 200;
	var rangeMax = 200;
	
	SP.toggleSavePoint = function() {
		var currentScroll = window.scrollY;
		
		if (window.lastScroll) {
			if (window.scrollY <= window.lastScroll + rangeMax && window.scrollY >= window.lastScroll - rangeMin) {
				window.lastScroll = null;
				chrome.extension.sendRequest('');
			} else {
				animateScroll();
			}
		} else {
			window.lastScroll = currentScroll;
			console.log("Extension Clicked", window.lastScroll);
			chrome.extension.sendRequest('g');
		}
	}
	
	SP.checkScroll = function() {
				
		var onScroll = function (ev) {
			if (window.lastScroll) {
				if (window.scrollY <= window.lastScroll + rangeMax && window.scrollY >= window.lastScroll - rangeMin) {
					console.log('I am within');
					chrome.extension.sendRequest('g');
				} else {
					console.log('I am not');
					chrome.extension.sendRequest('y');
				}
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
	
	SP.toggleSavePoint();
	SP.checkScroll();
	
	function animateScroll() {	
		for (var i = 0; i < 30; i++) {
			var scrollPoint = Math.abs((window.lastScroll-window.scrollY)/30);

			if (window.scrollY < window.lastScroll) {
				setTimeout(function(){
					window.scrollTo(0, window.scrollY + scrollPoint);
				}, (500/30)*i);
			} else {
				setTimeout(function(){
					window.scrollTo(0, window.scrollY - scrollPoint);
				}, (500/30)*i);
			}
		}
	}
	
}());