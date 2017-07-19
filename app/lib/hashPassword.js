const bcrypt = require('bcrypt-nodejs');

module.exports = (password) => {
    return bcrypt.hashSync(password, global.GlobalAppVars.SECRET_KEY);
};