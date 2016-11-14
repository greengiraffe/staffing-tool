let express = require('express');
let router = express.Router();

router.use(require('./components/user'));
router.use(require('./components/skill'));

router.get('/', function(req, res, next) {
    res.render('index');
});


module.exports = router;
