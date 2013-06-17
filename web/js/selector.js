App.populator('selector', function(page){
	var p = $(page);

	p.find('#fb').on('click', function(){
		App.load('home', {content: 'Failblog', color: '#00AAFF'});
	});

	p.find('#mb').on('click', function(){
		App.load('home', {content: 'Memebase', color: '#9ACD32'});
	});

	p.find('#cb').on('click', function(){
		App.load('home', {content: 'Cheezburger', color: 'orange'});
	});

	p.find('#im').on('click', function(){
		App.load('home', {content: 'Imgur', color: '#FF0099'});
	});
});