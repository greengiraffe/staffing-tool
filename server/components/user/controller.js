let express = require('express');
let passport = require('passport');
let router = express.Router();
let jwt = require('jsonwebtoken');
let mongoose = require('mongoose');

let User = require('./user');
let dbUser = require('../../models/user');

/**
 * Handle user login
 */

router.post('/login', passport.authenticate('local' , {
    successRedirect: '/home',
    failureRedirect: '/',
    failureFlash: true
}), function(req, res, next) {
    // User.findOne({email: req.body.email}, function(err, user) {
    //     if (err) {
    //         return res.status(500).json({
    //             title: 'An error occurred',
    //             error: err
    //         });
    //     }
    //     if (!user) {
    //         return res.status(401).json({
    //             title: 'Login failed',
    //             error: {message: 'Invalid login credentials'}
    //         });
    //     }
    //     if (!bcrypt.compareSync(req.body.password, user.password)) {
    //         return res.status(401).json({
    //             title: 'Login failed',
    //             error: {message: 'Invalid login credentials'}
    //         });
    //     }
    //     var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
    //     res.status(200).json({
    //         message: 'Successfully logged in',
    //         token: token,
    //         userId: user._id
    //     });
    // });
});

/**
 *  Handle Logout
 */
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

/**
 * Get a list of all users
 */
router.get('/user/list', function(req, res, next) {
    User.listUsers()
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(err) {
            res.status(400).json(err);
        });
});

/**
 * Get specific user by id
 */
router.get('/user/:id', function(req, res, next) {
    User.getUserByID(req.params.id)
        .then(function (result) {
            res.status(200).json(result);
        })
        .catch(function (err) {
            res.status(400).json(err);
        })
});

/**
 * Create a user
 */
router.post('/user', function(req, res, next) {
    console.log(req.body.role);
    User.createUser(
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        req.body.password,
        req.body.location,
        req.body.role
    )
        .then(function(result) {
            res.status(result.statusCode).json(result);
        })
        .catch(function(err) {
            res.status(err.statusCode).json(err);
        });
});


/**
 * Add a specific skill with rating to a specific user
 */
router.put('/user/skill', function(req, res, next) {
    let userId = req.body.userId;
    let skillId = req.body.skillId;
    let rating = req.body.rating
    if(mongoose.Types.ObjectId.isValid(userId) && mongoose.Types.ObjectId.isValid(skillId) ) {
        User.addSkill(userId,skillId ,rating)
            .then(function(result) {
                res.status(result.statusCode).json(result);
            })
            .catch(function(err) {
                res.status(err.statusCode).json(err);
            });
    } else {
        res.status(400).json({
            message: "Invalid ID"
        });
    }
});

/**
 * Delete a user by id
 */
router.delete('/user/:id', function(req, res, next) {
    User.deleteUser(id)
        .then(function(result) {
            res.status(200).json(result)
        })
        .catch(function(err) {
            res.status(400).json(err)
        })
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
