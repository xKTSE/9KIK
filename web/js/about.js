App.populator('about', function (page) {

	p = $(page);

	p.find('.app-button.back').on('click', function(){
		_gaq.push(['_trackEvent', 'PageOpen', 'Home']);
	});

	p.find('#refresh').on('click',function(){
		App.removeFromStack(-2);
	});

});