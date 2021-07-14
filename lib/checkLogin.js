var fs = require('fs');


let parseInput = function (input) {
    let check = input.match('@');
    if (check != null) {
        if (check.length > 1) {
            return {id: '', password: '', error: true};
        }
    }

    let arr = input.split('@');
    return {id: arr[0], password: arr[1], error:false};
}


let checkLogin = function (input, path) {
    let parseResult = parseInput(input);
    if (parseResult['error']) {
        return false;
    }

    let id = parseResult['id'];
    let password = parseResult['password'];


    let userDataPath = `${path}user/`;

    if (1 <= id <= 27 && id % 1 === 0) {
        if (JSON.parse(fs.readFileSync(`${userDataPath}${id}.json`))['password'] === password) {
            return true;
        }
    }

    return false;
}


module.exports.checkLogin = checkLogin;
