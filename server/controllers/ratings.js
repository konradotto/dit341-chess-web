var express = require('express');
var router = express.Router();
var Rating = require('../models/rating');

// Route handlers
var getAllRatings = function(req, res, next) {

    Rating.find(function(err, ratings) {
        if (err) { 
            return next(err); 
        }
        res.json({'ratings': ratings});
    });
}

router.get('/', getAllRatings);

module.exports = router;
