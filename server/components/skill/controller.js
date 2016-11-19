let express = require('express');
let router = express.Router();
let Skill = require('./skill');

router.post('/skill', function(req, res, next) {
    Skill.createSkill(req.body.name)
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
});

router.get('/skill/list', function(req, res, next) {
    Skill.listSkills()
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(err) {
            res.status(404).json(err);
        })
});

module.exports = router;
