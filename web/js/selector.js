App.populator('selector', function(page){
	var p = $(page);

	p.find('#fb').on('click', function(){
		launch('Failblog','#00AAFF');
	});

	p.find('#mb').on('click', function(){
		launch('Memebase','#9ACD32');
	});

	p.find('#cb').on('click', function(){
		launch('Cheezburger','orange');
	});

	p.find('#im').on('click', function(){
		launch('Imgur', '#FF0099');
	});


	function launch(_src, _color){

		if(navigator.onLine === true){

			_gaq.push(['_trackEvent', 'PageOpen', _src]);
			var transition = 'slide\-left';

			if(App.platform === 'ios' && App.platformVersion < 4){
				transition = 'instant';
			}

			App.load('home', {	src: _src,
								color: _color
							 }, transition);
		}else{
			App.dialog({	title:"Network Connection Error",
							text: "Please make sure you have a network connection then try again."
						});
			_gaq.push(['_trackEvent', 'Error', 'Network Connection Error']);
		}
	}



});