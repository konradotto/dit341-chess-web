var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ratingSchema = new Schema({
    userId: String,
    slow: Number,
    fast: Number
})

module.exports = mongoose.model('ratings', ratingSchema);