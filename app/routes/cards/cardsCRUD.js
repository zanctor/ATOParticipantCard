const createModelMiddleware = require('../middleware/createModelMiddleware');
const checkEndpointAccessMiddleware = require('../../auth/middleware/checkEndpointAccessMiddleware');
const findModelByMiddleware = require('../middleware/findModelByMiddleware');
const paginateMiddleware = require('../middleware/paginateMiddleware');
const {CardModel} = require('../../models/appModels');

module.exports = (router) => {

    router.get('/cards',
        checkEndpointAccessMiddleware(4),
        paginateMiddleware(CardModel),
        async (req, res) => {

        });

    router.get('/cards/:id',
        checkEndpointAccessMiddleware(2),
        findModelByMiddleware(CardModel, {_id: 'id'}, 'params', 'card'),
        async (req, res) => {
            res.jsonSuccess(req.card);
        });

    router.post('/cards',
        checkEndpointAccessMiddleware(4),
        createModelMiddleware(CardModel, 'card'),
        (req, res) => {
            res.jsonSuccess(req.card);
        });

    router.patch('/cards/:id',
        checkEndpointAccessMiddleware(4),
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
        checkEndpointAccessMiddleware(4),
        findModelByMiddleware(CardModel, {_id: 'id'}, 'req.params', 'card'),
        async (req, res) => {
            await req.card.delete();
            res.jsonSuccess();
        });

};