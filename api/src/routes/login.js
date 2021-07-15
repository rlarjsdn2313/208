var express = require('express');
var router = express.Router();

var constants = require('../lib/constants');
var checkLogin = require('../lib/checkLogin');

router.get('/:input', (req, res) => {
    res.send(checkLogin.checkLogin(req.params.input, constants.data_path));
});

module.exports = router;
