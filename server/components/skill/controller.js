let express = require('express');
let router = express.Router();
let Skill = require('./skill');
let mongoose = require('mongoose');

router.post('/skill', function(req, res, next) {
    if(req.body.name) {
        Skill.createSkill(req.body.name)
        .then(function(result) {
            // console.log('success', result)
            res.status(200).json(result);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
    } else {
        res.status(400).json({/*TODO*/});
    }
});

router.get('/skill/list', function(req, res, next) {
    Skill.listSkills()
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
});


router.get('/skill/name/:name', function(req, res, next) {
    Skill.getSkillByName(req.params.name)
        .then(function(result) {
            if(result)
            res.status(200).json(result);
            else
            res.status(404).json({/*TODO*/});
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
});

router.get('/skill/id/:id', function(req, res, next) {
    let id = req.params.id;
    if(mongoose.Types.ObjectId.isValid(id)) {
        Skill.getSkillByID(id)
        .then(function(result) {
            if(result)
            res.status(200).json(result);
            else
            res.status(404).json({/*TODO*/});
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
    } else {
        res.status(400).json({/*TODO*/});
    }

});

router.put('/skill', function(req, res, next) {
    let id = req.body.id;
    let new_name = req.body.new_name;
    // console.log(req.body.name)
    if(mongoose.Types.ObjectId.isValid(id) && new_name ) {
        Skill.updateSkill(id, new_name)
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(err) {
            if(err)
            res.status(500).json(err);
            else
            res.status(404).json({/*TODO*/});
        });
    } else {
        res.status(400).json({/*TODO*/});
    }
});

router.delete('/skill/:id', function(req, res, next) {
    let id = req.params.id;
    if(mongoose.Types.ObjectId.isValid(id)) {
        Skill.removeSkill(id)
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(err) {
            if(err)
            res.status(500).json(err);
            else
            res.status(404).json({/*TODO*/});

        });
    } else {
        res.status(400).json({/*TODO*/});
    }


});


module.exports = router;
