const fs = require("fs");
const env = process.env.NODE_ENV || 'default'; // 'dev' or 'test'

const env_conf = JSON.parse(
	fs.readFileSync('./config/' + env + '.json').toString());

const config = {
 app: {
   port: parseInt(process.env.APP_PORT) || env_conf.app.port
 },
 redis: {
   host: process.env.REDIS_HOST || env_conf.redis.host,
   port: parseInt(process.env.REDIS_PORT) || env_conf.redis.port
 }
};

module.exports = config;
