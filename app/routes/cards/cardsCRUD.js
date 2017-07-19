const createModelMiddleware = require('../middleware/createModelMiddleware');
const findModelByMiddleware = require('../middleware/findModelByMiddleware');
const {CardModel} = require('../../models/appModels');

module.exports = (router) => {

    router.get('/cards',
        async (req, res) => {
            res.jsonSuccess(await CardModel.find({}).exec());
        });

    router.get('/cards/:id',
        findModelByMiddleware(CardModel, {_id: 'id'}, 'params', 'card'),
        async (req, res) => {
            res.jsonSuccess(req.card);
        });

    router.post('/cards',
        createModelMiddleware(CardModel, 'card'),
        (req, res) => {
            res.jsonSuccess(req.card);
        });

    router.patch('/cards/:id',
        findModelByMiddleware(CardModel, {_id: 'id'}, 'params', 'card'),
        async (req, res) => {
            try {
                for (let key in req.body) {
                    req.card[key] = req.body[key];
                }
                await req.card.save();
                res.jsonSuccess();
            } catch (e) {
                res.errorResponse(400, e);
            }
        });

    router.delete('/cards/:id',
        findModelByMiddleware(CardModel, {_id: 'id'}, 'req.params', 'card'),
        async (req, res) => {
            await req.card.delete();
            res.jsonSuccess();
        });

};