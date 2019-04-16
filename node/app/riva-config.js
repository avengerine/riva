const fs = require('fs')
const env = process.env.NODE_ENV || 'default' // 'dev' or 'test'

function init () {
  const envConf = JSON.parse(fs.readFileSync('./config/' + env + '.json').toString())

  return {
    'app': {
      'port': parseInt(process.env.APP_PORT) || envConf.app.port
    },
    'redis': {
      'host': process.env.REDIS_HOST || envConf.redis.host,
      'port': parseInt(process.env.REDIS_PORT) || envConf.redis.port
    },
    "log": {
      "path": process.env.APP_LOG_PATH || envConf.log.path,
      "level": process.env.APP_LOG_LEVEL || envConf.log.level
    }
  }
}

module.exports = init
