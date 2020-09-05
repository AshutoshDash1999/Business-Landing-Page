var express = require('express');
var path = require('path');
var app = express();
var bodyparser = require('body-parser');
var User = require('../db/user');

var user = new User();

app.use(bodyparser.urlencoded({ extended : false}));

//app.use(express.urlencoded( { extended : false}));

app.use(express.static('../public'));

app.get('/', function(req, res) {
    res.render('index')
})

app.post('/create_account', (req, res, next) =>{
    let userInput = {
        email_id: req.body.email_id,
        password: req.body.password
    };

    user.create(userInput, function(lastId){
        if(lastId) {
            res.send('welcome' + userInput.email_id);
        }else {
            console.log('error creating new user :')
        }
    })
}),

app.post('/login', (req, res, next) =>{
    user.login(req.body.email_id, req.body.password, function(result){
        if(result){
            res.send('logged in as :' +result.email_id);
        } else {
            res.send('email_id or password incorrect');
        }
    })
}),

app.use((req, res, next) =>{
    var err = new Error('page not found');
    err.status = 404;
    next(err);
}),

app.use((err, req, res, next) =>{
    res.status(err.status || 500);
    res.send(err.message);
}),

app.listen(4000, function(req, res){
    console.log('server is running at port: 4000')
}),

module.exports = app
