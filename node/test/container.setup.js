const Bottle = require('bottlejs')
const config = require('../app/riva-config')
const Logger = require('../app/logger')

const di = new Bottle()

di.service('config', config)
di.factory('logger', (container) => {
	return Logger(container.config.log)
})

module.exports = di
