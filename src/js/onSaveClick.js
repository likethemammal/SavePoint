(function(){

	if (window.reallyLoaded) {

		var SP = SP || {};
		var rangeMin = 200;
		var rangeMax = 40,
            img;

        if (document.getElementById('savepoint')) {
            img = document.getElementById('savepoint');
        }  else {
            img = document.createElement("img");
        }

        SP.toggleSavePoint = function() {
			var currentScroll = window.scrollY;

            if (!currentScroll) {
				currentScroll = 1;
			}

			if (window.lastScroll) {
				if (window.scrollY <= window.lastScroll + rangeMax && window.scrollY >= window.lastScroll - rangeMin) {
					window.lastScroll = null;
					chrome.extension.sendRequest('');
					img.style.display = "none";
				} else {
					animateScroll();
				}
			} else {
				window.lastScroll = currentScroll;

				chrome.extension.sendRequest('g');
				
				var imgScroll = currentScroll + 30;
				var imgPath = chrome.extension.getURL("src/icons/icon48g.png");

				if (document.getElementById('savepoint')) {
					img.style.display = "block";
					img.style.top = imgScroll + "px";
					img.setAttribute("src", imgPath);
					img.style.zIndex = findHighestZIndex() + 1;
				} else {
					var body=document.getElementsByTagName("body")[0];
					img.setAttribute("id","savepoint");
					img.setAttribute("src", imgPath);
					body.insertBefore(img,body.firstChild);
					img.style.position = "absolute";
					img.style.top = imgScroll + "px";
					img.style.right = "75px";
					img.style.width = "50px";
					img.style.height = "50px";
					img.style.zIndex = findHighestZIndex() + 1;
				}
			}
		};
		
		SP.checkScroll = function() {
					
			var onScroll = function (ev) {
				if (window.lastScroll) {
					if (window.scrollY <= window.lastScroll + rangeMax && window.scrollY >= window.lastScroll - rangeMin) {
						chrome.extension.sendRequest('g');
						var imgPath = chrome.extension.getURL("src/icons/icon48g.png");
						img.setAttribute('src', imgPath);
					} else {
						chrome.extension.sendRequest('y');
						var imgPath = chrome.extension.getURL("src/icons/icon48y.png");
						img.setAttribute('src', imgPath);
					}
				}
			};

			if (!window.onscroll) {
				window.onscroll = onScroll;
			} else if (window.onscroll.toString() !== onScroll.toString()) {
				window.onscroll = onScroll;
			}
		};
		
		SP.toggleSavePoint();
		SP.checkScroll();
		
		function animateScroll() {	
			for (var i = 0; i < 30; i++) {
				var scrollPoint = Math.abs((window.lastScroll-window.scrollY)/30);

				if (window.scrollY < window.lastScroll) {
					setTimeout(function(scrollPoint){
						window.scrollTo(0, window.scrollY + scrollPoint);
					}, (250/30)*i, scrollPoint);
				} else {
					setTimeout(function(scrollPoint){
						window.scrollTo(0, window.scrollY - scrollPoint);
					}, (250/30)*i, scrollPoint);
				}
			}
		}
		
		function findHighestZIndex() {
            var elems = document.getElementsByTagName("*"),
                highest = 0;

            for (var i = 0; i < elems.length; i++) {
                var zindex = document.defaultView.getComputedStyle(elems[i],null).getPropertyValue("z-index");

                if ((zindex > highest) && (zindex != 'auto')) {
                    highest = zindex;
                }
            }

            return highest;
        }
	}

}());