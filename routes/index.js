var express = require('express');
var router = express.Router();

var jwt = require('express-jwt');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//This is necessary to make HTML5Mode work on the Angular side. Since the server
//doesn't know what our Angular app is doing, typing in a URL will otherwise result in 
//a 404.

router.get('/signup', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/profile/*', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
