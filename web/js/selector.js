App.populator('selector', function(page){
	var p = $(page);

	p.find('#fb').on('click', function(){
		_gaq.push(['_trackEvent', 'PageOpen', 'Failblog']);
		App.load('home', {content: 'Failblog', color: '#00AAFF'});
	});

	p.find('#mb').on('click', function(){
		_gaq.push(['_trackEvent', 'PageOpen', 'Memebase']);
		App.load('home', {content: 'Memebase', color: '#9ACD32'});
	});

	p.find('#cb').on('click', function(){
		_gaq.push(['_trackEvent', 'PageOpen', 'Cheezburger']);
		App.load('home', {content: 'Cheezburger', color: 'orange'});
	});

	p.find('#im').on('click', function(){
		_gaq.push(['_trackEvent', 'PageOpen', 'Imgur']);
		App.load('home', {content: 'Imgur', color: '#FF0099'});
	});
});