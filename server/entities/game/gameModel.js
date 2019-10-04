/**
 * Module defining the database schema for storing games.
 * 
 * This schema is inspired by https://chesstempo.com/game-database.html.
 */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// define the schema of the games database 
let gameSchema = new Schema({
    PGN: { type: String, required: true },
    event: { type: String, default: "Single Game" },
    site: { type: String, default: "ChessMate.com" },
    round: { type: Number, default: 0.0 },
    date: { type: Date, default: Date.now },
    white: { type: String, required: true },    // id of the player playing as white
    black: { type: String, required: true },    // id of the player playing as black
    result: { type: String, required: true },                    // result of the game (e.g. 1-0, 0-1, 0.5-0.5) empty (" ") until end of game
    gameId: { type: Number}
});

module.exports = mongoose.model('games', gameSchema);