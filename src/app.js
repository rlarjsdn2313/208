// major modules
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// middle wares
app.use(bodyParser.urlencoded({ extended: false}));
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

app.get('/', (req, res) => {
    id = 2;
    password = '12345';
    console.log(checkLogin.checkLogin(`${id}@${password}`, constants.data_path));
    res.send('hello');
});


app.listen(constants.port, () => {
    console.log(`Server is running on port ${constants.port}`);
});