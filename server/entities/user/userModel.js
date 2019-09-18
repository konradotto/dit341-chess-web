var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    userName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    profile_bio: String
})

module.exports = mongoose.model('users', userSchema);