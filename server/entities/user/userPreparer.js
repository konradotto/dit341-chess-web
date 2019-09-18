var bcrypt = require('bcrypt');
var User = require('./userModel');

function encryptPassword(req, res, next) {
    bcrypt.hash(req.body.password, 5, function(err, hash) {

        if (err) {
            next(err);
        }

        req.body.password = hash;
        next();
    });
}

module.exports.encryptPassword = encryptPassword;