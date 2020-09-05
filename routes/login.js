var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) =>{
    res.render('index', {title: 'business application'});
});

router.post('/login', (req, res, next) =>{
    res.json(req.body);
});

//router.post('/register', (res, res, next) =>{
//    res.json(req.body);
//});

module.exports = router;