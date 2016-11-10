let express = require('express');
let router = express.Router();

router.get('/', function(req, res, next) {
    res.render('index');
});

router.use(require('./components/user'));

module.exports = router;
