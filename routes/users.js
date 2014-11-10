var express = require('express');
var router = express.Router();


router.post('/register', function (req, res) {
    res.send('hello ' + req.param('username') + '!');
    console.log(req.body);
    console.log(req.params);
    console.log(req.route);
});

/* GET users listing. */
router.get('/', function (req, res) {
    res.send('respond with a resource');
});

module.exports = router;
