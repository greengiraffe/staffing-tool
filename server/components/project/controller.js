let express = require('express');
let router = express.Router();
let Project = require('./project');
let mongoose = require('mongoose');

//create Projekt

/**
 * Create Project
 */
router.post('/project', function(req, res, next){
    Project.createProject(req.body)
        .then(function(result){
           res.status(result.statusCode).json(result);
        })
        .catch(function(err){
            res.status(err.statusCode).json(err);
        });
});

/**
 * Get a list of all projects
 */
router.get('/project/list', function(req, res, next) {
    Project.listProjects()
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(err) {
            res.status(400).json(err);
        });
});


module.exports = router;
