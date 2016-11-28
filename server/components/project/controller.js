let express = require('express');
let router = express.Router();
let Project = require('./project');
let mongoose = require('mongoose');

//create Projekt

router.post('/project', function(req, res, next){
    console.log('posted')
    Project.createProject(req.body.name)
        .then(function(result){
           res.status(result.statusCode).json(result);
        })
        .catch(function(err){
            res.status(err.statusCode).json(err);
        });
});


module.exports = router;
