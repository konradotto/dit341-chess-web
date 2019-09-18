/**
 * Module defining the database schema for storing games.
 * 
 * This schema is inspired by https://chesstempo.com/game-database.html.
 */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// define the schema of the games database 
let gameSchema = new Schema({
    PGN: { type: String },
    event: { type: String, default: "Single Game" },
    site: { type: String, default: "ChessMate.com" },
    round: { type: Number, default: 0.0 },
    date: { type: Date, default: Date.now },
    white: { type: String },
    black: { type: String },
    result: { type: String }
});

module.exports = mongoose.model('games', gameSchema);