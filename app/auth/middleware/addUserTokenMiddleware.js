const jwt = require('jsonwebtoken');

module.exports = (userField = 'user') => {
    return (req, res, next) => {
        const token = jwt.sign({id: req[userField]._id}, global.GlobalAppVars.env.SECRET_KEY, {expiresIn: '30d'});
        req[userField] = {user: req[userField], token};
        next();
    }
};