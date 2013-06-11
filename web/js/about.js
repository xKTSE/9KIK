App.populator('about', function (page) {

	p = $(page);

	p.find('.app-button.back').on('click', function(){
		_gaq.push(['_trackEvent', 'PageOpen', 'Home']);
	});


     
},
	function (page) {
  		if (App.platform === 'android'){
    		cards.browser.unbindBack(handleBackButton);
		}
	}
);