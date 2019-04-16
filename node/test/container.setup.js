const Bottle = require('bottlejs')
const config = require('../app/riva-config')
const td = require('testdouble')
const Logger = require('../app/logger')

const di = new Bottle()

di.service('config', config)
di.factory('logger', (container) => {
	const logConf = container.config.log

	return Logger(logConf)
})

module.exports = di
