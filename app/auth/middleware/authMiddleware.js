const jwt = require('jsonwebtoken');
const {UserModel} = require(global.GlobalAppVars.appModelsFilePath);

module.exports = () => {
    return async (req, res, next) => {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        if (!token) return res.errorResponse(400, 'Token is absent');

        try {
            const decoded = jwt.verify(token, global.GlobalAppVars.env.SECRET_KEY);
            const user = await UserModel.findOne({_id: decoded.id}).exec();
            if (!user) return res.errorResponse(404, "User not found");
            req.user = user;
            next();
        } catch (e) {
            res.errorResponse(401, e);
        }
    };
};