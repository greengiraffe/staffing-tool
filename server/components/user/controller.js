let express = require('express');
let passport = require('passport');
let router = express.Router();

let User = require('./user');
let dbUser = require('../../models/user');


router.get('/user/all', function(req, res, next) {
    dbUser.find({}, function(err, result) {
        if (err) {return res.send('Error')}
        res.send(result);
    })
});


router.post('/user', function(req, res, next) {
    let user = new dbUser({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
    });
    user.save(function(err, result) {
        if (err) {return res.send(err)}
        res.send(result);
    });
});


module.exports = router;
