var User = require('../user/userModel');
var Game = require('../game/gameModel');

function checkUserExists(req, res, next) {
    User.findById(req.body.userId, (error, user) => {
        // forward error to next function
        if (error) {
            next(error);
        }

        // continue if user exists, otherwise return appropriate status code with message
        if (user !== null) {
            next();
        } else {
            return res.status(400).json({"message": `no user with id ${req.body.userId} not found`});
        }
    });
}

function checkGameExists(req, res, next) {
    Game.findById(req.body.gameId, (error, game) => {
        // forward error to next function
        if (error) {
            next(error);
        }

        // continue if game exists, otherwise return appropriate status code with message
        if (game !== null) {
            next();
        } else {
            return res.status(400).json({"message": `no game with id ${req.body.gameId} found`});
        }
    });
}

module.exports.checkUserExists = checkUserExists;
module.exports.checkGameExists = checkGameExists;