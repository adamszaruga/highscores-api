var express = require('express');
var router = express.Router();
var db = require('../db');


// GET TOP 10 HIGH SCORES
router.get('/highscores', function (req, res, next) {
    db.any('SELECT * FROM scores ORDER BY points DESC LIMIT 10')
        .then(function (data) {
            // success;
            res.json(data);
        })
        .catch(function (error) {
            // error;
            res.status(400).send(error)
        });
});

// GET ALL SCORES FOR ANY USER
router.get('/user/:username', function (req, res, next) {
    let username = req.params.username;
    if (!username) {
        res.status(400).send({
            error: "NO USERNAME PROVIDED"
        })
    } else {
        db.any('SELECT * FROM scores WHERE username = $1 ORDER BY points DESC', [username])
            .then(function (data) {
                // success;
                res.json(data);
            })
            .catch(function (error) {
                // error;
                res.status(400).send(error)
            });
    }
});

// RECORD SCORE FOR LOGGED IN USER
router.post('/record', function (req, res, next) {
    if (!req.user) {
        res.status(400).send({
            error: "USER NOT LOGGED IN"
        })
    } else {
        let points = req.body.points;
        if (!points) {
            res.status(400).send({
                error: "PROVIDE A SCORE TO RECORD"
            })
        } else {
            db.one('INSERT INTO scores(points, username) VALUES($1, $2) RETURNING id', [points, req.user.username])
                .then(data => {
                    console.log
                    console.log(data.id); // print new score id;
                    res.json(data)
                })
                .catch(error => {
                    console.log('ERROR:', error); // print error;
                    res.status(400).send(error)
                });
        }
    }
});

module.exports = router;
