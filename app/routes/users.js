const requireDir = require('require-dir');
const Router = require('../core/router');
const authMiddleware = require('../auth/middleware/authMiddleware');

module.exports = new Router(requireDir('./users'), [authMiddleware()]);
