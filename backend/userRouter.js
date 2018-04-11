let express = require("express");
let mongoose = require("mongoose");
let userModel = require("./models/user");

let userRouter = express.Router();

userRouter.post('/api/user', (req, res, next) => {
    let user = new userModel(req.body);
    user.save((err, user) => {
        if (err) {
            console.log(err);
            res.status(500).json(err);
            return;
        }
        res.json({"message": "success"});
    });
});

userRouter.put("/api/user/:id", function(req,res) {
	let updatedUser = {
		username:req.body.username,
		name:req.body.name,
		email:req.body.email,
		phone:req.body.phone,
		password:req.body.password
	}
	userModel.findOneAndUpdate({'_id':req.params.id},updatedUser,{},function(err,item) {
		if(err) {
			console.log(err);
			return res.status(409).json({"message":"conflict"});
		}
		return res.status(200).json({"message":"success"});
	});
});

userRouter.get('/api/user', function (req, res, next) {
	userModel.find(function(err, users) {
		if (err) throw err;
		console.log(users);
		res.set('Access-Control-Allow-Origin','*');
		res.status(200);
		res.json(users);
    });	
});

userRouter.get('/api/user/:username', function (req, res, next) {
	userModel.find({username: req.params.username}, function(err, user) {
		if (err) throw err;
		console.log(user);
		res.set('Access-Control-Allow-Origin','*');
		res.status(200);
		res.json(user);
    });	
});

userRouter.delete('/api/user/:id', function(req, res, next) {
	userModel.findOneAndRemove({_id: req.params.id}, function(err, user) {
	if (err) throw err;
	res.set('Access-Control-Allow-Origin','*');
	res.json(user);
	console.log('Deleted: ' + user);
	});
});

module.exports = userRouter;
