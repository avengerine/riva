const Bottle = require('bottlejs');
const redisClient = require('./redis-client');
const config = require('./riva-config');

const di = new Bottle();
di.service('config', config);
di.factory('redisClient', function (container) {
	var conf = container.config;
	return new redisClient(conf);
});

module.exports = di;