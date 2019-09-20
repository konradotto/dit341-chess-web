/**
 * Module defining the database schema for storing puzzles.
 * 
 * This schema is inspired by https://chessblunders.org/api.
 */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// define the schema of the puzzles database.
let puzzleSchema = new Schema({
    fenBefore: { type: String, required: true },        // Forsyth-Edwards Notation for initial position
    forcedLine: [{ type: String, required: true }],       // correct solution to the puzzle
    timesSolved: { type: Number, default: 0 },
    timesTried: { type: Number, default: 0 }
});

module.exports = mongoose.model('puzzle', puzzleSchema);