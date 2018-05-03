let express = require("express");
let mongoose = require("mongoose");
let userModel = require("./models/user");
let profilepicModel = require("./models/profilepic");
let auth = require("./authorize");
let multer = require("multer");
let upload = multer({ storage: multer.memoryStorage() });
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
    if (req.user.isAdmin || req.params.id == req.user._id) {
        let updatedUser = {
	    username:req.body.username,
	    name:req.body.name,
	    email:req.body.email,
	    phone:req.body.phone,
	    introduction:req.body.introduction,
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
        res.sendStatus(401);

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

// Get a profile picture
userRouter.get('/api/user/:userid/picture',
               auth.isAuthenticated,
               function (req, res, next) {
                   profilepicModel.findOne({userid: req.params.userid}, function(err, pic) {
 	               if (err)
                           return res.send(500);
                       if (!pic)
                           return res.sendFile("pictures/profile.svg", {root: __dirname});
                       res.set({
                           'Content-Type': pic.picture.mimetype
                       });
                       res.send(pic.picture.data);
                   });	
               }
);

// Add or update a profile picture
userRouter.put('/api/user/:id/picture',
               auth.isAuthenticated,
               upload.single('photo'),
               function (req, res, next) {
                   if (req.params.id != req.user._id) {
                       console.log(req.params.id);
                       console.log(req.user.id);
                       return res.sendStatus(401);
                   }
                   profilepicModel.findOneAndUpdate(
                       {userid: req.user._id},
                       {
                           userid: req.user._id,
                           picture: {
                               mimetype: req.file.mimetype,
                               data: req.file.buffer
                           }
                       },
                       {upsert: true},
                       function(err) {
                           if (err) {
                               console.log(err);
                               return res.send(500);
                           } else {
                               return res.send(200);
                           }
                       }
                   );
               }
);
                       /* 
                         *    let pic = new profilepicModel({
                         *        userid: req.user._id,
                         *        picture: {
                         *    mimetype: req.file.mimetype,
                         *    data: req.file.buffer
                           }
                           });

                           pic.save((err, post) => {
                           if (err) {
                         *    console.log(err);
                         *    res.send(500);
                         *    return;
                           } else {
                         *    res.send(200);
                           }
                           
                           });*/

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
