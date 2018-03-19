const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

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

module.exports = mongoose.model('user', user);;
