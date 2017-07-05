const hashPassword = require('../../lib/hashPassword');

module.exports = (passField = 'password') => {
    return async (req, res, next) => {
        try {
            let password = req.body[passField];
            if (!password) throw new Error('Password is absent');

            req.body[passField] = await hashPassword(password);
            next();
        } catch (e) {
           res.errorResponse(400, e) ;
        }
    }
};