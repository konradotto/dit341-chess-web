var express = require('express');
var router = express.Router();
var Comment = require('./commentModel');
var checkUserExists = require('./commentValidator').checkUserExists;

// Create a new comment
function createComment(req, res, next) {
    var comment = new Comment(req.body);
    comment.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(comment);
    });
}


// Gets all the comments for the given game_id
function getComments(req, res, next) {
    Comment.find({gameId: req.params.game_id}, function(err, comments) {
        if (err) { 
            return next(err); 
        }
        res.status(200).json({'comments': comments});
    });
}

// Return the comment with the given ID
function getComment(req, res, next) {
    Comment.find(req.params.id, function(err, comment) {
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
    Comment.findOneAndDelete({_id: req.params.id}, function(err, comment) {
        if (err) { 
            return next(err); 
        }
        if (comment === null) {
            return res.status(404).json({'message': 'Comment not found'});
        }
        res.status(200).json(comment);
    });
}

// Mapping the handlers to the routes
var router = express.Router();
router.post('/:game_id/comments/', [checkUserExists, createComment])
router.get('/:game_id/comments/', getComments)
router.get('/:game_id/comments/:comment_id', getComment)
router.delete('/:game_id/comments/:comment_id', deleteComment)

module.exports = router;
