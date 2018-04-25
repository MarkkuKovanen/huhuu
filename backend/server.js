const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

// Config
const config = require('./config.json');

// Models
const User = require('./models/user.js');
const postModel = require('./models/post.js');

// Setup express
const app = express();

app.use(bodyParser.json());
//app.use(cookieParser());

mongoose.connect(config.mongodbUrl);

app.use(session(
    {
        secret: config.sessionSecret,
        store: new MongoStore({
            mongooseConnection: mongoose.connection
        }),
        cookie: {
            httpOnly: false
        },
        saveUninitialized: false,
        resave: false
    }
));


// Setup passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes
const userRouter = require("./userRouter");
const postRouter = require("./postRouter");

app.use(userRouter);
app.use(postRouter);

// Login
app.post('/api/login',
         passport.authenticate('local'),
         (req, res) => {
             console.log(req.user);
             res.json({
                 username: req.user.username,
                 email: req.user.email,
                 phone: req.user.phone,
                 name: req.user.name,
                 photo: req.user.photo,
                 isAdmin: req.user.isAdmin
             });
         }
);

// Logout
app.post('/api/logout', (req, res) => {
    req.session.destroy(function() {
        res.clearCookie('connect.sid');
        res.redirect("/");
    });
});

// Start server
let server = app.listen(config.port, () => {
    console.log("Server running at port " + server.address().port);
});

