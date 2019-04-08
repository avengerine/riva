const express = require('express')
const app = express()
const rivaCtrlInit = require('./controllers/riva')

module.exports = (di) => {
  const rivaCtrl = rivaCtrlInit(di)

  app.get('/', rivaCtrl.healthCheck)
  app.get('/riva/:key', rivaCtrl.getKey)
  app.post('/riva/:key', rivaCtrl.setKey)

  return app
}
