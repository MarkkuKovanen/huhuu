let express = require("express");
let mongoose = require("mongoose");
let postModel = require("../models/post");
let userModel = require("../models/user");
let auth = require("../authorize");

let postRouter = express.Router({ mergeParams: true });

// Create a new post
postRouter.post("/", auth.isAuthenticated, (req, res) => {
    let post = new postModel({
        user: {
            _id: req.user._id,
            username: req.user.username
        },
        message: req.body.message
    });
    post.save((err, post) => {
        if (err) {
            console.log(err);
            res.send(500);
            return;
        }
        res.json(post);
    });
});

// Get all posts
postRouter.get("/", auth.isAuthenticated, function(req, res, next) {
    postModel.find({}, {}, { sort: { created: -1 } }, function(err, posts) {
        if (err) throw err;
        res.json(posts);
    });
});

// Get all posts of a user
postRouter.get("/:username", auth.isAuthenticated, function(req, res, next) {
    postModel.find({ "user.username": req.params.username }, function(
        err,
        posts
    ) {
        if (err) throw err;
        res.json(posts);
    });
});

// Delete post
postRouter.delete("/:id", auth.isAuthenticated, function(req, res, next) {
    postModel.findOne({ _id: req.params.id }, function(err, post) {
        if (err) throw err;
        if (!post) return res.send(404);
        if (req.user.isAdmin || req.user._id == post.user._id) {
            postModel.findOneAndRemove({ _id: req.params.id }, function(
                err,
                post
            ) {
                if (err) throw err;
                res.send(200);
            });
        } else {
            res.send(401);
        }
    });
});

module.exports = postRouter;
