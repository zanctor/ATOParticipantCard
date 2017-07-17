module.exports = (Model, params = {}, source = 'req.body', destination = 'model', isStrict = true) => {
    return async (req, res, next) => {
        try {
            for (let key in params) {
                params[key] = [source[params[key]]];
            }

            const model = await Model.findOne(params).exec();
            if (!model && isStrict) throw new Error(`There is no such ${Model.modelName}`);
            req[destination] = model;
            next();
        } catch (e) {
            res.errorResponse(404, e);
        }
    };
};
