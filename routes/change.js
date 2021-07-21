var express = require('express');
var router = express.Router();

var fs = require('fs');

var constants = require('../lib/constants');
var checkLogin = require('../lib/checkLogin');


router.get('/', (req, res) => {
    if (checkLogin.checkCookie(req, res, constants)) {
        return;
    }
    res.render('change');
});


router.post('/push', (req, res) => {
    var user = checkLogin.checkLogin(req.cookies.input, constants.data_path);
    if (user['error']) {
        res.redirect('/login');
        return;
    }

    // form으로 입력받은 바꿀 비밀번호
    var inputPassword = req.body.password;

    // 비밀번호 길이 확인
    if (inputPassword.length > 10) {
        res.redirect('/change');
        return;
    }

    var i = 0;

    // if inputPassword includes @ -> error
    while (i < inputPassword.length) {
        if (inputPassword[i] == '@') {
            res.redirect('/change');
            return;
        }
        i++;
    }

    // 유저 파일
    var userFile = `${constants.data_path}user/${user.id}.json`;

    // 유저 비밀번호 변경
    user['password'] = inputPassword;
    delete user.error;
    fs.writeFileSync(userFile, JSON.stringify(user, null, '\t'));
    
    res.redirect('/login');
});


module.exports = router;
