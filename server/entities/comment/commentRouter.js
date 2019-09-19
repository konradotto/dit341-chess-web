var express = require('express');
var router = express.Router();
var Comment = require('./commentModel');
var checkUserExists = require('./commentValidator').checkUserExists;

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
    console.log("Detta är idt den får på comment: " + id);
    
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

// Mapping the handlers to the routes
var router = express.Router();
router.get('/', getComments);
router.post('/', [checkUserExists, createComment]);
router.get('/:id', getComment);
router.put('/:id', updateComment);
router.delete('/:id', deleteComment);

module.exports = router;
