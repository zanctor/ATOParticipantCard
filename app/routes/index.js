const requireDir = require('require-dir');
const Router = require('../core/router');

module.exports = new Router(requireDir('./index'));