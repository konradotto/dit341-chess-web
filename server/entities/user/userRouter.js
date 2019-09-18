var express = require('express');
var User = require('./userModel');
var userValidator = require('./userValidator');
var userPreparer = require('./userPreparer');

function getUsers(req, res, next) {
    User.find((err, users) => {
        if (err) { 
            return next(err); 
        }
        res.json({'users': users});
    });
}

function getUser(req, res, next) {

    var id = req.params.id
    User.findById(id, (err, user) => {

        if (err) { 
            return next(err); 
        }

        if (user === null) {
            return res.status(404).json({'message': 'User not found'});
        }

        res.json(user);
    });
}

function updateUser(req, res, next) {

    var id = req.params.id

    User.findOneAndUpdate(id, req.body, {new: true, useFindAndModify: false}, (err, user) => {

        if (err) { 
            return next(err); 
        }
        
        return res.json(user)
    });
}

function createUser(req, res, next) {

    var user = new User(req.body);
    user.save(function(err) {
        if (err) { 
            return next(err); 
        }

        res.status(201).json(user);
    });
}

function deleteUser(req, res, next) {

    var id = req.params.id;
    User.findOneAndDelete({_id: id}, {useFindAndModify: false}, (err, user) => {

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
var router = express.Router();
router.get('/', getUsers);
router.post('/', [userValidator.checkUserDontExist, userPreparer.encryptPassword, createUser]);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
