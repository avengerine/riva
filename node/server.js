const di = require('./app/container')
const app = require('./app/app')(di)

app.listen(di.container.config.app.port, () => {
  console.log('Listening on port ' + di.container.config.app.port)
  di.container.logger.info('Listening on port ' + di.container.config.app.port)
})
