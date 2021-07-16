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

    let data = pageViewer.pageViewer(req.params.page, 'school', constants);
    if (data['error']) {
        res.redirect('/school/1');
        return;
    }

    let i = 0;
    let result = '';

    let last_page = parseInt(fs.readdirSync(`${constants.data_path}/school/`).length / 10) + 1
    let back = 
`<div class="highlight">
<a href="/school/${req.params.page - 1}">back</a>
</div>`;
    let forward = 
`<div class="highlight">
<a href="/school/${parseInt(req.params.page) + 1}">forward</a>
</div>`;

    if (req.params.page == 1) {
        back = 
`<div class="">
<a>back</a>
</div>`;    
    }

    if (req.params.page == last_page) {
        forward = 
`<div class="">
<a>forward</a>
</div>`;
    }



    while (i < data['result'].length) {
        var a = data['result'][i];
        var date = a['date'];
        var content = a['content'];

        result +=
`
<div>
    <h1>${date[0]}년 ${date[1]}월 ${date[2]}일</h1>
    ${content}
</div>
`;
        i++;
    }
    res.render('school', { content: result, back: back, forward: forward });
});


module.exports = router;
