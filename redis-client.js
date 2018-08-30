const redis = require('redis');
const {promisify} = require('util');

function init(config){
	const client = redis.createClient(config.redis.host);
	return {
		...client,
		getAsync: promisify(client.get).bind(client),
		setAsync: promisify(client.set).bind(client),
		keysAsync: promisify(client.keys).bind(client)
	};
}

module.exports = init