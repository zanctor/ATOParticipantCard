const checkEndpointAccessMiddleware = require('../../auth/middleware/checkEndpointAccessMiddleware');
const createModelMiddleware = require('../middleware/createModelMiddleware');
const {UserModel} = require('../../models/appModels');

module.exports = (router) => {

    router.get(checkEndpointAccessMiddleware(4), '/users',
        async (req, res) => {
            res.jsonSuccess(await UserModel.find({}).exec());
        });

    router.get(checkEndpointAccessMiddleware(4), '/users/:id',
        async (req, res) => {
            const user = await UserModel.findOne({_id: req.params.id}).exec();
            if (!user) return res.errorResponse(404, 'User not found');
            res.jsonSuccess(user);
        });

    router.post(checkEndpointAccessMiddleware(4),
        createModelMiddleware(UserModel, 'user'),
        '/users',
        (req, res) => {
            res.jsonSuccess(req.user);
        });

    router.patch('/users/:id',
        async (req, res) => {
            let user = await UserModel.findOne({_id: req.params.id}).exec();
            if (!user) return res.errorResponse(404, 'User not found');

            try {
                for (let key in req.body) {
                    user[key] = req.body[key];
                }
                await user.save();
                res.jsonSuccess();
            } catch (e) {
                res.errorResponse(400, e);
            }
        });

};