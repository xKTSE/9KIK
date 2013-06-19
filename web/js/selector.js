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


	function launch(src, src_color){

		if(navigator.onLine === true){
			_gaq.push(['_trackEvent', 'PageOpen', src]);
			App.load('home', {	content: src,
								color: src_color
							 });
		}else{
			App.dialog({	title:"Network Error Connection",
							text: "Please make sure you have a network connection then try again."
						});
		}
	}



});