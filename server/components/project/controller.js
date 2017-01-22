let express = require('express');
let router = express.Router();
let Project = require('./project');
let mongoose = require('mongoose');
let util = require('../../services/util');

/**
 * Create Project
 */
router.post('/project', function(req, res, next){
    Project.createProject(req.body)
        .then(function(result){
           res.status(201).json(result);
        })
        .catch(function(err){
            res.status(500).json(err);
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

/**
 * Get specific project by id
 */
router.get('/project/:id', function(req, res, next) {
    let id = req.params.id;
    if(util.isValidId(id, res)) {
        Project.getProjectById(req.params.id)
            .then(function (result) {
                res.status(200).json(result);
            })
            .catch(function (err) {
                res.status(400).json(err);
            })
    }
});

/**
 * Add Task to Project
 */
router.post('/project/task/:id', function(req, res, next) {
    let id = req.params.id;
    if(util.isValidId(id, res)) {
        Project.createProjectTask(req.params.id, req.body)
            .then(function(result){
               res.status(201).json(result);
            })
            .catch(function(err){
                res.status(500).json(err);
            });
    }
});

/**
 * Remove Task from Project
 */
router.delete('/project/task/:id', function(req, res, next) {
    let id = req.params.id;
    if(util.isValidId(id, res)) {
        Project.removeProjectTask(req.params.id, req.body)
            .then(function(result){
               res.status(200).json(result);
            })
            .catch(function(err){
                res.status(err.statusCode).json(err);
            });
    }
});

/**
 * Update a Task
 */
router.put('/project/task/:id', function(req, res, next) {
    let id = req.params.id;
    if(util.isValidId(id, res)) {
        Project.updateProjectTask(req.params.id, req.body)
            .then(function(result){
               res.status(200).json(result);
            })
            .catch(function(err){
                res.status(err.statusCode).json(err);
            });
    }
});

/**
 * Update a project
 */
router.put('/project', function(req, res, next) {
    Project.updateProject(req.body)
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(err) {
            res.status(err.statusCode).json(err);
        });
});

/**
 * Delete a specific project object
 */
router.delete('/project/:id', function(req, res, next) {
    let id = req.params.id;
    if(util.isValidId(id, res)) {
        Project.removeProject(id)
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(err) {
            res.status(err.statusCode).json(err);
        });
    }
});

module.exports = router;
