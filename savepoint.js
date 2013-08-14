(function(){
	if (window.reallyLoaded) {

		var SP = SP || {};
		var rangeMin = 200;
		var rangeMax = 0;
		
		SP.toggleSavePoint = function() {
			var currentScroll = window.scrollY;
			
			if (!currentScroll) {
				currentScroll = 1;
			}
			
			console.log(currentScroll); 
					
			if (window.lastScroll) {
				if (window.scrollY <= window.lastScroll + rangeMax && window.scrollY >= window.lastScroll - rangeMin) {
					window.lastScroll = null;
					chrome.extension.sendRequest('');
					var img = document.getElementById('savepoint');
					img.style.display = "none";
				} else {
					animateScroll();
				}
			} else {
				window.lastScroll = currentScroll;
				console.log("Extension Clicked", window.lastScroll);
				chrome.extension.sendRequest('g');
				
				var imgScroll = currentScroll + 30;
				var imgPath = chrome.extension.getURL("icons/icon48g.png");

				
				if (document.getElementById('savepoint')) {
					var img = document.getElementById('savepoint');
					img.style.display = "block";
					img.style.top = imgScroll + "px";
					img.setAttribute("src", imgPath);
					img.style.zIndex = findHighestZIndex() + 1;
				} else {
					var body=document.getElementsByTagName("body")[0];
					var img=document.createElement("img");
					var imgPath = chrome.extension.getURL("icons/icon48g.png");
					console.log(imgPath);
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
		}
		
		SP.checkScroll = function() {
					
			var onScroll = function (ev) {
				if (window.lastScroll) {
					if (window.scrollY <= window.lastScroll + rangeMax && window.scrollY >= window.lastScroll - rangeMin) {
						console.log('I am within');
						chrome.extension.sendRequest('g');
						var img = document.getElementById('savepoint');
						var imgPath = chrome.extension.getURL("icons/icon48g.png");
						img.setAttribute('src', imgPath);
					} else {
						console.log('I am not');
						chrome.extension.sendRequest('y');
						var img = document.getElementById('savepoint');
						var imgPath = chrome.extension.getURL("icons/icon48y.png");
						img.setAttribute('src', imgPath);
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
					}, (250/30)*i);
				} else {
					setTimeout(function(){
						window.scrollTo(0, window.scrollY - scrollPoint);
					}, (250/30)*i);
				}
			}
		}
		
		function findHighestZIndex()
{
  var elems = document.getElementsByTagName("*");
  var highest = 0;
  for (var i = 0; i < elems.length; i++)
  {
    var zindex=document.defaultView.getComputedStyle(elems[i],null).getPropertyValue("z-index");
    if ((zindex > highest) && (zindex != 'auto'))
    {
      highest = zindex;
    }
  }
    console.log(highest);

  return highest;
}
	}
}());