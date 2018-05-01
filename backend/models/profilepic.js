const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profilepic = new Schema({
    userid: String,
    picture: {
        mimetype: String,
        data: Buffer
    }
});

module.exports = mongoose.model("profilepic", profilepic);
