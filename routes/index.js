var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    // console.log(req);
    // console.log(req.cookies);

    // res.cookie('greeting', 'hi there!', {maxAge: 900000, httpOnly: true});

  res.render('index', { title: 'Express' });
});

module.exports = router;
