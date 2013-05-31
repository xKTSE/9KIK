var feedparser = require('../../node_modules/feedparser');

exports.getData = function (callback) {
    feedparser.parseUrl('http://9gagrss.com/feed/').on('complete',callback);
};