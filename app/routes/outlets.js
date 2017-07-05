const requireDir = require('require-dir');
const Router = require('../core/router');
const authMiddleware = require('../auth/middleware/authMiddleware');
const checkEndpointAccessMiddleware = require('../auth/middleware/checkEndpointAccessMiddleware');

module.exports = new Router(requireDir('./outlets'), [authMiddleware(), checkEndpointAccessMiddleware(4)]);