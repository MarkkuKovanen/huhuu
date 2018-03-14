const mongoose = require('mongoose');
const config = require('./config.json');

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

const User = mongoose.model('user', user);
const Post = mongoose.model('post', post);

module.exports = {User, Post};
