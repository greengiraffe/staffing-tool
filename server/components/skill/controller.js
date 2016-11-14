let express = require('express');
let router = express.Router();
let Skill = require('./skill');

router.post('/skill', function(req, res, next) {
	Skill.createSkill(req.body.name)
		.then(function(result) {
			console.log('success', result)
			res.status(200).json(result);
		})
		.catch(function(err) {
			res.status(500).json(err);
		});
});

module.exports = router;
