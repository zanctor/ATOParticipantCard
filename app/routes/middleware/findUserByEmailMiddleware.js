const {UserModel} = require(global.GlobalAppVars.appModelsFilePath);

module.exports = () => {
    return async (req, res, next) => {
        const email = req.body.email;
        if (!email) res.errorResponse(400, 'Email is absent');

        try {
            const user = await UserModel.findOne({email}).exec();
            if (!user) throw new Error('There is no such user');
            req.user = user;
            next();
        } catch (e) {
            res.errorResponse(404, e);
        }
    };
};
