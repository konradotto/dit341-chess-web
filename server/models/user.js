var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {type: String},
    password: {type: String},
    profile_bio: {type: String}
})

module.exports = mongoose.model('users', userSchema);