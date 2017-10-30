const checkEndpointAccessMiddleware = require('../../auth/middleware/checkEndpointAccessMiddleware');
const createModelMiddleware = require('../middleware/createModelMiddleware');
const findModelByMiddleware = require('../middleware/findModelByMiddleware');
const hashPasswordMiddleware = require('../../auth/middleware/hashPasswordMiddleware');
const hashPassword = require('../../lib/hashPassword');
const {UserModel} = require('../../models/appModels');

module.exports = (router) => {

    router.get('/user', async (req, res) => {
       res.jsonSuccess(req.user);
    });

    router.get('/users',
        checkEndpointAccessMiddleware(4),
        async (req, res) => {
            res.jsonSuccess(await UserModel.find({}).exec());
        });

    router.get('/users/:id',
        checkEndpointAccessMiddleware(4),
        findModelByMiddleware(UserModel, {_id: 'id'}, 'params', 'user'),
        (req, res) => {
            res.jsonSuccess(req.user);
        });

    router.post('/users',
        checkEndpointAccessMiddleware(4),
        hashPasswordMiddleware(),
        createModelMiddleware(UserModel, 'user'),
        (req, res) => {
            res.jsonSuccess(req.user);
        });

    router.patch('/users/:id',
        findModelByMiddleware(UserModel, {_id: 'id'}, 'params', 'userModel'),
        async (req, res) => {
            try {
                if (req.user.id === req.params.id || req.user.role === 4) {
                    for (let key in req.body) {
                        if (key === 'password') {
                            req.userModel[key] = hashPassword(req.body[key]);
                        } else {
                            req.userModel[key] = req.body[key];
                        }
                    }
                    await req.userModel.save();
                    res.jsonSuccess();
                } else {
                    res.errorResponse(403, 'Denied');
                }
            } catch (e) {
                res.errorResponse(400, e);
            }
        });

    router.delete('/users/:id',
        checkEndpointAccessMiddleware(4),
        findModelByMiddleware(UserModel, {_id: 'id'}, 'params', 'user'),
        async (req, res) => {
            if (req.user.role === 4) return res.errorResponse(403, 'You can not delete this user');
            await req.user.delete();
            res.jsonSuccess();
        });

};