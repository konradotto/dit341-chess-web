var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gameSchema = new Schema({
    PGN: { type: String },
    date: { type: Date },
    white: { type: String },
    black: { type: String },
    result: { type: String }
});

module.exports = mongoose.model('games', gameSchema);