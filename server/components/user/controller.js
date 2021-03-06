let express = require('express');
let passport = require('passport');
let router = express.Router();
let path  = require('path');
let jwt = require('jsonwebtoken');
let mongoose = require('mongoose');
let authHelper = require('../../services/authHelper');
let util = require('../../services/util');
let config = require('../../../config/config');
let multipart = require('connect-multiparty');
let mime = require('mime');
let fs = require('fs');

let multipartMiddleware = multipart();
let User = require('./user');
let IMAGE_TYPES = ['image/jpeg', 'image/png'];
let imgStorePath = config.img_path;
let sharp = require('sharp');

/**
 * Handle user login
 */
router.post('/login', function(req, res) {
    User.getUserByMail(req.body.email)
        .then(function(user) {
            if (!user) {
                return res.status(401).json({
                    title: 'Login failed',
                    error: {message: 'Invalid email or password.'}
                });
            }
            if (!authHelper.comparePassword(req.body.password, user.password)) {
                return res.status(401).json({
                    title: 'Login failed',
                    error: {message: 'Invalid email or password.'}
                });
            }
            delete user.password;

            let token = jwt.sign({user: user}, config.jwt.secret, {expiresIn: config.jwt.expire});
            return res.status(200).json({
                message: 'Successfully logged in',
                token: token,
                user: user
            });
        })
        .catch(function(err) {
            return res.status(500).json({
                title: 'A server error occurred',
                error: err
            });
        });
});

/**
 * Guard routes
 */
router.use(authHelper.ensureAuthenticated);

/**
 *  Handle Logout
 */
router.get('/logout', function(req, res) {
    let token = req.headers.authorization.split(' ')[1];
    User.addTokenToBlacklist(token);
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
    let id = req.params.id;
    if(util.isValidId(id, res)) {
        User.getUserByID(id)
            .then(function (result) {
                res.status(200).json(result);
            })
            .catch(function (err) {
                res.status(400).json(err);
            })
    }
});

/**
 * Get specific user by mail
 */
router.get('/user/mail/:email', function (req, res, next){
    User.getUserByMail(req.params.email)
    .then(function(result){
        res.status(200).json(result)
    })
    .catch(function(error){
        res.status(500).json(err);
    })
});

/**
 * Create a user
 */
router.post('/user', function(req, res, next) {
    if (!util.isAdmin(req)) {
        return res.status(401).json('{}')
    } else {
        if(authHelper.passwordIsValid(req.body.password)) {
            User.createUser(
            req.body.firstName,
            req.body.lastName,
            req.body.email,
            req.body.password,
            req.body.location,
            req.body.role,
            req.body.phone
        )
            .then(function(result) {
                res.status(201).json(result);
            })
            .catch(function(err) {
                res.status(500).json(err);
            });
        } else {
            res.status(400).json({
                            message : "Bad password",
                            statusCode: 400,
                            value: req.body.password
            })
        }
    }
});

/**
 * Add a specific skill with rating to a specific user
 */
router.put('/user/skill', function(req, res, next) {
    let userId = req.body.userId;
    let skillId = req.body.skillId;
    let rating = req.body.rating
    if(util.isValidId(userId, res) && util.isValidId(skillId, res)) {
        User.addSkill(userId, skillId ,rating)
            .then(function(result) {
                res.status(200).json(result);
            })
            .catch(function(err) {
                res.status(err.statusCode).json(err);
            });
    }
});

/**
 * Delete a specific skill for a specific user
 */
