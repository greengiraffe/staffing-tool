let express = require('express');
let passport = require('passport');
let router = express.Router();
let jwt = require('jsonwebtoken');
let mongoose = require('mongoose');

let multipart = require('connect-multiparty');
let mime = require('mime');
let fs = require('fs');

let multipartMiddleware = multipart();
let User = require('./user');
let dbUser = require('../../models/user');
let imgStorePath = process.env.IMG_STORE_PATH
let IMAGE_TYPES = ['image/jpeg', 'image/png'];

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
        req.body.role,
        req.body.skype,
        req.body.picture,
        req.body.phone
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
 * Update a user
 */
router.put('/user', function(req, res, next) {
    User.updateUser(req.body)
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(err) {
            res.status(err.statusCode).json(err);
        });
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

router.post('/user/img/:id', multipartMiddleware, function(req, res, next) {
    fs.readFile(req.files.image.path, function (err, data) {
        var imageName = req.files.image.name
        if(!imageName){
            res.redirect("/");
            res.end();
        } else {
            var type = mime.lookup(req.files.image.path);
            if (IMAGE_TYPES.indexOf(type) == -1) {
                return res.send(415, 'Supported image formats: jpeg, jpg, jpe, png.');
            }
            var newPath = imgStorePath + imageName;
            fs.writeFile(newPath, data, function (err) {
                User.addImg(req.params.id, newPath)
                //TODO error handling
                res.redirect(req.params.id);
            });
        }
    });
});

router.get('/user/img/:id', function (req, res){
    User.getUserByID(req.params.id)
        .then(function (result) {
            file = result.picture;
            var img = fs.readFileSync(file);
            res.writeHead(200, {'Content-Type': 'image/jpg' });
            res.end(img, 'binary');
        })
        .catch(function (err) {
            res.status(400).json(err);
        })
});

module.exports = router;
