var bcrypt = require('bcrypt-nodejs');

function encryptPassword(req, _res, next) {
    bcrypt.hash(req.body.password, null, null, function(err, hash) {

        if (err) {
            next(err);
        }

        req.body.password = hash;
        next();
    });
}

module.exports.encryptPassword = encryptPassword;