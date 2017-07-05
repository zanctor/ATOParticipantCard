module.exports = (Model, destName = 'model') => {
    return async (req, res, next) => {
        try {
            req[destName] = await new Model(req.body).save();
            next();
        } catch (e) {
            res.errorResponse(400, e);
        }
    };
};
