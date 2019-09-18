var express = require('express');
var router = express.Router();
var User = require('./userModel');
var userValidator = require('./userValidator');

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

        console.log(2);
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
router.get('/', getUsers);
router.post('/', [userValidator.checkUserDontExist, createUser]);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
