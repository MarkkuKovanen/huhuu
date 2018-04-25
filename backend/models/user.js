const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const passportLocalMongoose = require('passport-local-mongoose');

const Schema = mongoose.Schema;

const user = new Schema({
    name: String,
    email: String,
    phone: String,
    isAdmin: Boolean,
    followed: [Schema.Types.ObjectId],
    followers: [Schema.Types.ObjectId],
    photo: String,
    posts: [Schema.Types.ObjectId]
});

user.plugin(passportLocalMongoose);

module.exports = mongoose.model('user', user);;
