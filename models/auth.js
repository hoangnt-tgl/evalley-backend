var User = require('./user');

module.exports.checkLogin = function (req, res, next) {
    var token = req.body.token;
    if (token) {
        jwt.verify(token, SECRET, function (err, decoded) {
            if (err) {
                res.json({ success: false, message: 'Failed to authenticate token.' });
            }
            else {
                id = decoded.id;
                User.getUserById(id, function (err, user) {
                    if (err) {
                        res.send({ success: false, message: 'Failed to authenticate token.' });
                        return;
                    }
                    if (!user) {
                        res.send({ success: false, message: 'No user found.' });
                        return;
                    }
                    req.user = user;
                   next();
                });
            }
        });
    }
    else {
        res.json({ success: false, message: 'No token provided.' });
    }
}