let express = require('express');
let router = express.Router();
let Skill = require('./skill');
let mongoose = require('mongoose');
let util = require('../../services/util');

/**
 * Create a skill
 */
router.post('/skill', function(req, res, next) {
    if(req.body) {
        Skill.createSkill(req.body)
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
    if (util.isValidId(id, res)) {
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
    if(util.isValidId(id, res) && name ) {
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
    if(util.isValidId(id, res)) {
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
