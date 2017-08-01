const createModelMiddleware = require('../middleware/createModelMiddleware');
const findModelByMiddleware = require('../middleware/findModelByMiddleware');
const {OutletModel} = require('../../models/appModels');

module.exports = (router) => {

    router.get('/outlets',
        async (req, res) => {
            res.jsonSuccess(await OutletModel.find({}).exec());
        });

    router.get('/outlets/:id',
        findModelByMiddleware(OutletModel, {_id: 'id'}, 'params', 'outlet'),
        (req, res) => {
            res.jsonSuccess(req.outlet);
        });

    router.post('/outlets',
        createModelMiddleware(OutletModel, 'outlet'),
        (req, res) => {
            res.jsonSuccess(req.outlet);
        });

    router.patch('/outlets/:id',
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
        findModelByMiddleware(OutletModel, {_id: 'id'}, 'params', 'outlet'),
        async (req, res) => {
            await req.outlet.delete();
            res.jsonSuccess();
        });

};