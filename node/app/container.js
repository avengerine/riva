const Bottle = require('bottlejs')
const config = require('./riva-config')
const RedisClient = require('./clients/redis-client')

const Di = new Bottle()

Di.service('config', config)
Di.factory('redisClient', (container) => {
  const conf = container.config

  return new RedisClient(conf)
})

module.exports = Di
