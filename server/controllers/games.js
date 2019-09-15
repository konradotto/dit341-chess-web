/**
 * Module games.js in package controllers.
 * The purpose of this module is to define the RESTful API 
 * for accessing stored games.
 * 
 * Adapted from the template for camels.
 */

var express = require('express');
var router = express.Router();
var Game = require('../models/game');

// Return a list of all games
router.get('/', function(req, res, next) {
    Game.find(function(err, games) {
        if (err) { return next(err); }
        res.json({'games': games});
    });
});

// Create a new game
router.post('/', function(req, res, next) {
    var game = new Game(req.body);
    game.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(game);
    });
});

// Return the game with the given ID
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    Game.findById(id, function(err, game) {
        if (err) { return next(err); }
        if (game === null) {
            return res.status(404).json({'message': 'Game not found'});
        }
        res.json(game);
    });
});

// Games should never be deleted.
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;
    Camel.findOneAndDelete({_id: id}, function(err, camel) {
        if (err) { return next(err); }
        if (camel === null) {
            return res.status(404).json({'message': 'Camel not found'});
        }
        res.json(camel);
    });
});

module.exports = router;
