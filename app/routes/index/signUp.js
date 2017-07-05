const addUserTokenMiddleware = require('../../auth/middleware/addUserTokenMiddleware');
const hashPasswordMiddleware = require('../../auth/middleware/hashPasswordMiddleware');
const createModelMiddleware = require('../middleware/createModelMiddleware');
const {UserModel} = require(global.GlobalAppVars.appModelsFilePath);

module.exports = (router) => {

    router.post('/sign-up',
        hashPasswordMiddleware(),
        createModelMiddleware(UserModel, 'user'),
        addUserTokenMiddleware(),
        (req, res) => {
            res.jsonSuccess(req.user);
        });

};