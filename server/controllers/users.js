var express = require('express');
var router = express.Router();
var User = require('../models/user');

// Route handlers
var getAllUsers = function(req, res, next) {

    User.find(function(err, users) {
        if (err) { 
            return next(err); 
        }
        res.json({'users': users});
    });
}

var getUser = function(req, res, next) {

    var id = req.params.id
    User.findById(id, function(err, user) {

        if (err) { 
            return next(err); 
        }

        if (user === null) {
            return res.status(404).json({'message': 'User not found'});
        }

        res.json(user);
    });
}

var createUser = function(req, res, next) {

    var user = new User(req.body);
    user.save(function(err) {

        if (err) { 
            return next(err); 
        }

        res.status(201).json(user);
    });
}

var deleteUser = function(req, res, next) {

    var id = req.params.id;
    User.findOneAndDelete({_id: id}, function(err, user) {

        if (err) { 
            return next(err); 
        }

        if (user === null) {
            return res.status(404).json({'message': 'User not found'});
        }

        res.json(user);
    });
}

// Mapping the handlers to the routes
router.get('/', getAllUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.delete('/:id', deleteUser);

module.exports = router;