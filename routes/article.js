var express = require('express');
var router = express.Router();

var fs = require('fs');

var checkLogin = require('../lib/checkLogin');
var pageViewer = require('../lib/pageViewer');
var constants = require('../lib/constants');


router.get('/:page', (req, res) => {
    if (checkLogin.checkCookie(req, res, constants)) {
        return;
    }

    let data = pageViewer.pageViewer(req.params.page, 'article', constants);
    if (data['error']) {
        res.redirect('/article/1');
        return;
    }

    let i = 0;
    let result = '';

    let last_page = parseInt(fs.readdirSync(`${constants.data_path}/article/`).length / 10) + 1
    let back = 
`<div class="highlight move">
<a href="/article/${req.params.page - 1}">back</a>
</div>`;
    let forward = 
`<div class="highlight move">
<a href="/article/${parseInt(req.params.page) + 1}">forward</a>
</div>`;

    if (req.params.page == 1) {
        back = 
`<div class="move">
<a>back</a>
</div>`;    
    }

    if (req.params.page == last_page) {
        forward = 
`<div class="move">
<a>forward</a>
</div>`;
    }



    while (i < data['result'].length) {
        var a = data['result'][i];
        var date = a['date'];
        var writer = a['writer'];
        var content = a['content'];

        result +=
`
<div class="content">
    <h1>${date[0]}/${date[1]}/${date[2]}/${date[3]}</h1>
    <div class="hr"></div>

    <h2>${writer}</h2>
    ${content}
</div>
`;
        i++;
    }
    res.render('school', { content: result, back: back, forward: forward, title: '수다' });
});


module.exports = router;
