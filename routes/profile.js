var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = require('../models/Users.js');


router.get('/:username', function(request, response, next) {
   //GET request on our API
  response.render("profile")
});

/*
router.get('/:username', function(req, res) {
    console.log(req.params)
    User.findOne(req.params.username, function(err, result) {
        if (err) {
            res.status(500)
            res.send(err)
        } else {
            res.send(result)
        }
    })
});
*/

module.exports = router;

