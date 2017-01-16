let express = require('express');
let router = express.Router();
let Skill = require('./skill');
let mongoose = require('mongoose');

function isInvalidID(id) {
    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({message: "Invalid ID"});
        return false;
    }
    return true;
}

/**
 * Create a skill
 */
router.post('/skill', function(req, res, next) {
    if(req.body.name) {
        Skill.createSkill(req.body.name)
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
    } else {
        res.status(400).json({
            message: 'Was not able to create Skill'
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
            res.status(500).json(err);
        });
});

/**
 * Get a specific skill object by its ID
 */
router.get('/skill/:id', function(req, res, next) {
    let id = req.params.id;
    if (isValidID(id)) {
        Skill.getSkillByID(id)
            .then(function(result) {
                res.status(200).json(result);
            })
            .catch(function(err) {
                res.status(err.statusCode).json(err);
            });
    }
});

/**
 * Update a specific skill
 */
router.put('/skill', function(req, res, next) {
    let id = req.body.id;
    let name = req.body.name;
    if(isValidID(id) && name ) {
        Skill.updateSkill(id, name)
            .then(function(result) {
                res.status(200).json(result);
            })
            .catch(function(err) {
                res.status(err.statusCode).json(err);
            });
    }
});

/**
 * Delete a specific skill object
 */
router.delete('/skill/:id', function(req, res, next) {
    let id = req.params.id;
    if(isValidID(id)) {
        Skill.removeSkill(id)
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(err) {
            res.status(err.statusCode).json(err);
        });
    }
});

module.exports = router;
