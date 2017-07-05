module.exports = (requiredUserRoleId) => {
    return (req, res, next) => {
        if (req.user.roleId < requiredUserRoleId) {
            res.errorResponse(403, 'Denied');
        } else {
            next();
        }
    };
};