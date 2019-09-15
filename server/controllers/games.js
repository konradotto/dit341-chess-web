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
let router = express.Router();
let Game = require('../models/game');

// Create a new game by posting a json request
router.post('/games', function(req, res, next) {
    let game = new Game(req.body);
    game.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(game);
    });
});

// Return a list of all games
router.get('/games', function(req, res, next) {
    Game.find(function(err, games) {
        if (err) { return next(err); }
        res.json({'games': games});
    });
});

// Return the game with the given ID
router.get('/games/:id', function(req, res, next) {
    let id = req.params.id;
    Game.findById(id, function(err, game) {
        if (err) { return next(err); }
        if (game === null) {
            return res.status(404).json({'message': 'Game not found'});
        }
        res.json(game);
    });
});

// Update the game with the given ID
router.update('/games/:id', function(req, res, next) {
    let id = req.params.id;
    // update the game with the given id using the request body
    Game.findOneAndUpdate({_id: id}, req.body, {new: true}, function(err, game) {
        if (err) { return next(err); }
        if (game === null) {
            return res.status(404).json({'message': 'Game not found'});
        }
        res.json(game);     // send the updated game as response
    })
});

// Deliver error 405 'Method Not Allowed' for all methods not defined previously
router.all('/games', function(req, res, next) {
    res.set('Allow', ['POST', 'GET', 'UPDATE']);
    res.status(405).json({'message': 'Method Not Allowed'});
});

module.exports = router;
