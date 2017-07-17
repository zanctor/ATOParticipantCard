const createModelMiddleware = require('../middleware/createModelMiddleware');
const {CardModel} = require('../../models/appModels');

module.exports = (router) => {

    router.get('/cards',
        async (req, res) => {
            res.jsonSuccess(await CardModel.find({}).exec());
        });

    router.get('/cards/:id',
        async (req, res) => {
            const card = await CardModel.findOne({_id: req.params.id}).exec();
            if (!card) return res.errorResponse(404, 'Card not found');
            res.jsonSuccess(card);
        });

    router.post('/cards',
        createModelMiddleware(CardModel, 'card'),
        (req, res) => {
            res.jsonSuccess(req.card);
        });

    router.patch('/cards/:id',
        async (req, res) => {
            let card = await CardModel.findOne({_id: req.params.id}).exec();
            if (!card) return res.errorResponse(404, 'Card not found');

            try {
                for (let key in req.body) {
                    card[key] = req.body[key];
                }
                await card.save();
                res.jsonSuccess();
            } catch (e) {
                res.errorResponse(400, e);
            }
        });

};