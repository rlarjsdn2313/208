var express = require('express');
var router = express.Router();

var fs = require('fs');

var checkLogin = require('../lib/checkLogin');
var constants = require('../lib/constants');

router.get('/', (req, res) => {
    if (checkLogin.checkCookie(req, res, constants)) {
        return;
    }
    res.render('write');
});

router.post('/push', (req, res) => {
    var user = checkLogin.checkLogin(req.cookies.input, constants.data_path);
    if (user['error']) {
        res.redirect('/login');
        return;
    }

    var dirs = fs.readdirSync(`${constants.data_path}/article/`);
    dirs = dirs.sort();

    let today = new Date();

    fs.writeFileSync(`${constants.data_path}article/${dirs.length + 1}.json`,
`{
    "writer": "${user['name']}",
    "date": [${today.getFullYear()}, ${today.getMonth() + 1}, ${today.getDate()}, ${today.getHours()}],
    "content": "${req.body.content}"
}`
    );

    res.redirect('/article/1');
});

module.exports = router;
