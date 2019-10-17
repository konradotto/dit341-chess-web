/**
 * Module games.js in package controllers.
 * The purpose of this module is to define the RESTful API 
 * for accessing stored games.
 * 
 * Games should be created, read, updated but NEVER deleted.
 * Therefore POST, GET, and UPDATE are supported.
 * DELETE is not supported for games. 
 * 
 * Adapted from the template for camels.
 */

let express = require('express');
let Game = require('./gameModel');


// Create a new game by posting a json request
let createGame = function(req, res, next) {
    let game = new Game(req.body);
    game.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(game);
    });
};

// Return a list of all games
let getGames = function(req, res, next) {
    Game.find(function(err, games) {
        if (err) { return next(err); }
        res.status(200).json({'games': games});
    });
};

// Return the game with the given ID
let getGame = function(req, res, next) {
    let id = req.params.id;
    Game.findById(id, function(err, game) {
        if (err) { return next(err); }
        if (game === null) {
            return res.status(404).json({'message': 'Game not found'});
        }
        res.status(200).json(game);
    });
};

// Update the game with the given ID
let updateGame = function(req, res, next) {
    let id = req.params.id;
    // update the game with the given id using the request body
    Game.findOneAndUpdate({_id: id}, req.body, {new: true}, function(err, game) {
        if (err) { return next(err); }
        if (game === null) {
            return res.status(404).json({'message': 'Game not found'});
        }
        res.status(200).json(game);     // send the updated game as response
    })
};

// Patch a game specified by its ID
let patchGame = function(req, res, next) {
    let id = req.params.id;
    // patch the game with the given id using the request body
    Game.findOneAndUpdate({_id: id}, req.body, {new: true}, (err, game) => {
        if (err) { return next(err); }
        if (game === null) {
            return res.status(404).json({'message': 'Game not found'});
        }
        res.status(200).json(game);
    })
}

// Delete a game specified by its ID
let deleteGame = function(req, res, next) {
    let id = req.params.id;
    // delete the game with the given id
    Game.findOneAndDelete({_id: id}, {useFindAndModify: false}, (err, game) => {
        if (err) { return next(err); }
        if (game === null) {
            return res.status(404).json({'message': 'Game not found'});
        }
        res.status(200).json(game);
    })
}

// Delete all games
let deleteGames = function(req, res, next) {
    // delete all games
    Game.deleteMany({}, (err) => {
        if (err) { return next(err); }
        else { res.status(200).end('All games deleted successfully') }
    })
}

// Deliver error 405 'Method Not Allowed' for all methods not defined previously
let methodNotAllowed = function(req, res, next) {
    res.set('Allow', ['POST', 'GET', 'PUT', 'PATCH', 'DELETE']);
    res.status(405).json({'message': 'Method Not Allowed'});
};


// Mapping the handlers to the routes
let router = express.Router();
router.post('/', createGame);
router.get('/', getGames);
router.get('/:id', getGame);
router.put('/:id', updateGame);
router.patch('/:id', patchGame);
router.delete('/:id', deleteGame);
router.delete('/', deleteGames);
router.all('/', methodNotAllowed);

module.exports = router;
