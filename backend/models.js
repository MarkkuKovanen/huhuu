const mongoose = require('mongoose');
const config = require('./config.json');
const bcrypt = require('bcrypt-nodejs');

mongoose.connect(config.mongodbUrl);

const Schema = mongoose.Schema;

const user = new Schema({
    username: String,
    name: String,
    email: String,
    phone: String,
    password: String,
    admin: Boolean,
    followed: [Schema.Types.ObjectId],
    followers: [Schema.Types.ObjectId],
    notifications: Boolean,
    photo: String,
    posts: [Schema.Types.ObjectId]
});

const post = new Schema({
    user: {
        username: String,
        photo: String,
        id: Schema.Types.ObjectId
    },
    message: String,
    created: { type: Date,
               default: Date.now },
    modified: { type: Date,
                default: Date.now},
    image: String
});

user.pre('save', function(next) {
    if (this.isModified || this.isNew) {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) return next(err);
            bcrypt.hash(this.password, salt, null, (err, hash) => {
                this.password = hash;
                return next();
            });
        });
    } else return next();
});

user.methods.comparePassword = function(password, callback) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err) return callback(err);
        callback(null, isMatch);
    });
}

const User = mongoose.model('user', user);
const Post = mongoose.model('post', post);

module.exports = {User, Post};
