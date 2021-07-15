var express = require('express');
var router = express.Router();

var constants = require('../lib/constants');
var checkLogin = require('../lib/checkLogin');

router.get('/', (req, res) => {
    res.render('login');
    // res.send(checkLogin.checkLogin(req.params.input, constants.data_path));
});

router.post('/check', (req, res) => {

});
module.exports = router;
