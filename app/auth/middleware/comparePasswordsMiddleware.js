const bcrypt = require('bcrypt');

module.exports = (passField = 'password', userField = 'user') => {
    return async (req, res, next) => {
        const user = req[userField];
        let result = await bcrypt.compare(req.body[passField], user.password);
        if (!result) return  res.errorResponse(401, 'Password is not correct');
        next();
    };
};