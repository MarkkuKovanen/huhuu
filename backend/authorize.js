class Authorize {
    static isAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        } else {
            res.send(401);
        }
    }
}

module.exports = Authorize;
