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
        return {id: '', password: '', error: true};
    }

    let id = parseResult['id'];
    let password = parseResult['password'];


    let userDataPath = `${path}user/`;

    try {
        if (1 <= id <= 27 && id % 1 === 0) {
            var json_data = JSON.parse(fs.readFileSync(`${userDataPath}${id}.json`));
            if (json_data['password'] === password) {
                return {id: json_data['id'], password: json_data['password'], error: false};
            }
        }
    } catch {
        return {id: '', password: '', error: true};
    }


    return {id: '', password: '', error: true};
}


module.exports.checkLogin = checkLogin;
