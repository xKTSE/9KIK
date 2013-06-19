var feedparser = require('../../node_modules/feedparser');
 
exports.getData = function (src, callback) {
    switch(src){
    	case 'Failblog':
    		feedparser.parseUrl('http://feeds.feedburner.com/failblog?format=xml').on('complete',callback);
    		break;
    	case 'Memebase':
    		feedparser.parseUrl('http://feeds.feedburner.com/Memebase?format=xml').on('complete',callback);
    		break;
    	case 'Cheezburger':
    		feedparser.parseUrl('http://feeds.feedburner.com/ICanHasCheezburger?format=xml').on('complete',callback);
    		break;
    	case 'Imgur':
    		feedparser.parseUrl('http://feeds.feedburner.com/ImgurGallery?format=xml').on('complete',callback);
    		break;
    }
};