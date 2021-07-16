// major modules
const express = require('express');
const app = express();

const cors = require('cors');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// middle wares
app.use(cors());
app.use(bodyParser());
app.use(cookieParser());

// ejs setting
app.set('view engine', 'ejs');

// routers
const login = require('./routes/login');

// functions
const checkLogin = require('./lib/checkLogin');

// constants
const constants = require('./lib/constants');

app.use('/login', login);

// set view engine
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    if (req.cookies.input == undefined) {
        res.cookie('input', '');
    }

    let checker = checkLogin.checkLogin(req.cookies.input, constants.data_path);
    if (checker['error']) {
        res.redirect('/login');
        return;
    }


    res.send('hello');
});


app.listen(constants.port, () => {
    console.log(`Server is running on port ${constants.port}`);
});