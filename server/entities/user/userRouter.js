var express = require('express');
var bcrypt = require('bcrypt-nodejs');
var User = require('./userModel');
var checkUserDontExist = require('./userValidator').checkUserDontExist;
var encryptPassword = require('./userPreparer').encryptPassword;

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

function login(req, res, next) {
    var loginUser = req.body.username
    var loginPass = req.body.password

    User.findOne({userName: loginUser}, 'password', (err, user) => {

        if (err) { 
            return next(err); 
        }

        if (user === null) {
            return res.status(404).json({'message': 'User not found'});
        }

        bcrypt.compare(loginPass, user.password, (err, result) => {
            if (err) {
                return next(err);
            }
            
            if (result === true) {
                res.send({'id': user.id});
            } else {
                return res.status(400).json({'message': 'Wrong password'});
            }
        })

    })
}

// Mapping the handlers to the routes
var router = express.Router();

// Gets
router.get('/', getUsers);
router.get('/:id', getUser);
// Posts
router.post('/', [checkUserDontExist, encryptPassword, createUser]);
router.post('/login', login);

router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
