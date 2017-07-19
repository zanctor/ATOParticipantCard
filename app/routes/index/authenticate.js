const addUserTokenMiddleware = require('../../auth/middleware/addUserTokenMiddleware');
const comparePasswordsMiddleware = require('../../auth/middleware/comparePasswordsMiddleware');
const findModelByMiddleware = require('../middleware/findModelByMiddleware');
const checkMiddleware = require('../middleware/checkMiddleware');
const {UserModel} = require(global.GlobalAppVars.appModelsFilePath);

module.exports = (router) => {

    router.post('/authenticate',
        checkMiddleware({email: true, password: true}, 'req.body'),
        findModelByMiddleware(UserModel, {email: 'email'}, 'body', 'user'),
        comparePasswordsMiddleware(),
        addUserTokenMiddleware(),
        (req, res) => {
            res.jsonSuccess(req.user);
        });

};