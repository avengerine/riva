const Bottle = require('bottlejs')
const config = require('./riva-config')
const RedisClient = require('./clients/redis-client')
const Logger = require('./logger')

const Di = new Bottle()

Di.service('config', config)
Di.factory('redisClient', (container) => {
  const redisConf = container.config.redis

  return new RedisClient(redisConf)
})
Di.factory('logger', (container) => {
  const logConf = container.config.log

  return Logger(logConf)
})

module.exports = Di
