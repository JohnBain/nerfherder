var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = require('../models/Users.js');

var jwt = require('jwt-simple');
var passport = require('passport');


mongoose.connect('mongodb://localhost/users');

router.get('/', function(req, res, next) {
    User.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

//build tag list

router.get('/tags', function(req, res) {
    User.find(function(err, users) {
        if (err) {
            console.error(err);
        } else {
            var tags = [],
                count = {};
            //build array of every tag
            users.forEach(s => s.tags.forEach(t => tags.push(t)));
            //build object chronicling count of each tag -- UNUSED
            tags.forEach(t => count.hasOwnProperty(t) ? count[t] += 1 : count[t] = 1);
            res.json(tags);
        }
    })
})

router.get('/tags/fiverandom', function(req, res) {
    User.find(function(err, users) {
        if (err) {
            console.error(err);
        } else {
            var tags = [],
                count = {};
            //build array of every tag
            users.forEach(s => s.tags.forEach(t => tags.push(t)));
            var fiveRand = [];
            var counter = 0;
            var tries = 30;
            //failsafe in case there are less than 5 tags

            function pushFive() {
                while (counter < 5 && tries > 0) {
                    tries -= 1;
                    var x = tags[Math.floor(Math.random() * tags.length)].toLowerCase();
                    if (fiveRand.indexOf(x) != -1) {
                        pushFive();
                    } else {
                        counter += 1;
                        fiveRand.push(x)
                    }
                }
            }
            
            pushFive();
            res.json(fiveRand);
        }
    })
})

//find by username

router.get('/:username', function(req, res) {
    User.findOne({ username: req.params.username }, function(err, result) {
        if (err) {
            res.status(500)
            console.log("err triggered")
            res.send(err)
        } else {
            console.log(result, 'here')
            res.send(result)
        }
    })
});

router.delete('/', function(req, res) {
    console.log(req.body.sending, 'body');
    console.log(req.params, 'params');
    console.log("Got delete request")
    User.remove({}, function(err, result) {
        if (err) {
            console.log(req.body, 'body')
            res.status(500)
            res.send(err)
        } else {
            res.send(result)
        }
    })
})


router.post('/signup', function(req, res) {
    console.log("successfully got in");
    console.log(req.body, 'here is object');
    //this hack allows us to bypass Angular's POST handling
    //var newObj = {};
    //Object.keys(req.body).forEach(e=>newObj = JSON.parse(e));

    //console.log(newObj, 'here is new object')

    if (!req.body.username || !req.body.password) {
        console.log('validation error');
        res.json({ success: false, msg: 'Please pass name and password.' });
    } else {
        var newUser = new User(req.body);

        //x-www-form-urlencoded -- JSON parses may not be necessary when sending via form
/*
        newUser.location_info = JSON.parse(newUser.location_info)
        newUser.img_resources = JSON.parse(newUser.img_resources)
        newUser.tags = JSON.parse(newUser.tags)*/

        // save the user
        newUser.save(function(err) {
            if (err) {
                console.log(err, 'error on save');
                return res.json({ success: false, msg: 'Username already exists.' });
            }
            res.json({ success: true, msg: 'Successfully created new user.' });
        });
    }
});

router.get('/memberinfo', passport.authenticate('jwt', { session: false }), function(req, res) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, config.secret);
        User.findOne({
            name: decoded.name
        }, function(err, user) {
            if (err) throw err;

            if (!user) {
                return res.status(403).send({ success: false, msg: 'Authentication failed. User not found.' });
            } else {
                res.json({ success: true, msg: 'Welcome in the member area ' + user.name + '!' });
            }
        });
    } else {
        return res.status(403).send({ success: false, msg: 'No token provided.' });
    }
});

getToken = function(headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};


/*

router.post('/', function(req, res) {
    var userToSend = new User(req.body);
    userToSend.location_info = JSON.parse(userToSend.location_info)
    userToSend.img_resources = JSON.parse(userToSend.img_resources)
    userToSend.tags = JSON.parse(userToSend.tags)
    console.log(userToSend, 'userToSend');
    userToSend.save(function(err) {
        console.log("User saved")
        if (err) {
            console.log("Did not work")
        }
    })
})

*/


/* newDetail.save(function(err) {     //Mongoose models automatically have .save
  if (err) throw err;

  console.log('User saved successfully!');
});*/

module.exports = router;
