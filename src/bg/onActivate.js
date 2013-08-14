(function(){

	if (window.onLoad) {
		console.warn('Window.loaded set');
		window.loaded = true;
		window.reallyLoaded = true;
	}
	
	if (document.getElementById('savepoint')) {
		var img = document.getElementById('savepoint');
		img.style.display = "none";
	}

}());