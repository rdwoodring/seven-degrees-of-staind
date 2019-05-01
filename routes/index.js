var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send(`
        <html>
            <head></head>
            
            <body>
            TODO: serve up some UI here
            </body>
        </html>
    `);
});

module.exports = router;