router.delete('/user/skill', function(req, res, next) {
    let userId = req.body.userId;
    let skillId = req.body.skillId;
    let rating = req.body.rating
    if(util.isValidId(userId, res) && util.isValidId(skillId, res)) {
        User.removeSkill(userId, skillId ,rating)
            .then(function(result) {
                res.status(200).json(result);
            })
            .catch(function(err) {
                res.status(err.statusCode).json(err);
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
 * Update a user's password
 */
router.put('/user/password', function(req, res, next) {
    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;
    let id = req.body.id;
    if(authHelper.passwordIsValid(newPassword)) {
        User.getUserByID(id)
          .then(function(user) {
              if(!user) {
                  res.status(404).json({
                      message: "No user document for " + id,
                      statusCode: 404
                  });
              } else if(authHelper.comparePassword(oldPassword, user.password)){
                  newPassword = authHelper.generateSecureHash(newPassword);

                  User.changePassword(id, newPassword)
                      .then(function(result) {
                          res.status(200).json(result);
                      })
                      .catch(function(err) {
                          res.status(err.statusCode).json(err);
                      });

              } else {
                  res.status(400).json({
                      message : "Wrong password"
                  });
              }
          })
          .catch(function(err){
            res.status(500).json(err)
          });
      } else {
          res.status(400).json({
                          message : "Bad password",
                          statusCode: 400,
                          value: req.body.password
          })
      }
});

/**
 * Delete a user by id
 */
router.delete('/user/:id', function(req, res, next) {
    let id = req.params.id;
    if(util.isValidId(id, res)) {
        User.deleteUser(id)
            .then(function(result) {
                res.status(200).json(result)
            })
            .catch(function(err) {
                res.status(err.statusCode).json(err)
            })
    }
});

/**
 * Add a profile image to a user
 */
router.post('/user/img/:id', multipartMiddleware, function(req, res, next) {
    fs.readFile(req.files.image.path, function (err, data) {
        let imageName = path.extname(req.files.image.name);
        if(!imageName){
            res.redirect("/");
            res.end();
        } else {
            let type = mime.lookup(req.files.image.path);
            if (IMAGE_TYPES.indexOf(type) == -1) {
                return res.send(415, 'Supported image formats: jpeg, jpg, jpe, png.');
            }
            var smallImgPath = imgStorePath + req.params.id + 'small.png';

            sharp(req.files.image.path)
                .resize(50,50)
                .toFile(smallImgPath, function(err, info) {
                    if (err) console.log(err);
                    else console.log(info);
                });

            let largeImgPath = imgStorePath + req.params.id + '.png';

            sharp(req.files.image.path)
                .resize(600,600)
                .toFile(largeImgPath, function(err, info) {
                    if (err) console.log(err);
                    res.redirect(req.params.id);
                });
        }
    });
});

/**
 * Get the profile image of a specific user
 */
router.get('/user/img/:id/:size?', function (req, res){
    let size = req.params.size === "small"  ? req.params.size : "" ;
    let id = req.params.id;
    if(util.isValidId(id, res)) {
        User.getUserByID(id)
            .then(function (result) {
                file = imgStorePath +  result._id + size + '.png';
                let img = fs.readFileSync(file);
                if(!img) res.
                res.writeHead(200, {'Content-Type': 'image/png' });
                res.end(img, 'binary');
            })
            .catch(function (err) {
                res.status(400).json(err);
            })
    }
});

/**
 * Get all projects owned by a user
 */
router.get('/user/projects/:id', function(req, res, next) {
    let id = req.params.id;
    if(util.isValidId(id, res)) {
        User.getOwnedProjects(id)
            .then(function(result) {
                res.status(200).json(result);
            })
            .catch(function(err) {
                res.status(400).json(err);
            });
    }
});

/**
 * Get all tasks assigned to a user
 */
router.get('/user/tasks/:id', function(req, res, next) {
    let id = req.params.id;
    User.listProjectsTasks(id)
        .then(function(result) {
            let assignedTasks = [];
            result.forEach(project => {
                project.projectTasks.forEach(task => {
                    task.assignedUsers.forEach((user) => {
                        if(String(user._id) ===  id)
                            assignedTasks.push({
                                task: task,
                                project: {
                                    _id: project._id,
                                    title: project.title,
                                    client: project.client
                                }
                            });
                    })
                })
            });
            res.status(200).json(assignedTasks);
        })
        .catch(function(err) {
            res.status(400).json(err);
        });
});

/**
 * Get all userSkills for a specific user
 */
router.get('/user/skills/:id', function(req, res, next) {
    let id = req.params.id;
    User.getUserSkills(id)
        .then(function(result) {
            res.status(200).json(result.userSkills);
        })
        .catch(function(err) {
            res.status(400).json(err);
        });
});

module.exports = router;
