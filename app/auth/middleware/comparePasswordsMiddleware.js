const bcrypt = require('bcrypt-nodejs');

module.exports = (passField = 'password', userField = 'user') => {
    return (req, res, next) => {
        const user = req[userField];
        let result = bcrypt.compareSync(req.body[passField], user.password);
        if (!result) return  res.errorResponse(401, 'Password is not correct');
        next();
    };
};