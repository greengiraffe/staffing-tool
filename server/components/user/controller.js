let express = require('express');
let passport = require('passport');
let router = express.Router();
let jwt = require('jsonwebtoken');

let User = require('./user');
let dbUser = require('../../models/user');


router.post('/signin', function(req, res, next) {
    User.findOne({email: req.body.email}, function(err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!user) {
            return res.status(401).json({
                title: 'Login failed',
                error: {message: 'Invalid login credentials'}
            });
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                title: 'Login failed',
                error: {message: 'Invalid login credentials'}
            });
        }
        var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
        res.status(200).json({
            message: 'Successfully logged in',
            token: token,
            userId: user._id
        });
    });
});

router.get('/user/all', function(req, res, next) {
    User.listUsers()
        .then(function(result) {
            res.json(result)
        })
        .catch(function(err) {
            res.send(err);
        });
});


router.post('/user', function(req, res, next) {
    // let user = new dbUser({
    //     firstname: req.body.firstname,
    //     lastname: req.body.lastname,
    //     email: req.body.email,
    //     password: req.body.password,
    //     role: req.body.role,
    // });
    // user.save(function(err, result) {
    //     if (err) {return res.send(err)}
    //     res.send(result);
    // });
    User.createUser(
        req.body.firstname,
        req.body.lastname,
        req.body.email,
        req.body.password,
        req.body.location,
        req.body.role
    )
        .then(function(result) {
            res.statusCode(201).json(result);
        })
        .catch(function(err) {
            res.send(err);
        });
});

// to verify token...
// router.use('/', function (req, res, next) {
//     jwt.verify(req.query.token, 'secret', function (err, decoded) {
//         if (err) {
//             return res.status(401).json({
//                 title: 'Not Authenticated',
//                 error: err
//             });
//         }
//         next();
//     })
// });


module.exports = router;
