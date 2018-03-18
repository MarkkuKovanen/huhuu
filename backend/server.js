const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportLocal = require('passport-local');
const expressSession = require('express-session');
const config = require('./config.json');
const models = require('./models.js');

const app = express();

app.use(expressSession({secret: config.sessionSecret}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

passport.serializeUser(function(user, done) {
    done(null, user.id);
});


passport.deserializeUser(function(id, done) {
    models.User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use(new passportLocal.Strategy(
    (username, password, done) => {
        models.User.findOne({ username: username }, (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: "Incorrect username" });
            }
            user.comparePassword(password, (err, isMatch) => {
                if (err) return done(err);
                if (isMatch)
                    return done(null, user);
                else
                    return done(null, false, { message: "Incorrect password" });
            });
        });
    }
));

app.post('/api/login',
         passport.authenticate('local'),
         (req, res) => {
             res.json({"message": "login successful"});
         }
);

app.post('/api/user', (req, res, next) => {
    let user = new models.User(req.body);
    user.save((err, user) => {
        if (err) {
            console.log(err);
            res.status(500).json(err);
            return;
        }
        res.json(user);
    });
});

const server = app.listen(config.port, () => {
    console.log("Server running at port " + server.address().port);
});

