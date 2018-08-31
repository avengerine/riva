const Bottle = require('bottlejs');
const config = require('../riva-config');

const di = new Bottle();
di.service('config', config);

module.exports = di;
