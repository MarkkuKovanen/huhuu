let express = require("express");
let mongoose = require("mongoose");
let userModel = require("../models/user");
let auth = require("../authorize");

let router = express.Router();

router.get("/:phrase", auth.isAuthenticated, function(req, res) {
    userModel.find({$or: [{username: {$regex: req.params.phrase, $options: 'i'}},
                          {name: {$regex: req.params.phrase, $options: 'i'}}]})
        .limit(10)
        .then((data) => {
            res.json(data.map((user) => ({
                title: user.name,
                description: user.introduction,
                image: "/api/user/" + user._id + "/picture",
                username: user.username
            })));
        }, (error) => {
            console.log(error);
            return res.send(500);
        });
});

module.exports = router;
