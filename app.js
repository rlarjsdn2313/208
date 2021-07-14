const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());

const checkLogin = require('./lib/checkLogin');

const data_path = './data/';
const port = 3000;


app.get('/', (req, res) => {
    id = 2;
    password = '12345';
    checkLogin.checkLogin(`${id}@${password}`, data_path);
    res.send('hello');
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});