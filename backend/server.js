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
        saveUninitialized: false
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
             res.json({"message": "login successful"});
         }
);

// Logout
app.post('/api/logout', (req, res) => {
    req.logout();
    res.json({"message": "logged out"});
});

// Start server
let server = app.listen(config.port, () => {
    console.log("Server running at port " + server.address().port);
});

