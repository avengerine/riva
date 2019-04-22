const td = require('testdouble')

const di = require('../app/container')

di.decorator('redisClient', (redisClient) => {
  let fakeRedis = td.object(['getAsync', 'setAsync', 'keysAsync'])
  td.when(fakeRedis.getAsync('foundkey')).thenReturn('{"key": "value"}')
  td.when(fakeRedis.getAsync('unknown')).thenReturn('null')
  td.when(fakeRedis.setAsync('storevalue', td.matchers.anything())).thenReturn('OK')
  td.when(fakeRedis.keysAsync('foundkey')).thenReturn(['foundkey'])
  td.when(fakeRedis.keysAsync('unknown')).thenReturn([])

  redisClient = (function () {
    return {
      instance: function () {
        return fakeRedis
      }
    }
  })()

  return redisClient
})

const app = require('../app/app')(di)

module.exports = app