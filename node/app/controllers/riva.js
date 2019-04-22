module.exports = (di) => {
  let logger = di.container.logger
  let redisClient = di.container.redisClient.instance()

  let healthCheck = (req, res) => {
    logger.info('Healthcheck OK')
    res.status(200).send('OK')
  }

  let getKey = async (req, res) => {
    const { key } = req.params
    const found = await redisClient.keysAsync(key)
    if (!found.length) { 
      logger.info('Not found ' + JSON.stringify(key, null, 2))
      return res.status(404).send('Not found')
    }
    const rawData = await redisClient.getAsync(key)
    logger.info('Found key: ' + JSON.stringify(key, null, 2) + ' Value: ' + JSON.stringify(rawData, null, 2))
    return res.json(JSON.parse(rawData))
  }

  let setKey = async (req, res) => {
    const { key } = req.params
    const value = req.query
    let result = await redisClient.setAsync(key, JSON.stringify(value))
    if (result === 'OK') { 
      logger.info('Value stored ' + JSON.stringify(value, null, 2) + ' in key ' + JSON.stringify(key, null, 2))
      return res.status(201).send('Stored!') 
    }
    logger.error('Error storing value ' + JSON.stringify(value, null, 2) + ' Result: ' + JSON.stringify(result, null, 2))
    return res.status(500).send('Error!')
  }

  return {
    healthCheck: healthCheck,
    getKey: getKey,
    setKey: setKey
  }
}
