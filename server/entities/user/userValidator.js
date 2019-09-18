var User = require('./userModel');

function checkUserDontExist(req, res, next) {
    User.find((error, users) => {
        if (error) {
            next(error);
        }

        var canCreateUser = true
        users.forEach(user => {
            if (user.userName === req.body.userName) {
                canCreateUser = false;
            }
        })

        if (canCreateUser) {
            next();
        } else {
            return res.status(400).json({"message": "user with same username found"});
        }
    });
}

module.exports.checkUserDontExist = checkUserDontExist;