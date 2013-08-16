(function(){

	if (window.onLoad) {
		window.loaded = true;
		window.reallyLoaded = true;
	}
	
	if (document.getElementById('savepoint')) {
		var img = document.getElementById('savepoint');
		img.style.display = "none";
	}

}());