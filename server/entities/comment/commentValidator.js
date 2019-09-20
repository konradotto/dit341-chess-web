var User = require('../user/userModel');
var Game = require('../game/gameModel');

function checkUserExists(req, res, next) {
    User.find((error, users) => {
        if (error) {
            next(error);
        }

        var userExists = false;
        users.forEach(user => {
            if (user.userName === req.body.userName) {
                userExists = true;
            }
        })

        if (userExists) {
            next();
        } else {
            return res.status(400).json({"message": "userName not found"});
        }
    });
}

function checkGameExists(req, res, next) {
    Game.find((error, games) => {
        if (error) {
            next(error);
        }

        var gameExists = false;
        games.forEach(game => {
            if (game.gameId === req.body.gameId) {
                gameExists = true;
            }
        })

        if (gameExists) {
            next();
        } else {
            return res.status(400).json({"message": "gameId not found"});
        }
    });
}

module.exports.checkUserExists = checkUserExists;
module.exports.checkGameExists = checkGameExists;