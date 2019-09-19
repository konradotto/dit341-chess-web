var User = require('../user/userModel');

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

module.exports.checkUserExists = checkUserExists;