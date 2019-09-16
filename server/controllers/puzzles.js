/**
 * Module puzzles.js
 * The purpose of this module is to define the RESTful API 
 * for accessing stored puzzles. 
 */

let express = require('express');
let router = express.Router();
let Puzzle = require('../models/puzzle');

module.exports = router;