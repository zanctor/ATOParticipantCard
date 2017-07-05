const addUserTokenMiddleware = require('../../auth/middleware/addUserTokenMiddleware');
const comparePasswordsMiddleware = require('../../auth/middleware/comparePasswordsMiddleware');
const findUserByEmailMiddleware = require('../middleware/findUserByEmailMiddleware');

module.exports = (router) => {

    router.post('/authenticate',
        findUserByEmailMiddleware(),
        comparePasswordsMiddleware(),
        addUserTokenMiddleware(),
        (req, res) => {
            res.jsonSuccess(req.user);
        });

};