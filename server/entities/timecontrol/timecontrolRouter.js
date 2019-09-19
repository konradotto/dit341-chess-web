var express = require('express');
var router = express.Router();
var TimeControl = require('./timecontrolModel');

// Return a list of all time controls
function getTimeControls(req, res, next) {
    TimeControl.find(function(err, timeControls) {
        if (err) { return next(err); }
        res.json({'timecontrols': timeControls});
    });
}

// Return the time control with the given ID
function getTimeControl(req, res, next) {
    var id = req.params.id;
    TimeControl.findById(id, function(err, timeControl) {
        if (err) { return next(err); }
        if (timeControl === null) {
            return res.status(404).json({'message': 'TimeControl not found'});
        }
        res.json(timeControl);
    });
}

// Mapping the handlers to the routes
var router = express.Router();
router.get('/', getTimeControls);
router.get('/:id', getTimeControl);

module.exports = router;
