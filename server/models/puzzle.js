/**
 * Module defining the database schema for storing puzzles.
 * 
 * This schema is inspired by https://chessblunders.org/api.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define the schema of the puzzles database.
var gameSchema = new Schema({
    id: { type: String },
    fenBefore: { type: String },    // Forsyth-Edwards Notation for initial position
    forcedLine: { type: String }    // correct solution to the puzzle
});

module.exports = mongoose.model('games', gameSchema);