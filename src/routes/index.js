const router = require('express').Router();

router.get('/', function(req, res) {
    res.render('index.hbs', {
        title: "Not Playing"
    })
});

module.exports = router;
