// major modules
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const favicon = require('serve-favicon');

// middle wares
app.use(bodyParser());
app.use(cookieParser());

// ejs setting
app.set('view engine', 'ejs');

// routers
const login = require('./routes/login');
const school = require('./routes/school');
const logout = require('./routes/logout');
const article = require('./routes/article');
const write = require('./routes/write');
const change = require('./routes/change');

// functions
const checkLogin = require('./lib/checkLogin');
const pageViewer = require('./lib/pageViewer');

// constants
const constants = require('./lib/constants');

app.use(favicon(__dirname + '/favicon.ico'));
app.use('/login', login);
app.use('/school', school);
app.use('/logout', logout);
app.use('/article', article);
app.use('/write', write);
app.use('/change', change);

// set view engine
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    let checker = checkLogin.checkLogin(req.cookies.input, constants.data_path);
    if (checker['error']) {
        res.redirect('/login');
        return;
    }


    res.send('hello');
});


// app.get('/school/:page', (req, res) => {
//     checkLogin.checkCookie(req, res, constants);
//     console.log(pageViewer.pageViewer(req.params.page, 'school', constants));
// });


app.listen(constants.port, () => {
    console.log(`Server is running on port ${constants.port}`);
});