let express = require("express");
let mongoose = require("mongoose");
let postModel = require("./models/post");
let userModel = require("./models/user");

let postRouter = express.Router({mergeParams: true});

postRouter.post('/api/post', (req, res, next) => {
    if (req.isAuthenticated()) {
        let post = new postModel({
            user: {
                username: req.user.username
            },
            message: req.body.message
        });
        post.save((err, post) => {
            if (err) {
                console.log(err);
                res.status(500).json(err);
                return;
            }
            res.json(post);
        });
    }
});

postRouter.get('/api/post', function (req, res, next) {
    postModel.find(function(err, posts) {
	if (err) throw err;
	console.log(posts);
	res.set('Access-Control-Allow-Origin','*');
	res.status(200);
	res.json(posts);
    });	
});

postRouter.get('/api/post/:username', function (req, res, next) {
    postModel.find({'user.username': req.params.username}, function(err, posts) {
	if (err) throw err;
	console.log(posts);
	res.set('Access-Control-Allow-Origin','*');
	res.status(200);
	res.json(posts);
    });	
});

postRouter.delete('/api/post/:id', function(req, res, next) {
    postModel.findOneAndRemove({_id: req.params.id}, function(err, post) {
	if (err) throw err;
	res.set('Access-Control-Allow-Origin','*');
	res.json(post);
	console.log('Deleted: ' + post);
    });
});

module.exports = postRouter;
