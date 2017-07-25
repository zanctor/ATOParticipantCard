module.exports = function cors(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, x-access-token");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
};