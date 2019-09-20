var express = require('express');
var router = express.Router();
var Comment = require('./commentModel');
var checkUserExists = require('./commentValidator').checkUserExists;
var checkGameExists = require('./commentValidator').checkGameExists;

// Return a list of all comments
function getComments(req, res, next) {
    Comment.find(function(err, comments) {
        if (err) { 
            return next(err); 
        }
        res.json({'comments': comments});
    });
}

// Create a new comment
function createComment(req, res, next) {
    var comment = new Comment(req.body);
    comment.save(function(err) {
        if (err) { 
            return next(err); 
        }
        res.status(201).json(comment);
    });
}

// Deletes all comments, forever?
function deleteComments(req, res, next) {
    Comment.deleteMany({}, function(err) {
        if (err) { 
            return next(err); 
        }
        res.status(202);
    });
}

// Updates comment with the given ID
function updateComment(req, res, next) {
    var id = req.params.id;

    Comment.findOneAndUpdate(id, req.body, {new: true, useFindAndModify: false}, function(err, comment){
        if (err) {
            return next(err);
        }

        return res.json(comment)
    });
}

// Return the comment with the given ID
function getComment(req, res, next) {
    var id = req.params.id;
    Comment.findById(id, function(err, comment) {
        if (err) { 
            return next(err); 
        }
        if (comment === null) {
            return res.status(404).json({'message': 'Comment not found'});
        }
        res.json(comment);
    });
}

// Delete the comment with the given ID
function deleteComment(req, res, next) {
    var id = req.params.id;
    Comment.findOneAndDelete({_id: id}, function(err, comment) {
        if (err) { 
            return next(err); 
        }
        if (comment === null) {
            return res.status(404).json({'message': 'Comment not found'});
        }
        res.json(comment);
    });
}

// Gets all the comments for the given userName
function getUsersComments(req, res, next) {
    var userName = req.params.username;
    Comment.find({userName : userName}, function(err, comments) {
        if (err) { 
            return next(err); 
        }
        res.json({'comments': comments});
    });
}


// Mapping the handlers to the routes
var router = express.Router();
router.get('/', getComments);
router.post('/', [checkUserExists, checkGameExists, createComment]);
router.delete('/', deleteComments);
router.get('/:id', getComment);
router.put('/:id', updateComment);
router.delete('/:id', deleteComment);
router.get('/usernames/:username', getUsersComments)

module.exports = router;
