const config = require('./riva-config');
const redis = require('redis');
const {promisify} = require('util');
const client = redis.createClient(config.redis.host);

module.exports = {
  ...client,
  getAsync: promisify(client.get).bind(client),
  setAsync: promisify(client.set).bind(client),
  keysAsync: promisify(client.keys).bind(client)
};