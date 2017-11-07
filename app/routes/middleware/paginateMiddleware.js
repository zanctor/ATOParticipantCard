module.exports = (Model) => {
    return async (req, res, next) => {
        let {page = 1, perPage = 10} = req.query;

        try {
            let meta = {
              page,
              perPage,
              totalCount: await Model.count().exec()
            };

            res.jsonSuccess(await Model.find().limit(perPage).skip(perPage * page).exec(), meta);
        } catch (e) {
            res.errorResponse(400, e);
        }
    };
};
