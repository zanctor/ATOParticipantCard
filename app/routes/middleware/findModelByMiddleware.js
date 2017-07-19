module.exports = (Model, params = {}, source = 'body', destination = 'model', isStrict = true) => {
    return async (req, res, next) => {
        try {
            let query = {};
            for (let key in params) {
                let dataSource = req[source];
                let keyValue = params[key];
                let data = dataSource[keyValue];
                query[key] = data;
            }
            const model = await Model.findOne(query).exec();
            if (!model && isStrict) throw new Error(`There is no such ${Model.modelName}`);
            req[destination] = model;
            next();
        } catch (e) {
            res.errorResponse(404, e);
        }
    };
};
