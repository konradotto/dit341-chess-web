var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ratingSchema = new Schema({
    slow: Number,
    fast: Number,
    userId: String
})

module.exports = mongoose.model('ratings', ratingSchema);