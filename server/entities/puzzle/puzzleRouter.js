/**
 * Module puzzles.js
 * The purpose of this module is to define the RESTful API 
 * for accessing stored puzzles. 
 */

let express = require('express');
let router = express.Router();
let Puzzle = require('./puzzleModel');

/**
 * Function creating a puzzle from a json request
 * 
 * @param { string } req - request passed to the function
 * @param { string } res - response returned by the function
 * @param {*} next - next route handler to be called
 */
let createPuzzle = function(req, res, next) {
    let puzzle = new Puzzle(req.body);
    puzzle.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(puzzle);
    });
}

/**
 * Function to read all puzzles from the database
 * 
 * @param {string} req - request passed to the function
 * @param {string} res - response returned by the function
 * @param {*} next  - next route handler to be called
 */
let getAllPuzzles = function(req, res, next) {
    Puzzle.find(function(err, puzzles) {
        if (err) { return next(err); }
        res.json({'puzzles': puzzles});
    });

}

/**
 * Function to read a puzzle by its id
 *  
 * @param {string} req - request passed to the function
 * @param {string} res - response returned by the function
 * @param {*} next - next route handler to be called
 */
let getPuzzle = function(req, res, next) {
    let id = req.params.id;
    Puzzle.findById(id, function(err, puzzle) {
        if (err) { return next(err); }
        if (puzzle === null) {
            return res.status(404).json({'message': 'Puzzle not found'});
        }
        res.json(puzzle);
    });
}

/**
 * Function to update the puzzle with the given id
 * 
 * @param {string} req - request passed to the function
 * @param {string} res - response returned by the function
 * @param {*} next - next route handler to be called
 */
let updatePuzzle = function(req, res, next) {
    let id = req.params.id;
    // update the puzzle with the given id using the request body
    Puzzle.findOneAndUpdate({_id: id}, req.body, {new: true}, function(err, puzzle) {
        if (err) { return next(err); }
        if (puzzle === null) {
            return res.status(404).json({'message': 'Puzzle not found'});
        }
        res.json(puzzle);     // send the updated Puzzle as response
    })
};

/**
 * Function to delete a puzzle by its id
 * 
 * @param {string} req - request passed to the function
 * @param {string} res - response returned by the function
 * @param {*} next - next route handler to be called 
 */
let deletePuzzle = function (req, res, next) {
    let id = req.params.id;
    Puzzle.findOneAndDelete({_id: id}, function(err, puzzle) {
        if (err) { return next(err); }
        if (puzzle === null) {
            return res.status(404).json({'message': 'Puzzle not found'});
        }
        res.json(puzzle);
    })
}

/**
 * Function to delete all puzzles
 * 
 * @param {string} req - request passed to the function
 * @param {string} res - response returned by the function
 * @param {*} next - next route handler to be called 
 */
let deletePuzzles = function(req, res, next) {
    // delete all games
    Puzzle.deleteMany({}, (err) => {
        if (err) { return next(err); }
        else { res.end('All puzzles deleted successfully') }
    })
}

/**
 * Function to handle calls to unallowed methods
 * 
 * @param {string} req - request passed to the function
 * @param {string} res - response returned by the function
 * @param {*} next - next route handler to be called
 */
let methodNotAllowed = function(req, res, next) {
    res.set('Allow', ['POST', 'GET', 'DELETE']);
    res.status(405).json({'message': 'Method Not Allowed'});
}

// Mapping the handlers to routes
router.post('/', createPuzzle);         // Create a new puzzle by posting a json request
router.get('/', getAllPuzzles);         // Return a list of all games
router.get('/:id', getPuzzle);          // Return the game with the given ID
router.put('/:id', updatePuzzle);       // Update the puzzle with given ID
router.delete('/:id', deletePuzzle);    // Delete the puzzle with the given ID
router.delete('/', deletePuzzles);      // Delete all puzzles
router.all('/', methodNotAllowed);      // Deliver error 405 'Method Not Allowed' for all methods not defined previously

module.exports = router;