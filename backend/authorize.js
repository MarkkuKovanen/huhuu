class Authorize {
    static isAuthenticated(req, res, next) {
        if (req.isAuthenticated())
            next()
        else
            res.send(401);
    }

    static isAdmin(req, res, next) {
        if (req.user.isAdmin)
            next()
        else
            res.send(401);
    }
}

module.exports = Authorize;
