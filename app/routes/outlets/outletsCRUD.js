const createModelMiddleware = require('../middleware/createModelMiddleware');
const findModelByMiddleware = require('../middleware/findModelByMiddleware');
const checkEndpointAccessMiddleware = require('../../auth/middleware/checkEndpointAccessMiddleware');
const paginateMiddleware = require('../middleware/paginateMiddleware');
const authMiddleware = require('../../auth/middleware/authMiddleware');
const {OutletModel} = require('../../models/appModels');

module.exports = (router) => {

    router.get('/outlets',
        paginateMiddleware(OutletModel),
        async (req, res) => {

        });

    router.get('/outlets/:id',
        authMiddleware(),
        checkEndpointAccessMiddleware(4),
        findModelByMiddleware(OutletModel, {_id: 'id'}, 'params', 'outlet'),
        (req, res) => {
            res.jsonSuccess(req.outlet);
        });

    router.post('/outlets',
        authMiddleware(),
        checkEndpointAccessMiddleware(4),
        createModelMiddleware(OutletModel, 'outlet'),
        (req, res) => {
            res.jsonSuccess(req.outlet);
        });

    router.patch('/outlets/:id',
        authMiddleware(),
        checkEndpointAccessMiddleware(4),
        findModelByMiddleware(OutletModel, {_id: 'id'}, 'params', 'outlet'),
        async (req, res) => {
            try {
                for (let key in req.body) {
                    req.outlet[key] = req.body[key];
                }
                await req.outlet.save();
                res.jsonSuccess();
            } catch (e) {
                res.errorResponse(400, e);
            }
        });

    router.delete('/outlets/:id',
        authMiddleware(),
        checkEndpointAccessMiddleware(4),
        findModelByMiddleware(OutletModel, {_id: 'id'}, 'req.params', 'outlet'),
        async (req, res) => {
            await req.outlet.delete();
            res.jsonSuccess();
        });

};