let express = require('express');
let router = express.Router();
let Skill = require('./skill');
let mongoose = require('mongoose');

/**
 * Create a skill
 */
router.post('/skill', function(req, res, next) {
    if(req.body.name) {
        Skill.createSkill(req.body.name)
        .then(function(result) {
            // console.log('success', result)
            res.status(200).json(result);
        })
        .catch(function(err) {
            res.status(500).json({
                message: 'Internal Error while creating Skill.',
                obj: err
            });
        });
    } else {
        res.status(400).json({
            message: 'Was not able to create Skill',
        });
    }
});


/**
 * Get a Collection of all skills
 */
router.get('/skill/list', function(req, res, next) {
    Skill.listSkills()
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(err) {
            res.status(500).json({
                    message: 'Server error while retrieving Skills',
                    obj: err
                }
            );
        });
});


/**
 * Get a specific skill object by its name
 */
router.get('/skill/name/:name', function(req, res, next) {
    Skill.getSkillByName(req.params.name)
        .then(function(result) {
            if(result)
            res.status(200).json(result);
            else
            res.status(404).json({
                message: 'Error while getting skill. Check form input.',
                obj: result
            });
        })
        .catch(function(err) {
            res.status(500).json({
                message: 'Server error while getting skill. Try later.',
                obj: err
            });
        });
});


/**
 * Get a specific skill object by its ID
 */
router.get('/skill/id/:id', function(req, res, next) {
    let id = req.params.id;
    if(mongoose.Types.ObjectId.isValid(id)) {
        Skill.getSkillByID(id)
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(err) {
            res.status(err.statusCode).json({
                message: 'Error while getting Skill. Check form input',
                obj: err
            });
        });
    } else {
        res.status(400).json({
            message: "Invalid ID"
        });
    }

});


/**
 * Update a specific skill 
 */
router.put('/skill', function(req, res, next) {
    let id = req.body.id;
    let name = req.body.name;
    console.log(id, name);
    if(mongoose.Types.ObjectId.isValid(id) && name ) {
        Skill.updateSkill(id, name)
            .then(function(result) {
                res.status(result.statusCode).json(result);
            })
            .catch(function(err) {
                res.status(err.statusCode).json(err);
            }); 
    } else {
        res.status(400).json({
            message: "Invalid ID or data"
        });
    }
});


/**
 * Delete a specific skill object
 */
router.delete('/skill/:id', function(req, res, next) {
    let id = req.params.id;
    if(mongoose.Types.ObjectId.isValid(id)) {
        Skill.removeSkill(id)
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
