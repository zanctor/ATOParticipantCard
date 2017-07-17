module.exports = (params = {}, source = 'req', errorMessage) => {
    return (req, res, next) => {
        for (let key in params) {
            if (!![source[key]] !== params[key]) {
                return res.errorResponse(400, errorMessage || `${key} is not correct or absent`);
            }
        }

        next();
    };
};