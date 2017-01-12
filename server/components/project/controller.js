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

/**
 * Get specific project by id
 */
router.get('/project/:id', function(req, res, next) {
    Project.getProjectById(req.params.id)
        .then(function (result) {
            res.status(200).json(result);
        })
        .catch(function (err) {
            res.status(400).json(err);
        })
});

/**
 * Add Task to Project
 */
router.post('/project/task/:id', function(req, res, next) {
    Project.createProjectTask(req.params.id, req.body)
        .then(function(result){
           res.status(result.statusCode).json(result);
        })
        .catch(function(err){
            res.status(err.statusCode).json(err);
        });
});

/**
 * Remove Task from Project
 */
router.delete('/project/task/:id', function(req, res, next) {
    Project.removeProjectTask(req.params.id, req.body)
        .then(function(result){
           res.status(result.statusCode).json(result);
        })
        .catch(function(err){
            res.status(err.statusCode).json(err);
        });
});


/**
 * Change Status of Task
 */
router.put('/project/task/:id', function (req, res, next) {
    Project.updateTaskStatus(id, req.params.status)
        .then(function (result) {
            res.status(result.statusCode).json(result);
        })
        .catch(function (err) {
            res.status(err.statusCode).json({
                message: "Error while updating task status",
                obj: err
            });
        });
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
    if(mongoose.Types.ObjectId.isValid(id)) {
        Project.removeProject(id)
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

module.exports = router;
