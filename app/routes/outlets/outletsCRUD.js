const createModelMiddleware = require('../middleware/createModelMiddleware');
const {OutletModel} = require('../../models/appModels');

module.exports = (router) => {

    router.get('/outlets',
        async (req, res) => {
            res.jsonSuccess(await OutletModel.find({}).exec());
        });

    router.get('/outlets/:id',
        async (req, res) => {
            const outlet = await OutletModel.findOne({_id: req.params.id}).exec();
            if (!outlet) return res.errorResponse(404, 'Outlet not found');
            res.jsonSuccess(outlet);
        });

    router.post('/outlets',
        createModelMiddleware(OutletModel, 'outlet'),
        (req, res) => {
            res.jsonSuccess(req.outlet);
        });

    router.patch('/outlets/:id',
        async (req, res) => {
            let outlet = await OutletModel.findOne({_id: req.params.id}).exec();
            if (!outlet) return res.errorResponse(404, 'Outlet not found');

            try {
                for (let key in req.body) {
                    outlet[key] = req.body[key];
                }
                await outlet.save();
                res.jsonSuccess();
            } catch (e) {
                res.errorResponse(400, e);
            }
        });

};