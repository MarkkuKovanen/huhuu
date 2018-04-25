const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const post = new Schema({
    user: {
        _id: String,
        username: String,
        photo: String,
        //id: Schema.Types.ObjectId
    },
    message: String,
    created: { type: Date,
               default: Date.now },
    modified: { type: Date,
                default: Date.now},
    image: String
});


module.exports = mongoose.model("post", post);
