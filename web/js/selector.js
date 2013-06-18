App.populator('selector', function(page){
	var p = $(page);

	p.find('#fb').on('click', function(){

		if(navigator.online){
			_gaq.push(['_trackEvent', 'PageOpen', 'Failblog']);
			App.load('home', {content: 'Failblog', color: '#00AAFF'});
		}else{
			App.dialog({title:"Network Error Connection", text: "Please make sure you have a network connection then try again."});
		}
	});

	p.find('#mb').on('click', function(){

		if(navigator.online){
		_gaq.push(['_trackEvent', 'PageOpen', 'Memebase']);
		App.load('home', {content: 'Memebase', color: '#9ACD32'});
		}else{
			App.dialog({title:"Network Error Connection", text: "Please make sure you have a network connection then try again."});
		}
	});

	p.find('#cb').on('click', function(){
		
		if(navigator.online){
		_gaq.push(['_trackEvent', 'PageOpen', 'Cheezburger']);
		App.load('home', {content: 'Cheezburger', color: 'orange'});
		}else{
			App.dialog({title:"Network Error Connection", text: "Please make sure you have a network connection then try again."});
		}
	});

	p.find('#im').on('click', function(){
		
		if(navigator.online){
		_gaq.push(['_trackEvent', 'PageOpen', 'Imgur']);
		App.load('home', {content: 'Imgur', color: '#FF0099'});
		}else{
			App.dialog({title:"Network Error Connection", text: "Please make sure you have a network connection then try again."});
		}
	});
});