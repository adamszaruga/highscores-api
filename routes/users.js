var express = require('express');
var router = express.Router();
var db = require('../db');
var bcrypt = require('bcryptjs');
var passport = require('../passport.js');

// LOG IN
router.post('/login', passport.authenticate('local'), function (req, res, next) {
    res.json({ username: req.user.username });
});

// LOG OUT
router.post('/logout', function (req, res, next) {
    req.logout();
    res.json({ status: 'OK' });
});

// CHECK STATUS
router.post('/status', function (req, res, next) {
    if (req.user) {
        res.send({ username: req.user.username, isLoggedIn: true})
    } else {
        res.send({ username: null, isLoggedIn: false })
    }
});

// REGISTER USER
router.post('/register', function (req, res, next) {
    let username = req.body.username;
    let password = req.body.password;

    if (!username || !password) {
        res.status(400).send({
            error: "PROVIDE A USERNAME AND PASSWORD"
        })
    }

    db.any('SELECT * FROM users WHERE username = $1', [username])
        .then(function (data) {
            
            if  ( data.length == 1) {
                // user already exists!
                res.status(400).send({error: "USER ALREADY EXISTS"});
            } else {
                console.log(password)
                let hashedPassword = bcrypt.hashSync(password, 10);
                return db.one('INSERT INTO users(username, password_hash) VALUES($1, $2) RETURNING id', [username, hashedPassword])   
            }    
        })
        .then(() => {
            console.log("SUCCESFULLY CREATED USER"); // print new user id;
            res.send('success')
        })
        .catch(function (error) {
            console.log('ERROR:', error); // print error;
            res.status(400).send(error)
        });
});

module.exports = router;
