const express = require('express')
const rivaCtrlInit = require('./controllers/riva')
const pathToSwaggerUi = require('swagger-ui-dist').absolutePath()
const app = express()

module.exports = (di) => {
  const rivaCtrl = rivaCtrlInit(di)
  
  app.use(express.static(pathToSwaggerUi))
  app.get('/', rivaCtrl.healthCheck)
  app.get('/riva/:key', rivaCtrl.getKey)
  app.post('/riva/:key', rivaCtrl.setKey)

  return app
}
