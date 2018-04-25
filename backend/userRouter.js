let express = require("express");
let mongoose = require("mongoose");
let userModel = require("./models/user");
let auth = require("./authorize");

let userRouter = express.Router();

// Register
userRouter.post('/api/user', (req, res, next) => {
    let user = new userModel(req.body);
    userModel.register(user, req.body.password,
                       function(err) {
                           if (err) {
                               console.log(err);
                               return next(err);
                           }
                           res.json("register succesfull");
                       }
    );
});

// Update user info
userRouter.put("/api/user/:id", auth.isAuthenticated, function(req,res) {
    if (req.user.isAdmin || req.params.id === req.user._id) {
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
    } else {
        res.send(401);
    }
});

// List all users
userRouter.get('/api/user', auth.isAdmin, function (req, res, next) {
    userModel.find(function(err, users) {
	if (err) throw err;
	console.log(users);
	res.status(200);
	res.json(users);
    });	
});

// Get user info
userRouter.get('/api/user/:username', auth.isAuthenticated, function (req, res, next) {
    userModel.findOne({username: req.params.username}, function(err, user) {
 	if (err)
            return res.send(500);
        if (!user)
            return res.status(404).json({message: "User not found"});
 	res.status(200).json(user);
    });	
});

// Delete user
userRouter.delete('/api/user/:id', auth.isAuthenticated, function(req, res, next) {
    if (req.user.isAdmin || req.params.id === req.user._id) {
        userModel.findOneAndRemove({_id: req.params.id}, function(err, user) {
	    if (err) throw err;
	    res.json(user);
	    console.log('Deleted: ' + user);
        });
    } else {
        res.send(401);
    }
});

module.exports = userRouter;
