const Bottle = require('bottlejs');
const config = require('../app/riva-config');

const di = new Bottle();

di.service('config', config);

module.exports = di;
