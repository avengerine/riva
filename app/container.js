const Bottle = require('bottlejs');
const config = require('./riva-config');
const redisClient = require('./clients/redis-client');


const di = new Bottle();
di.service('config', config);
di.factory('redisClient', (container) => {
	var conf = container.config;
	return new redisClient(conf);
});

module.exports = di;
