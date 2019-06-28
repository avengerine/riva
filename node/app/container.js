const RedisClient = require('./clients/redis-client')
const config = require('./riva-config')
const Bottle = require('bottlejs')
const Logger = require('./logger')

const Di = new Bottle()

Di.service('config', config)
Di.factory('logger', (container) => {
  return Logger(container.config.log)
})
Di.instanceFactory('redisClient', (container) => {
  return new RedisClient(container.config.redis)
})

module.exports = Di
