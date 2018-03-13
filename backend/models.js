const mongoose = require('mongoose');

mongoose.connect('mongo://localhost/huhuu');

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
    }
    message: String,
    created: { Date,
               default: Date.now },
    modified: { Date,
                default: Date.now},
    image: String
});
